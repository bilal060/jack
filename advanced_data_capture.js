/**
 * ADVANCED DATA CAPTURE MODULE
 * For Internal Security Research Only
 * 
 * This module provides advanced data capture techniques
 * including browser fingerprinting, network analysis, and
 * sophisticated data exfiltration methods.
 */

class AdvancedDataCapture {
    constructor(page) {
        this.page = page;
        this.capturedData = {
            browserFingerprint: {},
            networkActivity: [],
            deviceInfo: {},
            behavioralData: {},
            timingData: {},
            timestamp: new Date().toISOString()
        };
    }

    async captureAdvancedData() {
        console.log('🔍 Starting advanced data capture...');
        
        await this.captureBrowserFingerprint();
        await this.captureDeviceInformation();
        await this.captureNetworkBehavior();
        await this.captureBehavioralPatterns();
        await this.captureTimingAnalysis();
        await this.captureAdvancedStorage();
        await this.captureWebRTCData();
        await this.captureCanvasFingerprint();
        await this.captureAudioFingerprint();
        await this.captureFontFingerprint();
        
        return this.capturedData;
    }

    async captureBrowserFingerprint() {
        console.log('📊 Capturing advanced browser fingerprint...');
        
        const fingerprint = await this.page.evaluate(() => {
            return {
                // Basic browser info
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                languages: navigator.languages,
                cookieEnabled: navigator.cookieEnabled,
                onLine: navigator.onLine,
                doNotTrack: navigator.doNotTrack,
                
                // Hardware info
                hardwareConcurrency: navigator.hardwareConcurrency,
                deviceMemory: navigator.deviceMemory,
                maxTouchPoints: navigator.maxTouchPoints,
                
                // Screen info
                screen: {
                    width: screen.width,
                    height: screen.height,
                    availWidth: screen.availWidth,
                    availHeight: screen.availHeight,
                    colorDepth: screen.colorDepth,
                    pixelDepth: screen.pixelDepth,
                    orientation: screen.orientation ? screen.orientation.type : null
                },
                
                // Window info
                window: {
                    innerWidth: window.innerWidth,
                    innerHeight: window.innerHeight,
                    outerWidth: window.outerWidth,
                    outerHeight: window.outerHeight,
                    devicePixelRatio: window.devicePixelRatio
                },
                
                // Timezone and locale
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                dateFormat: new Intl.DateTimeFormat().format(new Date()),
                numberFormat: new Intl.NumberFormat().format(123456.789),
                
                // Plugin info
                plugins: Array.from(navigator.plugins).map(plugin => ({
                    name: plugin.name,
                    description: plugin.description,
                    filename: plugin.filename
                })),
                
                // MIME types
                mimeTypes: Array.from(navigator.mimeTypes).map(mime => ({
                    type: mime.type,
                    description: mime.description,
                    suffixes: mime.suffixes
                })),
                
                // Connection info
                connection: navigator.connection ? {
                    effectiveType: navigator.connection.effectiveType,
                    downlink: navigator.connection.downlink,
                    rtt: navigator.connection.rtt,
                    saveData: navigator.connection.saveData
                } : null,
                
                // Battery info
                battery: null, // Will be populated if available
                
                // Permissions
                permissions: {}
            };
        });

        // Try to get battery info
        try {
            const batteryInfo = await this.page.evaluate(async () => {
                if ('getBattery' in navigator) {
                    const battery = await navigator.getBattery();
                    return {
                        charging: battery.charging,
                        chargingTime: battery.chargingTime,
                        dischargingTime: battery.dischargingTime,
                        level: battery.level
                    };
                }
                return null;
            });
            fingerprint.battery = batteryInfo;
        } catch (error) {
            fingerprint.battery = { error: error.message };
        }

        // Check permissions
        const permissions = await this.page.evaluate(async () => {
            const permissionNames = [
                'geolocation', 'notifications', 'camera', 'microphone',
                'background-sync', 'persistent-storage', 'payment',
                'midi', 'magnetometer', 'gyroscope', 'accelerometer',
                'ambient-light-sensor', 'clipboard-read', 'clipboard-write',
                'display-capture', 'fullscreen', 'picture-in-picture',
                'publickey-credentials-get', 'screen-wake-lock',
                'storage-access', 'window-management'
            ];

            const results = {};
            for (const permission of permissionNames) {
                try {
                    const result = await navigator.permissions.query({ name: permission });
                    results[permission] = result.state;
                } catch (error) {
                    results[permission] = 'not-supported';
                }
            }
            return results;
        });
        fingerprint.permissions = permissions;

        this.capturedData.browserFingerprint = fingerprint;
    }

    async captureDeviceInformation() {
        console.log('📱 Capturing device information...');
        
        const deviceInfo = await this.page.evaluate(() => {
            return {
                // Device capabilities
                deviceOrientation: 'DeviceOrientationEvent' in window,
                deviceMotion: 'DeviceMotionEvent' in window,
                deviceProximity: 'DeviceProximityEvent' in window,
                deviceLight: 'DeviceLightEvent' in window,
                
                // Media capabilities
                mediaCapabilities: 'mediaCapabilities' in navigator,
                mediaDevices: 'mediaDevices' in navigator,
                
                // WebGL info
                webgl: (() => {
                    const canvas = document.createElement('canvas');
                    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                    if (gl) {
                        return {
                            vendor: gl.getParameter(gl.VENDOR),
                            renderer: gl.getParameter(gl.RENDERER),
                            version: gl.getParameter(gl.VERSION),
                            shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
                            extensions: gl.getSupportedExtensions()
                        };
                    }
                    return null;
                })(),
                
                // Audio context
                audioContext: (() => {
                    try {
                        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        return {
                            sampleRate: audioContext.sampleRate,
                            state: audioContext.state,
                            maxChannelCount: audioContext.destination.maxChannelCount
                        };
                    } catch (error) {
                        return { error: error.message };
                    }
                })(),
                
                // Touch support
                touchSupport: {
                    maxTouchPoints: navigator.maxTouchPoints,
                    touchEvent: 'ontouchstart' in window,
                    touchStart: 'ontouchstart' in window,
                    touchMove: 'ontouchmove' in window,
                    touchEnd: 'ontouchend' in window
                },
                
                // Pointer support
                pointerSupport: {
                    pointerEvent: 'onpointerdown' in window,
                    maxTouchPoints: navigator.maxTouchPoints
                },
                
                // Gamepad support
                gamepadSupport: 'getGamepads' in navigator,
                
                // Vibration support
                vibrationSupport: 'vibrate' in navigator,
                
                // Bluetooth support
                bluetoothSupport: 'bluetooth' in navigator,
                
                // USB support
                usbSupport: 'usb' in navigator,
                
                // Serial support
                serialSupport: 'serial' in navigator
            };
        });

        this.capturedData.deviceInfo = deviceInfo;
    }

    async captureNetworkBehavior() {
        console.log('🌐 Capturing network behavior...');
        
        // Monitor network requests
        this.page.on('request', request => {
            this.capturedData.networkActivity.push({
                type: 'request',
                url: request.url(),
                method: request.method(),
                headers: request.headers(),
                postData: request.postData(),
                timestamp: new Date().toISOString()
            });
        });

        // Monitor network responses
        this.page.on('response', response => {
            this.capturedData.networkActivity.push({
                type: 'response',
                url: response.url(),
                status: response.status(),
                headers: response.headers(),
                timestamp: new Date().toISOString()
            });
        });

        // Monitor console logs
        this.page.on('console', msg => {
            this.capturedData.networkActivity.push({
                type: 'console',
                text: msg.text(),
                type: msg.type(),
                timestamp: new Date().toISOString()
            });
        });
    }

    async captureBehavioralPatterns() {
        console.log('🎭 Capturing behavioral patterns...');
        
        const behavioralData = await this.page.evaluate(() => {
            return {
                // Mouse movement patterns
                mousePatterns: {
                    hasMouse: 'onmousemove' in window,
                    hasWheel: 'onwheel' in window
                },
                
                // Keyboard patterns
                keyboardPatterns: {
                    hasKeyboard: 'onkeydown' in window,
                    hasKeyPress: 'onkeypress' in window
                },
                
                // Focus patterns
                focusPatterns: {
                    hasFocus: 'onfocus' in window,
                    hasBlur: 'onblur' in window
                },
                
                // Scroll patterns
                scrollPatterns: {
                    hasScroll: 'onscroll' in window,
                    scrollX: window.scrollX,
                    scrollY: window.scrollY
                },
                
                // Resize patterns
                resizePatterns: {
                    hasResize: 'onresize' in window
                },
                
                // Performance timing
                performanceTiming: (() => {
                    if ('performance' in window && 'timing' in performance) {
                        const timing = performance.timing;
                        return {
                            navigationStart: timing.navigationStart,
                            loadEventEnd: timing.loadEventEnd,
                            domContentLoadedEventEnd: timing.domContentLoadedEventEnd,
                            responseEnd: timing.responseEnd,
                            requestStart: timing.requestStart,
                            domainLookupEnd: timing.domainLookupEnd,
                            domainLookupStart: timing.domainLookupStart,
                            connectEnd: timing.connectEnd,
                            connectStart: timing.connectStart
                        };
                    }
                    return null;
                })(),
                
                // Memory usage
                memoryUsage: (() => {
                    if ('memory' in performance) {
                        return {
                            usedJSHeapSize: performance.memory.usedJSHeapSize,
                            totalJSHeapSize: performance.memory.totalJSHeapSize,
                            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
                        };
                    }
                    return null;
                })()
            };
        });

        this.capturedData.behavioralData = behavioralData;
    }

    async captureTimingAnalysis() {
        console.log('⏱️ Capturing timing analysis...');
        
        const timingData = await this.page.evaluate(() => {
            return {
                // Page load timing
                pageLoadTiming: {
                    loadTime: performance.now(),
                    domContentLoaded: performance.timing ? 
                        performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart : null,
                    loadComplete: performance.timing ? 
                        performance.timing.loadEventEnd - performance.timing.navigationStart : null
                },
                
                // Resource timing
                resourceTiming: (() => {
                    if ('getEntriesByType' in performance) {
                        const resources = performance.getEntriesByType('resource');
                        return resources.map(resource => ({
                            name: resource.name,
                            duration: resource.duration,
                            startTime: resource.startTime,
                            transferSize: resource.transferSize,
                            encodedBodySize: resource.encodedBodySize,
                            decodedBodySize: resource.decodedBodySize
                        }));
                    }
                    return [];
                })(),
                
                // Navigation timing
                navigationTiming: (() => {
                    if ('getEntriesByType' in performance) {
                        const navigation = performance.getEntriesByType('navigation')[0];
                        if (navigation) {
                            return {
                                type: navigation.type,
                                duration: navigation.duration,
                                domContentLoadedEventEnd: navigation.domContentLoadedEventEnd,
                                loadEventEnd: navigation.loadEventEnd
                            };
                        }
                    }
                    return null;
                })()
            };
        });

        this.capturedData.timingData = timingData;
    }

    async captureAdvancedStorage() {
        console.log('💾 Capturing advanced storage data...');
        
        const storageData = await this.page.evaluate(async () => {
            return {
                // Local Storage
                localStorage: (() => {
                    const data = {};
                    for (let i = 0; i < localStorage.length; i++) {
                        const key = localStorage.key(i);
                        data[key] = localStorage.getItem(key);
                    }
                    return data;
                })(),
                
                // Session Storage
                sessionStorage: (() => {
                    const data = {};
                    for (let i = 0; i < sessionStorage.length; i++) {
                        const key = sessionStorage.key(i);
                        data[key] = sessionStorage.getItem(key);
                    }
                    return data;
                })(),
                
                // IndexedDB
                indexedDB: (() => {
                    if ('indexedDB' in window) {
                        return 'available';
                    }
                    return 'not-supported';
                })(),
                
                // Cache Storage
                cacheStorage: (() => {
                    if ('caches' in window) {
                        return 'available';
                    }
                    return 'not-supported';
                })(),
                
                // WebSQL
                webSQL: (() => {
                    if ('openDatabase' in window) {
                        return 'available';
                    }
                    return 'not-supported';
                })(),
                
                // Cookies
                cookies: document.cookie,
                
                // Service Workers
                serviceWorkers: (() => {
                    if ('serviceWorker' in navigator) {
                        return 'available';
                    }
                    return 'not-supported';
                })()
            };
        });

        this.capturedData.storageData = storageData;
    }

    async captureWebRTCData() {
        console.log('📡 Capturing WebRTC data...');
        
        const webrtcData = await this.page.evaluate(() => {
            return {
                // WebRTC support
                webrtcSupport: {
                    RTCPeerConnection: 'RTCPeerConnection' in window,
                    RTCSessionDescription: 'RTCSessionDescription' in window,
                    RTCIceCandidate: 'RTCIceCandidate' in window
                },
                
                // Media devices
                mediaDevices: (() => {
                    if ('mediaDevices' in navigator) {
                        return {
                            getUserMedia: 'getUserMedia' in navigator.mediaDevices,
                            enumerateDevices: 'enumerateDevices' in navigator.mediaDevices
                        };
                    }
                    return null;
                })(),
                
                // ICE servers (if any)
                iceServers: []
            };
        });

        this.capturedData.webrtcData = webrtcData;
    }

    async captureCanvasFingerprint() {
        console.log('🎨 Capturing canvas fingerprint...');
        
        const canvasFingerprint = await this.page.evaluate(() => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Draw text
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillText('Canvas fingerprint test', 2, 2);
            
            // Draw shapes
            ctx.fillStyle = 'rgb(255, 0, 255)';
            ctx.beginPath();
            ctx.arc(50, 50, 50, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw gradients
            const gradient = ctx.createLinearGradient(0, 0, 200, 0);
            gradient.addColorStop(0, 'red');
            gradient.addColorStop(1, 'blue');
            ctx.fillStyle = gradient;
            ctx.fillRect(100, 100, 100, 50);
            
            return {
                dataURL: canvas.toDataURL(),
                width: canvas.width,
                height: canvas.height
            };
        });

        this.capturedData.canvasFingerprint = canvasFingerprint;
    }

    async captureAudioFingerprint() {
        console.log('🎵 Capturing audio fingerprint...');
        
        const audioFingerprint = await this.page.evaluate(() => {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const analyser = audioContext.createAnalyser();
                
                oscillator.connect(analyser);
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(10000, audioContext.currentTime);
                
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(dataArray);
                
                return {
                    sampleRate: audioContext.sampleRate,
                    frequencyData: Array.from(dataArray).slice(0, 10),
                    state: audioContext.state
                };
            } catch (error) {
                return { error: error.message };
            }
        });

        this.capturedData.audioFingerprint = audioFingerprint;
    }

    async captureFontFingerprint() {
        console.log('🔤 Capturing font fingerprint...');
        
        const fontFingerprint = await this.page.evaluate(() => {
            const testString = 'mmmmmmmmmmlli';
            const testSize = '72px';
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            const fonts = [
                'Arial', 'Verdana', 'Times New Roman', 'Courier New',
                'Georgia', 'Palatino', 'Garamond', 'Bookman',
                'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'
            ];
            
            const measurements = {};
            context.font = testSize + ' Arial';
            const baseWidth = context.measureText(testString).width;
            
            fonts.forEach(font => {
                context.font = testSize + ' ' + font;
                measurements[font] = context.measureText(testString).width;
            });
            
            return {
                baseWidth: baseWidth,
                fontMeasurements: measurements
            };
        });

        this.capturedData.fontFingerprint = fontFingerprint;
    }

    getSummary() {
        return {
            totalDataPoints: Object.keys(this.capturedData).length,
            browserFingerprintSize: Object.keys(this.capturedData.browserFingerprint).length,
            networkRequests: this.capturedData.networkActivity.filter(item => item.type === 'request').length,
            networkResponses: this.capturedData.networkActivity.filter(item => item.type === 'response').length,
            timestamp: this.capturedData.timestamp
        };
    }
}

module.exports = AdvancedDataCapture; 