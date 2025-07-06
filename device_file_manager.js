/**
 * DEVICE FILE MANAGER
 * Organizes all files by device ID
 */

const fs = require('fs');
const path = require('path');

class DeviceFileManager {
    constructor() {
        this.baseDir = './data/devices/';
        this.videoDir = './videos/devices/';
        this.logDir = './logs/devices/';
        this.backupDir = './backup/devices/';
        
        this.ensureBaseDirectories();
    }
    
    ensureBaseDirectories() {
        const dirs = [
            this.baseDir,
            this.videoDir,
            this.logDir,
            this.backupDir
        ];
        
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`📁 Created directory: ${dir}`);
            }
        });
    }
    
    // Get device directory structure
    getDeviceDirectory(deviceId) {
        return {
            base: path.join(this.baseDir, deviceId),
            videos: path.join(this.videoDir, deviceId),
            logs: path.join(this.logDir, deviceId),
            backup: path.join(this.backupDir, deviceId),
            data: path.join(this.baseDir, deviceId, 'data'),
            sessions: path.join(this.baseDir, deviceId, 'sessions'),
            attacks: path.join(this.baseDir, deviceId, 'attacks'),
            permissions: path.join(this.baseDir, deviceId, 'permissions'),
            fingerprints: path.join(this.baseDir, deviceId, 'fingerprints'),
            behavioral: path.join(this.baseDir, deviceId, 'behavioral'),
            network: path.join(this.baseDir, deviceId, 'network'),
            storage: path.join(this.baseDir, deviceId, 'storage'),
            ml: path.join(this.baseDir, deviceId, 'ml'),
            evasion: path.join(this.baseDir, deviceId, 'evasion')
        };
    }
    
    // Create device directory structure
    createDeviceDirectories(deviceId) {
        const dirs = this.getDeviceDirectory(deviceId);
        
        Object.values(dirs).forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`📁 Created device directory: ${dir}`);
            }
        });
        
        // Create device info file
        this.createDeviceInfoFile(deviceId);
        
        return dirs;
    }
    
    // Create device info file
    createDeviceInfoFile(deviceId) {
        const deviceInfo = {
            deviceId: deviceId,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            status: 'active',
            totalSessions: 0,
            totalDataPoints: 0,
            totalAttacks: 0,
            totalPermissions: 0,
            totalVideos: 0
        };
        
        const infoPath = path.join(this.baseDir, deviceId, 'device_info.json');
        fs.writeFileSync(infoPath, JSON.stringify(deviceInfo, null, 2));
        console.log(`📄 Created device info: ${infoPath}`);
    }
    
    // Save data to device-specific file
    saveDeviceData(deviceId, dataType, data, filename = null) {
        try {
            const dirs = this.getDeviceDirectory(deviceId);
            const dataDir = dirs[dataType];
            
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }
            
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const defaultFilename = `${dataType}_${timestamp}.json`;
            const finalFilename = filename || defaultFilename;
            const filePath = path.join(dataDir, finalFilename);
            
            const fileData = {
                deviceId: deviceId,
                dataType: dataType,
                timestamp: new Date().toISOString(),
                data: data
            };
            
            fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
            console.log(`💾 Saved ${dataType} data for device ${deviceId}: ${filePath}`);
            
            // Update device info
            this.updateDeviceInfo(deviceId, dataType);
            
            return filePath;
        } catch (error) {
            console.error(`❌ Error saving ${dataType} data for ${deviceId}:`, error);
            throw error;
        }
    }
    
    // Save session data
    saveSessionData(deviceId, sessionId, sessionData) {
        const data = {
            sessionId: sessionId,
            deviceId: deviceId,
            ...sessionData
        };
        
        return this.saveDeviceData(deviceId, 'sessions', data, `session_${sessionId}.json`);
    }
    
    // Save attack data
    saveAttackData(deviceId, attackData) {
        return this.saveDeviceData(deviceId, 'attacks', attackData);
    }
    
    // Save permission data
    savePermissionData(deviceId, permissionData) {
        return this.saveDeviceData(deviceId, 'permissions', permissionData);
    }
    
    // Save fingerprint data
    saveFingerprintData(deviceId, fingerprintData) {
        return this.saveDeviceData(deviceId, 'fingerprints', fingerprintData);
    }
    
    // Save behavioral data
    saveBehavioralData(deviceId, behavioralData) {
        return this.saveDeviceData(deviceId, 'behavioral', behavioralData);
    }
    
    // Save network data
    saveNetworkData(deviceId, networkData) {
        return this.saveDeviceData(deviceId, 'network', networkData);
    }
    
    // Save storage data
    saveStorageData(deviceId, storageData) {
        return this.saveDeviceData(deviceId, 'storage', storageData);
    }
    
    // Save ML data
    saveMLData(deviceId, mlData) {
        return this.saveDeviceData(deviceId, 'ml', mlData);
    }
    
    // Save evasion data
    saveEvasionData(deviceId, evasionData) {
        return this.saveDeviceData(deviceId, 'evasion', evasionData);
    }
    
    // Save video file
    saveVideoFile(deviceId, videoData) {
        try {
            const videoDir = path.join(this.videoDir, deviceId);
            
            if (!fs.existsSync(videoDir)) {
                fs.mkdirSync(videoDir, { recursive: true });
            }
            
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `${videoData.category}_${timestamp}.mp4`;
            const filePath = path.join(videoDir, filename);
            
            // In a real implementation, you would copy the video file here
            // For now, we'll create a placeholder
            const videoInfo = {
                deviceId: deviceId,
                filename: filename,
                filePath: filePath,
                category: videoData.category,
                size: videoData.size,
                duration: videoData.duration,
                resolution: videoData.resolution,
                downloadDate: new Date().toISOString()
            };
            
            // Save video metadata
            const metadataPath = path.join(videoDir, `${filename}.json`);
            fs.writeFileSync(metadataPath, JSON.stringify(videoInfo, null, 2));
            
            console.log(`🎬 Saved video for device ${deviceId}: ${filePath}`);
            
            // Update device info
            this.updateDeviceInfo(deviceId, 'videos');
            
            return filePath;
        } catch (error) {
            console.error(`❌ Error saving video for ${deviceId}:`, error);
            throw error;
        }
    }
    
    // Update device info
    updateDeviceInfo(deviceId, dataType) {
        try {
            const infoPath = path.join(this.baseDir, deviceId, 'device_info.json');
            
            if (fs.existsSync(infoPath)) {
                const deviceInfo = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
                deviceInfo.lastUpdated = new Date().toISOString();
                
                // Increment counters based on data type
                switch (dataType) {
                    case 'sessions':
                        deviceInfo.totalSessions += 1;
                        break;
                    case 'attacks':
                        deviceInfo.totalAttacks += 1;
                        break;
                    case 'permissions':
                        deviceInfo.totalPermissions += 1;
                        break;
                    case 'videos':
                        deviceInfo.totalVideos += 1;
                        break;
                    default:
                        deviceInfo.totalDataPoints += 1;
                }
                
                fs.writeFileSync(infoPath, JSON.stringify(deviceInfo, null, 2));
            }
        } catch (error) {
            console.error(`❌ Error updating device info for ${deviceId}:`, error);
        }
    }
    
    // Get device data
    getDeviceData(deviceId, dataType, limit = 100) {
        try {
            const dirs = this.getDeviceDirectory(deviceId);
            const dataDir = dirs[dataType];
            
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
    
    // Get all devices
    getAllDevices() {
        try {
            const devices = [];
            
            if (fs.existsSync(this.baseDir)) {
                const deviceDirs = fs.readdirSync(this.baseDir);
                
                deviceDirs.forEach(deviceId => {
                    const deviceInfo = this.getDeviceInfo(deviceId);
                    if (deviceInfo) {
                        devices.push(deviceInfo);
                    }
                });
            }
            
            return devices.sort((a, b) => 
                new Date(b.lastUpdated) - new Date(a.lastUpdated)
            );
        } catch (error) {
            console.error('❌ Error getting all devices:', error);
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
            
            const dirs = this.getDeviceDirectory(deviceId);
            const stats = {
                device: deviceInfo,
                dataTypes: {}
            };
            
            // Count files in each data type directory
            Object.keys(dirs).forEach(dataType => {
                const dataDir = dirs[dataType];
                if (fs.existsSync(dataDir)) {
                    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
                    stats.dataTypes[dataType] = files.length;
                } else {
                    stats.dataTypes[dataType] = 0;
                }
            });
            
            return stats;
        } catch (error) {
            console.error(`❌ Error getting stats for ${deviceId}:`, error);
            return null;
        }
    }
    
    // Backup device data
    backupDeviceData(deviceId) {
        try {
            const sourceDir = path.join(this.baseDir, deviceId);
            const backupDir = path.join(this.backupDir, deviceId, new Date().toISOString().split('T')[0]);
            
            if (!fs.existsSync(sourceDir)) {
                throw new Error(`Device ${deviceId} not found`);
            }
            
            if (!fs.existsSync(backupDir)) {
                fs.mkdirSync(backupDir, { recursive: true });
            }
            
            // Copy all files recursively
            this.copyDirectoryRecursive(sourceDir, backupDir);
            
            console.log(`💾 Backed up device ${deviceId} to ${backupDir}`);
            return backupDir;
        } catch (error) {
            console.error(`❌ Error backing up device ${deviceId}:`, error);
            throw error;
        }
    }
    
    // Copy directory recursively
    copyDirectoryRecursive(source, destination) {
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
        }
        
        const files = fs.readdirSync(source);
        
        files.forEach(file => {
            const sourcePath = path.join(source, file);
            const destPath = path.join(destination, file);
            
            if (fs.statSync(sourcePath).isDirectory()) {
                this.copyDirectoryRecursive(sourcePath, destPath);
            } else {
                fs.copyFileSync(sourcePath, destPath);
            }
        });
    }
    
    // Clean up old device data
    cleanupOldDeviceData(deviceId, daysOld = 30) {
        try {
            const cutoffDate = new Date(Date.now() - (daysOld * 24 * 60 * 60 * 1000));
            const dirs = this.getDeviceDirectory(deviceId);
            
            Object.values(dirs).forEach(dir => {
                if (fs.existsSync(dir)) {
                    const files = fs.readdirSync(dir);
                    
                    files.forEach(file => {
                        const filePath = path.join(dir, file);
                        const stats = fs.statSync(filePath);
                        
                        if (stats.mtime < cutoffDate) {
                            fs.unlinkSync(filePath);
                            console.log(`🗑️ Deleted old file: ${filePath}`);
                        }
                    });
                }
            });
            
            console.log(`🧹 Cleaned up old data for device ${deviceId}`);
        } catch (error) {
            console.error(`❌ Error cleaning up device ${deviceId}:`, error);
        }
    }
}

module.exports = DeviceFileManager; 