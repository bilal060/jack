#!/usr/bin/env node

/**
 * DEVICE DATA VIEWER
 * Command-line tool to view device-based data
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

class DeviceDataViewer {
    constructor() {
        this.baseDir = './data/devices/';
        this.videoDir = './videos/devices/';
        this.logDir = './logs/devices/';
        this.backupDir = './backup/devices/';
        
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    
    // Get all devices
    getAllDevices() {
        try {
            if (!fs.existsSync(this.baseDir)) {
                return [];
            }
            
            const devices = fs.readdirSync(this.baseDir)
                .filter(dir => fs.statSync(path.join(this.baseDir, dir)).isDirectory())
                .map(deviceId => {
                    const infoPath = path.join(this.baseDir, deviceId, 'device_info.json');
                    if (fs.existsSync(infoPath)) {
                        return JSON.parse(fs.readFileSync(infoPath, 'utf8'));
                    }
                    return { deviceId, status: 'unknown' };
                })
                .sort((a, b) => new Date(b.lastUpdated || 0) - new Date(a.lastUpdated || 0));
            
            return devices;
        } catch (error) {
            console.error('❌ Error getting devices:', error);
            return [];
        }
    }
    
    // Get device data by type
    getDeviceData(deviceId, dataType, limit = 50) {
        try {
            const dataDir = path.join(this.baseDir, deviceId, dataType);
            
            if (!fs.existsSync(dataDir)) {
                return [];
            }
            
            const files = fs.readdirSync(dataDir)
                .filter(file => file.endsWith('.json'))
                .sort((a, b) => {
                    const statA = fs.statSync(path.join(dataDir, a));
                    const statB = fs.statSync(path.join(dataDir, b));
                    return statB.mtime.getTime() - statA.mtime.getTime();
                })
                .slice(0, limit);
            
            return files.map(file => {
                const filePath = path.join(dataDir, file);
                const content = fs.readFileSync(filePath, 'utf8');
                return JSON.parse(content);
            });
        } catch (error) {
            console.error(`❌ Error getting ${dataType} data for ${deviceId}:`, error);
            return [];
        }
    }
    
    // Get device statistics
    getDeviceStats(deviceId) {
        try {
            const deviceInfo = this.getDeviceInfo(deviceId);
            if (!deviceInfo) {
                return null;
            }
            
            const dataTypes = ['data', 'sessions', 'attacks', 'permissions', 'fingerprints', 'behavioral', 'network', 'storage', 'ml', 'evasion'];
            const stats = {
                device: deviceInfo,
                dataTypes: {}
            };
            
            dataTypes.forEach(type => {
                const dataDir = path.join(this.baseDir, deviceId, type);
                if (fs.existsSync(dataDir)) {
                    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
                    stats.dataTypes[type] = files.length;
                } else {
                    stats.dataTypes[type] = 0;
                }
            });
            
            return stats;
        } catch (error) {
            console.error(`❌ Error getting stats for ${deviceId}:`, error);
            return null;
        }
    }
    
    // Get device info
    getDeviceInfo(deviceId) {
        try {
            const infoPath = path.join(this.baseDir, deviceId, 'device_info.json');
            
            if (fs.existsSync(infoPath)) {
                return JSON.parse(fs.readFileSync(infoPath, 'utf8'));
            }
            
            return null;
        } catch (error) {
            console.error(`❌ Error getting device info for ${deviceId}:`, error);
            return null;
        }
    }
    
    // Display main menu
    async showMainMenu() {
        console.clear();
        console.log('🔍 DEVICE DATA VIEWER');
        console.log('=====================\n');
        
        const devices = this.getAllDevices();
        
        if (devices.length === 0) {
            console.log('❌ No devices found');
            console.log('Devices will appear here when data is captured\n');
            console.log('Press Enter to refresh...');
            this.rl.question('', () => this.showMainMenu());
            return;
        }
        
        console.log(`📱 Found ${devices.length} devices:\n`);
        
        devices.forEach((device, index) => {
            const deviceId = device.deviceId || device._id || device.device;
            const status = device.status || 'unknown';
            const lastSeen = device.lastUpdated || device.lastSeen || 'unknown';
            const dataPoints = device.totalDataPoints || 0;
            
            console.log(`${index + 1}. ${deviceId}`);
            console.log(`   Status: ${status}`);
            console.log(`   Data Points: ${dataPoints}`);
            console.log(`   Last Seen: ${new Date(lastSeen).toLocaleString()}`);
            console.log('');
        });
        
        console.log('Options:');
        console.log('  [number] - View device details');
        console.log('  [r] - Refresh');
        console.log('  [q] - Quit');
        console.log('');
        
        this.rl.question('Select option: ', (answer) => {
            if (answer.toLowerCase() === 'q') {
                this.rl.close();
                return;
            }
            
            if (answer.toLowerCase() === 'r') {
                this.showMainMenu();
                return;
            }
            
            const deviceIndex = parseInt(answer) - 1;
            if (deviceIndex >= 0 && deviceIndex < devices.length) {
                const deviceId = devices[deviceIndex].deviceId || devices[deviceIndex]._id || devices[deviceIndex].device;
                this.showDeviceMenu(deviceId);
            } else {
                console.log('❌ Invalid option');
                setTimeout(() => this.showMainMenu(), 2000);
            }
        });
    }
    
    // Display device menu
    async showDeviceMenu(deviceId) {
        console.clear();
        console.log(`📱 DEVICE: ${deviceId}`);
        console.log('=====================\n');
        
        const stats = this.getDeviceStats(deviceId);
        const deviceInfo = this.getDeviceInfo(deviceId);
        
        if (stats) {
            console.log('📊 Statistics:');
            console.log(`   Total Data Points: ${deviceInfo?.totalDataPoints || 0}`);
            console.log(`   Total Sessions: ${deviceInfo?.totalSessions || 0}`);
            console.log(`   Total Attacks: ${deviceInfo?.totalAttacks || 0}`);
            console.log(`   Total Permissions: ${deviceInfo?.totalPermissions || 0}`);
            console.log(`   Status: ${deviceInfo?.status || 'unknown'}`);
            console.log(`   Last Updated: ${new Date(deviceInfo?.lastUpdated || 0).toLocaleString()}`);
            console.log('');
            
            console.log('📁 Data Types:');
            Object.entries(stats.dataTypes).forEach(([type, count]) => {
                if (count > 0) {
                    console.log(`   ${type}: ${count} files`);
                }
            });
            console.log('');
        }
        
        console.log('Options:');
        console.log('  [1] - View all data');
        console.log('  [2] - View sessions');
        console.log('  [3] - View attacks');
        console.log('  [4] - View permissions');
        console.log('  [5] - View fingerprints');
        console.log('  [6] - View behavioral data');
        console.log('  [7] - View network data');
        console.log('  [8] - View storage data');
        console.log('  [9] - View ML data');
        console.log('  [10] - View evasion data');
        console.log('  [b] - Back to main menu');
        console.log('  [q] - Quit');
        console.log('');
        
        this.rl.question('Select option: ', (answer) => {
            if (answer.toLowerCase() === 'q') {
                this.rl.close();
                return;
            }
            
            if (answer.toLowerCase() === 'b') {
                this.showMainMenu();
                return;
            }
            
            const option = parseInt(answer);
            const dataTypes = [
                'data', 'sessions', 'attacks', 'permissions', 'fingerprints',
                'behavioral', 'network', 'storage', 'ml', 'evasion'
            ];
            
            if (option >= 1 && option <= 10) {
                const dataType = dataTypes[option - 1];
                this.showDataType(deviceId, dataType);
            } else {
                console.log('❌ Invalid option');
                setTimeout(() => this.showDeviceMenu(deviceId), 2000);
            }
        });
    }
    
    // Display data type
    async showDataType(deviceId, dataType) {
        console.clear();
        console.log(`📊 ${dataType.toUpperCase()} DATA: ${deviceId}`);
        console.log('=====================================\n');
        
        const data = this.getDeviceData(deviceId, dataType, 20);
        
        if (data.length === 0) {
            console.log(`❌ No ${dataType} data found for this device`);
            console.log('');
            console.log('Press Enter to go back...');
            this.rl.question('', () => this.showDeviceMenu(deviceId));
            return;
        }
        
        console.log(`Found ${data.length} entries:\n`);
        
        data.forEach((item, index) => {
            console.log(`${index + 1}. ${item.dataType || item.type || 'unknown'}`);
            console.log(`   Category: ${item.category || 'general'}`);
            console.log(`   Timestamp: ${new Date(item.timestamp).toLocaleString()}`);
            
            if (item.data) {
                const dataSize = JSON.stringify(item.data).length;
                console.log(`   Data Size: ${dataSize} characters`);
                
                // Show sample data
                if (dataSize < 200) {
                    console.log(`   Data: ${JSON.stringify(item.data).substring(0, 150)}...`);
                } else {
                    console.log(`   Data: ${JSON.stringify(item.data).substring(0, 150)}...`);
                }
            }
            console.log('');
        });
        
        console.log('Options:');
        console.log('  [number] - View detailed data');
        console.log('  [b] - Back to device menu');
        console.log('  [q] - Quit');
        console.log('');
        
        this.rl.question('Select option: ', (answer) => {
            if (answer.toLowerCase() === 'q') {
                this.rl.close();
                return;
            }
            
            if (answer.toLowerCase() === 'b') {
                this.showDeviceMenu(deviceId);
                return;
            }
            
            const itemIndex = parseInt(answer) - 1;
            if (itemIndex >= 0 && itemIndex < data.length) {
                this.showDetailedData(deviceId, dataType, data[itemIndex]);
            } else {
                console.log('❌ Invalid option');
                setTimeout(() => this.showDataType(deviceId, dataType), 2000);
            }
        });
    }
    
    // Display detailed data
    async showDetailedData(deviceId, dataType, item) {
        console.clear();
        console.log(`📋 DETAILED DATA: ${deviceId}`);
        console.log('=============================\n');
        
        console.log('Item Details:');
        console.log(`   Type: ${item.dataType || item.type || 'unknown'}`);
        console.log(`   Category: ${item.category || 'general'}`);
        console.log(`   Timestamp: ${new Date(item.timestamp).toLocaleString()}`);
        console.log(`   Device ID: ${item.deviceId || deviceId}`);
        console.log('');
        
        if (item.data) {
            console.log('Data:');
            console.log(JSON.stringify(item.data, null, 2));
        }
        
        console.log('');
        console.log('Press Enter to go back...');
        this.rl.question('', () => this.showDataType(deviceId, dataType));
    }
    
    // Start the viewer
    start() {
        console.log('🚀 Starting Device Data Viewer...\n');
        this.showMainMenu();
    }
}

// Run the viewer
if (require.main === module) {
    const viewer = new DeviceDataViewer();
    viewer.start();
}

module.exports = DeviceDataViewer; 