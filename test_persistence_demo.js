#!/usr/bin/env node

/**
 * PERSISTENCE DEMO - What Works When Pages Close
 * For Internal Security Research Only
 * 
 * This script demonstrates exactly what can and cannot persist
 * when web pages are closed or browsers are restarted.
 */

const { chromium } = require('playwright');

async function runPersistenceDemo() {
    console.log('🔍 PERSISTENCE DEMO - What Works When Pages Close');
    console.log('='.repeat(60));
    
    const browser = await chromium.launch({ headless: false }); // Show browser for demo
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Navigate to test page
    await page.goto('http://localhost:3000');
    
    console.log('\n📝 Setting up persistence mechanisms...');
    
    // Set up various persistence mechanisms
    await page.evaluate(() => {
        // 1. Local Storage (PERSISTS across browser sessions)
        localStorage.setItem('demo_localStorage', JSON.stringify({
            timestamp: new Date().toISOString(),
            type: 'localStorage',
            message: 'This WILL persist when browser closes'
        }));
        
        // 2. Session Storage (PERSISTS until tab closes)
        sessionStorage.setItem('demo_sessionStorage', JSON.stringify({
            timestamp: new Date().toISOString(),
            type: 'sessionStorage',
            message: 'This will persist until tab closes'
        }));
        
        // 3. IndexedDB (PERSISTS across browser sessions)
        const request = indexedDB.open('DemoDB', 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('demoStore')) {
                db.createObjectStore('demoStore');
            }
        };
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['demoStore'], 'readwrite');
            const store = transaction.objectStore('demoStore');
            store.put({
                timestamp: new Date().toISOString(),
                type: 'indexedDB',
                message: 'This WILL persist when browser closes'
            }, 'demoKey');
        };
        
        // 4. Service Worker (PERSISTS until manually unregistered)
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw-persistence.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration.scope);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
        
        // 5. Cache Storage (PERSISTS until manually cleared)
        if ('caches' in window) {
            caches.open('demo-cache')
                .then(cache => {
                    const response = new Response(JSON.stringify({
                        timestamp: new Date().toISOString(),
                        type: 'cacheStorage',
                        message: 'This WILL persist when browser closes'
                    }));
                    return cache.put('/demo-data', response);
                });
        }
        
        // 6. Cookies (PERSISTS based on expiration)
        document.cookie = `demo_cookie=${encodeURIComponent(JSON.stringify({
            timestamp: new Date().toISOString(),
            type: 'cookie',
            message: 'This WILL persist until expiration'
        }))}; max-age=3600; path=/`;
        
        console.log('✅ All persistence mechanisms set up');
    });
    
    console.log('\n⏳ Waiting 5 seconds before "closing" page...');
    await page.waitForTimeout(5000);
    
    console.log('\n🔄 Simulating page closure by navigating away...');
    await page.goto('about:blank');
    await page.waitForTimeout(3000);
    
    console.log('\n🔄 Returning to test page...');
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    
    console.log('\n🔍 Checking what persisted...');
    
    const persistenceResults = await page.evaluate(() => {
        const results = {};
        
        // Check Local Storage
        try {
            const localStorageData = localStorage.getItem('demo_localStorage');
            results.localStorage = localStorageData ? JSON.parse(localStorageData) : null;
        } catch (e) {
            results.localStorage = null;
        }
        
        // Check Session Storage
        try {
            const sessionStorageData = sessionStorage.getItem('demo_sessionStorage');
            results.sessionStorage = sessionStorageData ? JSON.parse(sessionStorageData) : null;
        } catch (e) {
            results.sessionStorage = null;
        }
        
        // Check IndexedDB
        return new Promise((resolve) => {
            if ('indexedDB' in window) {
                const request = indexedDB.open('DemoDB', 1);
                request.onsuccess = (event) => {
                    const db = event.target.result;
                    const transaction = db.transaction(['demoStore'], 'readonly');
                    const store = transaction.objectStore('demoStore');
                    const getRequest = store.get('demoKey');
                    getRequest.onsuccess = () => {
                        results.indexedDB = getRequest.result;
                        
                        // Check Cache Storage
                        if ('caches' in window) {
                            caches.open('demo-cache')
                                .then(cache => cache.match('/demo-data'))
                                .then(response => response ? response.json() : null)
                                .then(data => {
                                    results.cacheStorage = data;
                                    
                                    // Check Cookies
                                    const cookies = document.cookie.split(';');
                                    const demoCookie = cookies.find(c => c.trim().startsWith('demo_cookie='));
                                    if (demoCookie) {
                                        const cookieValue = demoCookie.split('=')[1];
                                        results.cookie = JSON.parse(decodeURIComponent(cookieValue));
                                    } else {
                                        results.cookie = null;
                                    }
                                    
                                    // Check Service Worker
                                    if ('serviceWorker' in navigator) {
                                        navigator.serviceWorker.getRegistration()
                                            .then(registration => {
                                                results.serviceWorker = registration ? {
                                                    scope: registration.scope,
                                                    active: !!registration.active
                                                } : null;
                                                resolve(results);
                                            });
                                    } else {
                                        results.serviceWorker = null;
                                        resolve(results);
                                    }
                                });
                        } else {
                            results.cacheStorage = null;
                            results.cookie = null;
                            results.serviceWorker = null;
                            resolve(results);
                        }
                    };
                };
            } else {
                results.indexedDB = null;
                results.cacheStorage = null;
                results.cookie = null;
                results.serviceWorker = null;
                resolve(results);
            }
        });
    });
    
    console.log('\n📊 PERSISTENCE RESULTS:');
    console.log('='.repeat(60));
    
    Object.entries(persistenceResults).forEach(([mechanism, data]) => {
        const status = data ? '✅ PERSISTED' : '❌ LOST';
        console.log(`${mechanism.padEnd(15)}: ${status}`);
        if (data) {
            console.log(`  └─ ${data.message}`);
        }
    });
    
    console.log('\n📋 SUMMARY:');
    console.log('='.repeat(60));
    console.log('✅ WILL PERSIST when page closes:');
    console.log('  - Local Storage');
    console.log('  - IndexedDB');
    console.log('  - Cache Storage');
    console.log('  - Cookies (until expiration)');
    console.log('  - Service Workers (until unregistered)');
    
    console.log('\n❌ WILL NOT PERSIST when page closes:');
    console.log('  - Session Storage (lost when tab closes)');
    console.log('  - JavaScript variables');
    console.log('  - DOM elements');
    console.log('  - Event listeners');
    console.log('  - Timers and intervals');
    
    console.log('\n⚠️  LIMITED PERSISTENCE:');
    console.log('  - Service Workers can only run background sync/push');
    console.log('  - Cannot execute arbitrary code after page closes');
    console.log('  - Cannot access DOM or make new network requests');
    console.log('  - Cannot detect when user closes page');
    
    await browser.close();
}

// Run the demo
if (require.main === module) {
    runPersistenceDemo().catch(console.error);
}

module.exports = runPersistenceDemo; 