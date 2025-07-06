/**
 * PERSISTENCE MECHANISMS FOR HEADLESS BROWSER ATTACKS
 * For Internal Security Research Only
 * 
 * This module demonstrates various ways to maintain persistence
 * even when pages are closed or browsers are restarted.
 */

class PersistenceMechanisms {
    constructor(page) {
        this.page = page;
        this.persistenceData = {
            mechanisms: {},
            success: [],
            failures: [],
            timestamp: new Date().toISOString()
        };
    }

    async testAllPersistenceMechanisms() {
        console.log('🔒 Testing persistence mechanisms...');
        
        await this.testLocalStorage();
        await this.testSessionStorage();
        await this.testIndexedDB();
        await this.testCacheStorage();
        await this.testServiceWorker();
        await this.testPushNotifications();
        await this.testBackgroundSync();
        await this.testPersistentStorage();
        await this.testWebSQL();
        await this.testAppCache();
        await this.testFileSystem();
        await this.testWebRTC();
        await this.testWebSocket();
        await this.testSharedWorker();
        await this.testBroadcastChannel();
        
        return this.persistenceData;
    }

    async testLocalStorage() {
        try {
            const result = await this.page.evaluate(() => {
                const testKey = 'persistence_test_localStorage';
                const testData = {
                    timestamp: new Date().toISOString(),
                    type: 'localStorage',
                    data: 'This data persists across browser sessions'
                };
                
                localStorage.setItem(testKey, JSON.stringify(testData));
                const retrieved = localStorage.getItem(testKey);
                
                return {
                    success: true,
                    canWrite: true,
                    canRead: true,
                    data: JSON.parse(retrieved),
                    size: localStorage.length,
                    quota: '5-10MB (browser dependent)'
                };
            });
            
            this.persistenceData.mechanisms.localStorage = result;
            this.persistenceData.success.push('localStorage');
            
        } catch (error) {
            this.persistenceData.mechanisms.localStorage = { success: false, error: error.message };
            this.persistenceData.failures.push('localStorage');
        }
    }

    async testSessionStorage() {
        try {
            const result = await this.page.evaluate(() => {
                const testKey = 'persistence_test_sessionStorage';
                const testData = {
                    timestamp: new Date().toISOString(),
                    type: 'sessionStorage',
                    data: 'This data persists until tab/browser closes'
                };
                
                sessionStorage.setItem(testKey, JSON.stringify(testData));
                const retrieved = sessionStorage.getItem(testKey);
                
                return {
                    success: true,
                    canWrite: true,
                    canRead: true,
                    data: JSON.parse(retrieved),
                    size: sessionStorage.length,
                    persistence: 'Until tab/browser closes'
                };
            });
            
            this.persistenceData.mechanisms.sessionStorage = result;
            this.persistenceData.success.push('sessionStorage');
            
        } catch (error) {
            this.persistenceData.mechanisms.sessionStorage = { success: false, error: error.message };
            this.persistenceData.failures.push('sessionStorage');
        }
    }

    async testIndexedDB() {
        try {
            const result = await this.page.evaluate(() => {
                return new Promise((resolve) => {
                    const request = indexedDB.open('PersistenceTestDB', 1);
                    
                    request.onerror = () => {
                        resolve({ success: false, error: 'IndexedDB not supported' });
                    };
                    
                    request.onsuccess = (event) => {
                        const db = event.target.result;
                        const transaction = db.transaction(['testStore'], 'readwrite');
                        const store = transaction.objectStore('testStore');
                        
                        const testData = {
                            timestamp: new Date().toISOString(),
                            type: 'indexedDB',
                            data: 'This data persists across browser sessions'
                        };
                        
                        const putRequest = store.put(testData, 'testKey');
                        
                        putRequest.onsuccess = () => {
                            const getRequest = store.get('testKey');
                            getRequest.onsuccess = () => {
                                resolve({
                                    success: true,
                                    canWrite: true,
                                    canRead: true,
                                    data: getRequest.result,
                                    quota: '50% of available disk space',
                                    persistence: 'Until manually cleared'
                                });
                            };
                        };
                    };
                    
                    request.onupgradeneeded = (event) => {
                        const db = event.target.result;
                        if (!db.objectStoreNames.contains('testStore')) {
                            db.createObjectStore('testStore');
                        }
                    };
                });
            });
            
            this.persistenceData.mechanisms.indexedDB = result;
            if (result.success) {
                this.persistenceData.success.push('indexedDB');
            } else {
                this.persistenceData.failures.push('indexedDB');
            }
            
        } catch (error) {
            this.persistenceData.mechanisms.indexedDB = { success: false, error: error.message };
            this.persistenceData.failures.push('indexedDB');
        }
    }

    async testCacheStorage() {
        try {
            const result = await this.page.evaluate(async () => {
                if ('caches' in window) {
                    const cache = await caches.open('persistence-test-cache');
                    const testData = {
                        timestamp: new Date().toISOString(),
                        type: 'cacheStorage',
                        data: 'This data persists across browser sessions'
                    };
                    
                    const response = new Response(JSON.stringify(testData));
                    await cache.put('/test-data', response);
                    
                    const retrieved = await cache.match('/test-data');
                    const data = await retrieved.json();
                    
                    return {
                        success: true,
                        canWrite: true,
                        canRead: true,
                        data: data,
                        quota: 'Dynamic based on available space',
                        persistence: 'Until manually cleared'
                    };
                } else {
                    return { success: false, error: 'Cache API not supported' };
                }
            });
            
            this.persistenceData.mechanisms.cacheStorage = result;
            if (result.success) {
                this.persistenceData.success.push('cacheStorage');
            } else {
                this.persistenceData.failures.push('cacheStorage');
            }
            
        } catch (error) {
            this.persistenceData.mechanisms.cacheStorage = { success: false, error: error.message };
            this.persistenceData.failures.push('cacheStorage');
        }
    }

    async testServiceWorker() {
        try {
            const result = await this.page.evaluate(async () => {
                if ('serviceWorker' in navigator) {
                    try {
                        const registration = await navigator.serviceWorker.register('/sw-persistence.js');
                        
                        return {
                            success: true,
                            canRegister: true,
                            scope: registration.scope,
                            state: registration.active ? 'active' : 'installing',
                            persistence: 'Until manually unregistered',
                            capabilities: [
                                'Background sync (with permission)',
                                'Push notifications (with permission)',
                                'Cache management',
                                'Network interception'
                            ]
                        };
                    } catch (error) {
                        return { success: false, error: error.message };
                    }
                } else {
                    return { success: false, error: 'Service Worker not supported' };
                }
            });
            
            this.persistenceData.mechanisms.serviceWorker = result;
            if (result.success) {
                this.persistenceData.success.push('serviceWorker');
            } else {
                this.persistenceData.failures.push('serviceWorker');
            }
            
        } catch (error) {
            this.persistenceData.mechanisms.serviceWorker = { success: false, error: error.message };
            this.persistenceData.failures.push('serviceWorker');
        }
    }

    async testPushNotifications() {
        try {
            const result = await this.page.evaluate(async () => {
                if ('serviceWorker' in navigator && 'PushManager' in window) {
                    try {
                        const registration = await navigator.serviceWorker.register('/sw-push.js');
                        const subscription = await registration.pushManager.subscribe({
                            userVisibleOnly: false,
                            applicationServerKey: 'test-key'
                        });
                        
                        return {
                            success: true,
                            canSubscribe: true,
                            subscription: subscription.toJSON(),
                            persistence: 'Until manually unsubscribed',
                            capabilities: [
                                'Receive notifications when page is closed',
                                'Trigger background events',
                                'Wake up service worker'
                            ]
                        };
                    } catch (error) {
                        return { success: false, error: error.message };
                    }
                } else {
                    return { success: false, error: 'Push API not supported' };
                }
            });
            
            this.persistenceData.mechanisms.pushNotifications = result;
            if (result.success) {
                this.persistenceData.success.push('pushNotifications');
            } else {
                this.persistenceData.failures.push('pushNotifications');
            }
            
        } catch (error) {
            this.persistenceData.mechanisms.pushNotifications = { success: false, error: error.message };
            this.persistenceData.failures.push('pushNotifications');
        }
    }

    async testBackgroundSync() {
        try {
            const result = await this.page.evaluate(async () => {
                if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
                    try {
                        const registration = await navigator.serviceWorker.register('/sw-sync.js');
                        await registration.sync.register('background-sync-test');
                        
                        return {
                            success: true,
                            canRegister: true,
                            persistence: 'Until sync completes or fails',
                            capabilities: [
                                'Sync data when connection restored',
                                'Retry failed requests',
                                'Background processing'
                            ]
                        };
                    } catch (error) {
                        return { success: false, error: error.message };
                    }
                } else {
                    return { success: false, error: 'Background Sync not supported' };
                }
            });
            
            this.persistenceData.mechanisms.backgroundSync = result;
            if (result.success) {
                this.persistenceData.success.push('backgroundSync');
            } else {
                this.persistenceData.failures.push('backgroundSync');
            }
            
        } catch (error) {
            this.persistenceData.mechanisms.backgroundSync = { success: false, error: error.message };
            this.persistenceData.failures.push('backgroundSync');
        }
    }

    async testPersistentStorage() {
        try {
            const result = await this.page.evaluate(async () => {
                if ('storage' in navigator && 'persist' in navigator.storage) {
                    try {
                        const isPersisted = await navigator.storage.persist();
                        
                        return {
                            success: true,
                            canPersist: true,
                            isPersisted: isPersisted,
                            persistence: 'Data marked for persistence',
                            capabilities: [
                                'Prevent automatic cleanup',
                                'Survive storage pressure',
                                'Long-term data retention'
                            ]
                        };
                    } catch (error) {
                        return { success: false, error: error.message };
                    }
                } else {
                    return { success: false, error: 'Persistent Storage not supported' };
                }
            });
            
            this.persistenceData.mechanisms.persistentStorage = result;
            if (result.success) {
                this.persistenceData.success.push('persistentStorage');
            } else {
                this.persistenceData.failures.push('persistentStorage');
            }
            
        } catch (error) {
            this.persistenceData.mechanisms.persistentStorage = { success: false, error: error.message };
            this.persistenceData.failures.push('persistentStorage');
        }
    }

    async testWebSQL() {
        try {
            const result = await this.page.evaluate(() => {
                if ('openDatabase' in window) {
                    try {
                        const db = openDatabase('PersistenceTestWebSQL', '1.0', 'Test Database', 2 * 1024 * 1024);
                        
                        return new Promise((resolve) => {
                            db.transaction((tx) => {
                                tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY, data TEXT)');
                                tx.executeSql('INSERT OR REPLACE INTO test_table (id, data) VALUES (?, ?)', 
                                    [1, JSON.stringify({
                                        timestamp: new Date().toISOString(),
                                        type: 'webSQL',
                                        data: 'This data persists across browser sessions'
                                    })]
                                );
                                tx.executeSql('SELECT * FROM test_table WHERE id = ?', [1], (tx, results) => {
                                    resolve({
                                        success: true,
                                        canWrite: true,
                                        canRead: true,
                                        data: JSON.parse(results.rows.item(0).data),
                                        quota: 'Dynamic based on available space',
                                        persistence: 'Until manually cleared'
                                    });
                                });
                            });
                        });
                    } catch (error) {
                        return { success: false, error: error.message };
                    }
                } else {
                    return { success: false, error: 'WebSQL not supported' };
                }
            });
            
            this.persistenceData.mechanisms.webSQL = result;
            if (result.success) {
                this.persistenceData.success.push('webSQL');
            } else {
                this.persistenceData.failures.push('webSQL');
            }
            
        } catch (error) {
            this.persistenceData.mechanisms.webSQL = { success: false, error: error.message };
            this.persistenceData.failures.push('webSQL');
        }
    }

    async testAppCache() {
        try {
            const result = await this.page.evaluate(() => {
                if ('applicationCache' in window) {
                    return {
                        success: true,
                        canUse: true,
                        status: window.applicationCache.status,
                        persistence: 'Until manually cleared',
                        note: 'Deprecated but still available in some browsers'
                    };
                } else {
                    return { success: false, error: 'Application Cache not supported' };
                }
            });
            
            this.persistenceData.mechanisms.appCache = result;
            if (result.success) {
                this.persistenceData.success.push('appCache');
            } else {
                this.persistenceData.failures.push('appCache');
            }
            
        } catch (error) {
            this.persistenceData.mechanisms.appCache = { success: false, error: error.message };
            this.persistenceData.failures.push('appCache');
        }
    }

    async testFileSystem() {
        try {
            const result = await this.page.evaluate(() => {
                if ('webkitRequestFileSystem' in window) {
                    return {
                        success: true,
                        canUse: true,
                        persistence: 'Until manually cleared',
                        capabilities: [
                            'File storage',
                            'Directory creation',
                            'Binary data storage'
                        ],
                        note: 'WebKit-specific API'
                    };
                } else {
                    return { success: false, error: 'File System API not supported' };
                }
            });
            
            this.persistenceData.mechanisms.fileSystem = result;
            if (result.success) {
                this.persistenceData.success.push('fileSystem');
            } else {
                this.persistenceData.failures.push('fileSystem');
            }
            
        } catch (error) {
            this.persistenceData.mechanisms.fileSystem = { success: false, error: error.message };
            this.persistenceData.failures.push('fileSystem');
        }
    }

    async testWebRTC() {
        try {
            const result = await this.page.evaluate(() => {
                if ('RTCPeerConnection' in window) {
                    return {
                        success: true,
                        canUse: true,
                        persistence: 'Connection-based',
                        capabilities: [
                            'Peer-to-peer communication',
                            'Data channels',
                            'Media streaming'
                        ],
                        note: 'Requires active connection'
                    };
                } else {
                    return { success: false, error: 'WebRTC not supported' };
                }
            });
            
            this.persistenceData.mechanisms.webRTC = result;
            if (result.success) {
                this.persistenceData.success.push('webRTC');
            } else {
                this.persistenceData.failures.push('webRTC');
            }
            
        } catch (error) {
            this.persistenceData.mechanisms.webRTC = { success: false, error: error.message };
            this.persistenceData.failures.push('webRTC');
        }
    }

    async testWebSocket() {
        try {
            const result = await this.page.evaluate(() => {
                if ('WebSocket' in window) {
                    return {
                        success: true,
                        canUse: true,
                        persistence: 'Connection-based',
                        capabilities: [
                            'Real-time communication',
                            'Bidirectional data transfer',
                            'Automatic reconnection'
                        ],
                        note: 'Requires active connection'
                    };
                } else {
                    return { success: false, error: 'WebSocket not supported' };
                }
            });
            
            this.persistenceData.mechanisms.webSocket = result;
            if (result.success) {
                this.persistenceData.success.push('webSocket');
            } else {
                this.persistenceData.failures.push('webSocket');
            }
            
        } catch (error) {
            this.persistenceData.mechanisms.webSocket = { success: false, error: error.message };
            this.persistenceData.failures.push('webSocket');
        }
    }

    async testSharedWorker() {
        try {
            const result = await this.page.evaluate(() => {
                if ('SharedWorker' in window) {
                    return {
                        success: true,
                        canUse: true,
                        persistence: 'Until all tabs close',
                        capabilities: [
                            'Shared state across tabs',
                            'Background processing',
                            'Inter-tab communication'
                        ],
                        note: 'Survives individual tab closure'
                    };
                } else {
                    return { success: false, error: 'SharedWorker not supported' };
                }
            });
            
            this.persistenceData.mechanisms.sharedWorker = result;
            if (result.success) {
                this.persistenceData.success.push('sharedWorker');
            } else {
                this.persistenceData.failures.push('sharedWorker');
            }
            
        } catch (error) {
            this.persistenceData.mechanisms.sharedWorker = { success: false, error: error.message };
            this.persistenceData.failures.push('sharedWorker');
        }
    }

    async testBroadcastChannel() {
        try {
            const result = await this.page.evaluate(() => {
                if ('BroadcastChannel' in window) {
                    return {
                        success: true,
                        canUse: true,
                        persistence: 'Channel-based',
                        capabilities: [
                            'Cross-tab communication',
                            'Message broadcasting',
                            'Event-driven communication'
                        ],
                        note: 'Requires active tabs'
                    };
                } else {
                    return { success: false, error: 'BroadcastChannel not supported' };
                }
            });
            
            this.persistenceData.mechanisms.broadcastChannel = result;
            if (result.success) {
                this.persistenceData.success.push('broadcastChannel');
            } else {
                this.persistenceData.failures.push('broadcastChannel');
            }
            
        } catch (error) {
            this.persistenceData.mechanisms.broadcastChannel = { success: false, error: error.message };
            this.persistenceData.failures.push('broadcastChannel');
        }
    }

    getSummary() {
        return {
            totalMechanisms: Object.keys(this.persistenceData.mechanisms).length,
            successful: this.persistenceData.success.length,
            failed: this.persistenceData.failures.length,
            successRate: `${Math.round((this.persistenceData.success.length / Object.keys(this.persistenceData.mechanisms).length) * 100)}%`,
            mechanisms: this.persistenceData.mechanisms
        };
    }
}

module.exports = PersistenceMechanisms; 