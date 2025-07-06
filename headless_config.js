/**
 * HEADLESS BROWSER CONFIGURATION
 * For Internal Security Research Only
 * 
 * This file contains all the configuration options for running
 * a headless browser with maximum permissions and stealth capabilities.
 */

module.exports = {
    // Browser launch options
    browserOptions: {
        headless: true,
        args: [
            // Security bypass flags (for testing only)
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
            
            // Background processing flags
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            
            // Automation and stealth flags
            '--enable-automation',
            '--disable-blink-features=AutomationControlled',
            '--disable-features=TranslateUI',
            '--disable-ipc-flooding-protection',
            
            // Security bypass flags (for testing)
            '--allow-running-insecure-content',
            '--disable-web-security',
            '--ignore-certificate-errors',
            '--ignore-ssl-errors',
            '--ignore-certificate-errors-spki-list',
            '--allow-insecure-localhost',
            
            // Performance and resource flags
            '--disable-extensions',
            '--disable-plugins',
            '--disable-images',
            '--disable-javascript',
            '--disable-default-apps',
            '--disable-sync',
            '--disable-translate',
            '--hide-scrollbars',
            '--mute-audio',
            '--no-default-browser-check',
            '--no-pings',
            '--disable-background-networking',
            '--metrics-recording-only',
            '--safebrowsing-disable-auto-update',
            
            // Additional stealth flags
            '--disable-features=VizDisplayCompositor',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--disable-features=TranslateUI',
            '--disable-ipc-flooding-protection',
            '--enable-automation',
            '--disable-blink-features=AutomationControlled'
        ]
    },

    // Context options with all permissions
    contextOptions: {
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        
        // All available permissions (excluding USB/Serial/Bluetooth)
        permissions: [
            'geolocation',
            'notifications',
            'camera',
            'microphone',
            'background-sync',
            'persistent-storage',
            'payment',
            'midi',
            'magnetometer',
            'gyroscope',
            'accelerometer',
            'ambient-light-sensor',
            'clipboard-read',
            'clipboard-write',
            'display-capture',
            'fullscreen',
            'picture-in-picture',
            'publickey-credentials-get',
            'screen-wake-lock',
            'storage-access',
            'window-management'
        ],
        
        // Geolocation spoofing
        geolocation: { 
            longitude: 0, 
            latitude: 0 
        },
        
        // Localization settings
        locale: 'en-US',
        timezoneId: 'America/New_York',
        
        // HTTP headers for stealth
        extraHTTPHeaders: {
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Cache-Control': 'max-age=0'
        }
    },

    // Stealth scripts to inject
    stealthScripts: [
        // Override webdriver detection
        () => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined,
            });
        },
        
        // Override plugins
        () => {
            Object.defineProperty(navigator, 'plugins', {
                get: () => [1, 2, 3, 4, 5],
            });
        },
        
        // Override languages
        () => {
            Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en'],
            });
        },
        
        // Override permissions query
        () => {
            const originalQuery = window.navigator.permissions.query;
            window.navigator.permissions.query = (parameters) => (
                parameters.name === 'notifications' ?
                    Promise.resolve({ state: Notification.permission }) :
                    originalQuery(parameters)
            );
        },
        
        // Override chrome object
        () => {
            Object.defineProperty(window, 'chrome', {
                writable: true,
                enumerable: true,
                configurable: true,
                value: {
                    runtime: {},
                    loadTimes: function() {},
                    csi: function() {},
                    app: {}
                }
            });
        },
        
        // Override permissions
        () => {
            const originalGetUserMedia = navigator.mediaDevices.getUserMedia;
            navigator.mediaDevices.getUserMedia = function(constraints) {
                return Promise.resolve({
                    getTracks: () => [],
                    getVideoTracks: () => [],
                    getAudioTracks: () => []
                });
            };
        }
    ],

    // Attack simulation targets
    targets: {
        // Local test servers
        localServers: [
            'http://localhost:3000',
            'http://localhost:8080',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:8080'
        ],
        
        // Data capture endpoints
        captureEndpoints: [
            'http://localhost:3000/capture',
            'http://localhost:3000/steal',
            'http://localhost:3000/exfiltrate'
        ],
        
        // Test pages
        testPages: [
            'http://localhost:3000/test',
            'http://localhost:3000/login',
            'http://localhost:3000/demo'
        ]
    },

    // Data types to capture
    dataTypes: [
        'browser_data',
        'system_info',
        'network_data',
        'storage_data',
        'device_info',
        'geolocation',
        'camera_feed',
        'microphone_audio',
        'clipboard_data',
        'screen_capture',
        'local_storage',
        'session_storage',
        'cookies',
        'indexed_db',
        'cache_storage',
        'service_worker_data',
        'push_notifications',
        'background_sync',
        'web_rtc',
        'webgl_fingerprint',
        'canvas_fingerprint',
        'audio_fingerprint',
        'font_fingerprint',
        'battery_info',
        'connection_info',
        'device_orientation',
        'device_motion',
        'ambient_light',
        'magnetometer',
        'gyroscope',
        'accelerometer'
    ],

    // Persistence mechanisms to test
    persistenceMechanisms: [
        'localStorage',
        'sessionStorage',
        'indexedDB',
        'cacheStorage',
        'serviceWorkers',
        'pushNotifications',
        'backgroundSync',
        'webSQL',
        'appCache',
        'fileSystem',
        'persistentStorage'
    ],

    // Output configuration
    output: {
        saveResults: true,
        saveScreenshots: true,
        saveNetworkLogs: true,
        saveConsoleLogs: true,
        outputDirectory: './attack_results',
        timestampFormat: 'ISO',
        compressResults: false
    },

    // Safety settings (for research only)
    safety: {
        maxExecutionTime: 300000, // 5 minutes
        maxDataCaptureSize: 10485760, // 10MB
        allowedDomains: ['localhost', '127.0.0.1'],
        blockedDomains: ['google.com', 'facebook.com', 'twitter.com'],
        requireUserConfirmation: false,
        autoCleanup: true,
        deleteAfterTest: true
    }
}; 