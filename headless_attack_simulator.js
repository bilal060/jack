const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const PersistenceMechanisms = require('./persistence_mechanisms');

/**
 * HEADLESS BROWSER ATTACK SIMULATOR
 * For Internal Security Research Only
 * 
 * This script demonstrates what's possible with a headless browser
 * that has been granted full permissions. Use only on dedicated test devices.
 */

class HeadlessAttackSimulator {
    constructor() {
        this.browser = null;
        this.context = null;
        this.page = null;
        this.results = {
            capturedData: [],
            permissions: [],
            vulnerabilities: [],
            timestamp: new Date().toISOString()
        };
    }

    async initialize() {
        console.log('🚀 Initializing Headless Attack Simulator...');
        
        // Launch browser with maximum permissions and stealth settings
        this.browser = await chromium.launch({
            headless: true, // Run in background
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding',
                '--disable-features=TranslateUI',
                '--disable-ipc-flooding-protection',
                '--enable-automation',
                '--disable-blink-features=AutomationControlled',
                '--allow-running-insecure-content',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor',
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
                '--disable-default-apps',
                '--disable-extensions',
                '--disable-sync',
                '--disable-translate',
                '--hide-scrollbars',
                '--metrics-recording-only',
                '--mute-audio',
                '--no-first-run',
                '--safebrowsing-disable-auto-update',
                '--ignore-certificate-errors',
                '--ignore-ssl-errors',
                '--ignore-certificate-errors-spki-list',
                '--allow-insecure-localhost',
                '--disable-features=VizDisplayCompositor',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding',
                '--disable-features=TranslateUI',
                '--disable-ipc-flooding-protection',
                '--enable-automation',
                '--disable-blink-features=AutomationControlled'
            ]
        });

        // Create context with maximum permissions
        this.context = await this.browser.newContext({
            viewport: { width: 1920, height: 1080 },
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            permissions: [
                'geolocation',
                'notifications',
                'camera',
                'microphone',
                'background-sync',
                'persistent-storage',
                'payment',
                'midi',
                'usb',
                'serial',
                'bluetooth',
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
            geolocation: { longitude: 0, latitude: 0 },
            locale: 'en-US',
            timezoneId: 'America/New_York',
            extraHTTPHeaders: {
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            }
        });

        // Grant all permissions automatically
        await this.context.grantPermissions([
            'geolocation',
            'notifications',
            'camera',
            'microphone',
            'background-sync',
            'persistent-storage',
            'payment',
            'midi',
            'usb',
            'serial',
            'bluetooth',
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
        ]);

        this.page = await this.context.newPage();
        
        // Set up stealth measures
        await this.page.addInitScript(() => {
            // Override webdriver property
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined,
            });
            
            // Override plugins
            Object.defineProperty(navigator, 'plugins', {
                get: () => [1, 2, 3, 4, 5],
            });
            
            // Override languages
            Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en'],
            });
            
            // Override permissions
            const originalQuery = window.navigator.permissions.query;
            window.navigator.permissions.query = (parameters) => (
                parameters.name === 'notifications' ?
                    Promise.resolve({ state: Notification.permission }) :
                    originalQuery(parameters)
            );
        });

        console.log('✅ Headless browser initialized with full permissions');
    }

    async simulateStealthAttack() {
        console.log('🎯 Starting stealth attack simulation...');
        
        try {
            // 1. Navigate to a test page
            await this.page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
            
            // 2. Attempt to capture various data types
            await this.captureBrowserData();
            await this.captureSystemInfo();
            await this.captureNetworkData();
            await this.captureStorageData();
            await this.captureDeviceInfo();
            
            // 3. Test stealth form submission
            await this.testStealthFormSubmission();
            
            // 4. Test background processes
            await this.testBackgroundProcesses();
            
                    // 5. Test persistence mechanisms
        await this.testPersistenceMechanisms();
        
        // 6. Test advanced persistence with service workers
        await this.testAdvancedPersistence();
            
        } catch (error) {
            console.error('❌ Attack simulation failed:', error.message);
            this.results.vulnerabilities.push({
                type: 'error',
                message: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }

    async captureBrowserData() {
        console.log('📊 Capturing browser data...');
        
        const browserData = await this.page.evaluate(() => {
            return {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                languages: navigator.languages,
                cookieEnabled: navigator.cookieEnabled,
                onLine: navigator.onLine,
                doNotTrack: navigator.doNotTrack,
                hardwareConcurrency: navigator.hardwareConcurrency,
                deviceMemory: navigator.deviceMemory,
                maxTouchPoints: navigator.maxTouchPoints,
                vendor: navigator.vendor,
                appName: navigator.appName,
                appVersion: navigator.appVersion,
                screen: {
                    width: screen.width,
                    height: screen.height,
                    availWidth: screen.availWidth,
                    availHeight: screen.availHeight,
                    colorDepth: screen.colorDepth,
                    pixelDepth: screen.pixelDepth
                },
                window: {
                    innerWidth: window.innerWidth,
                    innerHeight: window.innerHeight,
                    outerWidth: window.outerWidth,
                    outerHeight: window.outerHeight
                },
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                date: new Date().toString()
            };
        });
        
        this.results.capturedData.push({
            type: 'browser_data',
            data: browserData,
            timestamp: new Date().toISOString()
        });
    }

    async captureSystemInfo() {
        console.log('💻 Capturing system information...');
        
        const systemInfo = await this.page.evaluate(async () => {
            const info = {
                battery: null,
                connection: null,
                deviceOrientation: null,
                deviceMotion: null,
                geolocation: null
            };
            
            // Try to get battery info
            if ('getBattery' in navigator) {
                try {
                    const battery = await navigator.getBattery();
                    info.battery = {
                        charging: battery.charging,
                        chargingTime: battery.chargingTime,
                        dischargingTime: battery.dischargingTime,
                        level: battery.level
                    };
                } catch (e) {
                    info.battery = { error: e.message };
                }
            }
            
            // Try to get connection info
            if ('connection' in navigator) {
                info.connection = {
                    effectiveType: navigator.connection.effectiveType,
                    downlink: navigator.connection.downlink,
                    rtt: navigator.connection.rtt,
                    saveData: navigator.connection.saveData
                };
            }
            
            // Try to get device orientation
            if ('DeviceOrientationEvent' in window) {
                info.deviceOrientation = 'available';
            }
            
            // Try to get device motion
            if ('DeviceMotionEvent' in window) {
                info.deviceMotion = 'available';
            }
            
            return info;
        });
        
        this.results.capturedData.push({
            type: 'system_info',
            data: systemInfo,
            timestamp: new Date().toISOString()
        });
    }

    async captureNetworkData() {
        console.log('🌐 Capturing network data...');
        
        // Monitor network requests
        this.page.on('request', request => {
            this.results.capturedData.push({
                type: 'network_request',
                data: {
                    url: request.url(),
                    method: request.method(),
                    headers: request.headers(),
                    postData: request.postData(),
                    timestamp: new Date().toISOString()
                }
            });
        });
        
        // Monitor network responses
        this.page.on('response', response => {
            this.results.capturedData.push({
                type: 'network_response',
                data: {
                    url: response.url(),
                    status: response.status(),
                    headers: response.headers(),
                    timestamp: new Date().toISOString()
                }
            });
        });
    }

    async captureStorageData() {
        console.log('💾 Capturing storage data...');
        
        const storageData = await this.page.evaluate(() => {
            return {
                localStorage: Object.keys(localStorage).reduce((acc, key) => {
                    acc[key] = localStorage.getItem(key);
                    return acc;
                }, {}),
                sessionStorage: Object.keys(sessionStorage).reduce((acc, key) => {
                    acc[key] = sessionStorage.getItem(key);
                    return acc;
                }, {}),
                cookies: document.cookie,
                indexedDB: 'available', // Would need more complex code to read actual data
                cacheStorage: 'available' // Would need more complex code to read actual data
            };
        });
        
        this.results.capturedData.push({
            type: 'storage_data',
            data: storageData,
            timestamp: new Date().toISOString()
        });
    }

    async captureDeviceInfo() {
        console.log('📱 Capturing device information...');
        
        const deviceInfo = await this.page.evaluate(() => {
            return {
                devicePixelRatio: window.devicePixelRatio,
                colorGamut: window.screen.colorGamut,
                orientation: window.screen.orientation.type,
                mediaCapabilities: 'available',
                webGL: {
                    vendor: null,
                    renderer: null
                }
            };
        });
        
        // Get WebGL info
        try {
            const webglInfo = await this.page.evaluate(() => {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (gl) {
                    return {
                        vendor: gl.getParameter(gl.VENDOR),
                        renderer: gl.getParameter(gl.RENDERER)
                    };
                }
                return null;
            });
            
            if (webglInfo) {
                deviceInfo.webGL = webglInfo;
            }
        } catch (e) {
            deviceInfo.webGL.error = e.message;
        }
        
        this.results.capturedData.push({
            type: 'device_info',
            data: deviceInfo,
            timestamp: new Date().toISOString()
        });
    }

    async testStealthFormSubmission() {
        console.log('🕵️ Testing stealth form submission...');
        
        // Create and submit a hidden form
        await this.page.evaluate(() => {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'http://localhost:3000/capture';
            form.style.display = 'none';
            
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'stolen_data';
            input.value = JSON.stringify({
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent,
                cookies: document.cookie,
                localStorage: Object.keys(localStorage).reduce((acc, key) => {
                    acc[key] = localStorage.getItem(key);
                    return acc;
                }, {})
            });
            
            form.appendChild(input);
            document.body.appendChild(form);
            form.submit();
        });
        
        this.results.vulnerabilities.push({
            type: 'stealth_form_submission',
            description: 'Hidden form created and submitted automatically',
            timestamp: new Date().toISOString()
        });
    }

    async testBackgroundProcesses() {
        console.log('⚡ Testing background processes...');
        
        // Test service worker registration
        const swResult = await this.page.evaluate(async () => {
            if ('serviceWorker' in navigator) {
                try {
                    const registration = await navigator.serviceWorker.register('/sw.js');
                    return { success: true, scope: registration.scope };
                } catch (e) {
                    return { success: false, error: e.message };
                }
            }
            return { success: false, error: 'Service Worker not supported' };
        });
        
        this.results.vulnerabilities.push({
            type: 'background_processes',
            data: {
                serviceWorker: swResult,
                backgroundSync: 'available',
                pushNotifications: 'available'
            },
            timestamp: new Date().toISOString()
        });
    }

    async testPersistenceMechanisms() {
        console.log('🔒 Testing persistence mechanisms...');
        
        const persistenceData = await this.page.evaluate(() => {
            const mechanisms = {};
            
            // Test localStorage
            try {
                localStorage.setItem('test_persistence', 'data');
                mechanisms.localStorage = localStorage.getItem('test_persistence') === 'data';
                localStorage.removeItem('test_persistence');
            } catch (e) {
                mechanisms.localStorage = false;
            }
            
            // Test sessionStorage
            try {
                sessionStorage.setItem('test_persistence', 'data');
                mechanisms.sessionStorage = sessionStorage.getItem('test_persistence') === 'data';
                sessionStorage.removeItem('test_persistence');
            } catch (e) {
                mechanisms.sessionStorage = false;
            }
            
            // Test IndexedDB
            mechanisms.indexedDB = 'indexedDB' in window;
            
            // Test Cache API
            mechanisms.cacheAPI = 'caches' in window;
            
            // Test WebSQL (deprecated but still available in some browsers)
            mechanisms.webSQL = 'openDatabase' in window;
            
            return mechanisms;
        });
        
        this.results.vulnerabilities.push({
            type: 'persistence_mechanisms',
            data: persistenceData,
            timestamp: new Date().toISOString()
        });
    }

    async testAdvancedPersistence() {
        console.log('🔒 Testing advanced persistence mechanisms...');
        
        // Initialize persistence testing
        const persistenceTester = new PersistenceMechanisms(this.page);
        
        // Test all persistence mechanisms
        const persistenceResults = await persistenceTester.testAllPersistenceMechanisms();
        
        // Add to results
        this.results.capturedData.push({
            type: 'advanced_persistence',
            data: persistenceResults,
            timestamp: new Date().toISOString()
        });
        
        // Test service worker registration and background capabilities
        await this.page.evaluate(async () => {
            if ('serviceWorker' in navigator) {
                try {
                    const registration = await navigator.serviceWorker.register('/sw-persistence.js');
                    
                    // Test background sync
                    if ('sync' in registration) {
                        await registration.sync.register('background-sync-test');
                    }
                    
                    // Test push notifications
                    if ('pushManager' in registration) {
                        const subscription = await registration.pushManager.subscribe({
                            userVisibleOnly: false,
                            applicationServerKey: 'test-key'
                        });
                    }
                    
                    // Store data via service worker
                    if (navigator.serviceWorker.controller) {
                        navigator.serviceWorker.controller.postMessage({
                            type: 'store_data',
                            key: 'persistence_test',
                            value: {
                                timestamp: new Date().toISOString(),
                                type: 'service_worker_persistence',
                                data: 'This data persists via service worker'
                            }
                        });
                    }
                    
                } catch (error) {
                    console.error('Service worker error:', error);
                }
            }
        });
        
        // Test what happens when page is "closed" (simulated)
        console.log('🔄 Testing persistence after page "closure"...');
        
        // Simulate page closure by navigating away and back
        await this.page.goto('about:blank');
        await this.page.waitForTimeout(2000);
        await this.page.goto('http://localhost:3000');
        await this.page.waitForTimeout(2000);
        
        // Check if data persists
        const persistedData = await this.page.evaluate(async () => {
            const results = {};
            
            // Check localStorage
            results.localStorage = localStorage.getItem('test_persistence') === 'data';
            
            // Check sessionStorage
            results.sessionStorage = sessionStorage.getItem('test_persistence') === 'data';
            
            // Check IndexedDB
            if ('indexedDB' in window) {
                try {
                    const db = await new Promise((resolve, reject) => {
                        const request = indexedDB.open('PersistenceTestDB', 1);
                        request.onsuccess = () => resolve(request.result);
                        request.onerror = () => reject(request.error);
                    });
                    
                    const transaction = db.transaction(['testStore'], 'readonly');
                    const store = transaction.objectStore('testStore');
                    const data = await new Promise((resolve, reject) => {
                        const request = store.get('testKey');
                        request.onsuccess = () => resolve(request.result);
                        request.onerror = () => reject(request.error);
                    });
                    
                    results.indexedDB = !!data;
                } catch (error) {
                    results.indexedDB = false;
                }
            }
            
            // Check service worker
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.getRegistration();
                results.serviceWorker = !!registration;
            }
            
            return results;
        });
        
        this.results.vulnerabilities.push({
            type: 'persistence_after_closure',
            data: {
                persistenceResults: persistenceResults,
                afterClosureCheck: persistedData,
                summary: persistenceTester.getSummary()
            },
            timestamp: new Date().toISOString()
        });
    }

    async saveResults() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `attack_simulation_results_${timestamp}.json`;
        
        fs.writeFileSync(filename, JSON.stringify(this.results, null, 2));
        console.log(`💾 Results saved to ${filename}`);
        
        // Also save a summary
        const summary = {
            totalDataPoints: this.results.capturedData.length,
            totalVulnerabilities: this.results.vulnerabilities.length,
            dataTypes: [...new Set(this.results.capturedData.map(d => d.type))],
            vulnerabilityTypes: [...new Set(this.results.vulnerabilities.map(v => v.type))],
            timestamp: this.results.timestamp
        };
        
        const summaryFilename = `attack_summary_${timestamp}.json`;
        fs.writeFileSync(summaryFilename, JSON.stringify(summary, null, 2));
        console.log(`📋 Summary saved to ${summaryFilename}`);
    }

    async cleanup() {
        console.log('🧹 Cleaning up...');
        
        if (this.page) await this.page.close();
        if (this.context) await this.context.close();
        if (this.browser) await this.browser.close();
        
        console.log('✅ Cleanup complete');
    }

    async run() {
        try {
            await this.initialize();
            await this.simulateStealthAttack();
            await this.saveResults();
        } catch (error) {
            console.error('❌ Simulation failed:', error);
        } finally {
            await this.cleanup();
        }
    }
}

// Run the simulator
if (require.main === module) {
    const simulator = new HeadlessAttackSimulator();
    simulator.run();
}

module.exports = HeadlessAttackSimulator; 