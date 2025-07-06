#!/usr/bin/env node

/**
 * HEADLESS BROWSER ATTACK SIMULATION RUNNER
 * For Internal Security Research Only
 * 
 * This script runs the complete attack simulation using a headless browser
 * with full permissions against the test server.
 */

const HeadlessAttackSimulator = require('./headless_attack_simulator');
const AdvancedDataCapture = require('./advanced_data_capture');
const SocialEngineeringAttack = require('./social_engineering_attack');
const NetworkAttackModule = require('./network_attack_module');
const config = require('./headless_config');
const fs = require('fs');
const path = require('path');

// Import new advanced modules
const MLAttackModule = require('./ml_attack_module');
const AdvancedSocialEngineering = require('./advanced_social_engineering');
const AdvancedNetworkAttacks = require('./advanced_network_attacks');
const AdvancedPersistence = require('./advanced_persistence_simple');
const AdvancedEvasion = require('./advanced_evasion');

class AttackSimulationRunner {
    constructor() {
        this.simulator = null;
        this.results = {
            startTime: null,
            endTime: null,
            duration: null,
            success: false,
            errors: [],
            capturedData: [],
            vulnerabilities: []
        };
    }

    async run() {
        console.log('🚀 Starting Headless Browser Attack Simulation');
        console.log('⚠️  WARNING: This is for internal security research only!');
        console.log('📋 Target: Local test server only');
        console.log('🔒 All data will be deleted after testing\n');

        this.results.startTime = new Date();

        try {
            // 1. Initialize the simulator
            console.log('📦 Initializing attack simulator...');
            this.simulator = new HeadlessAttackSimulator();
            await this.simulator.initialize();

            // 2. Run the attack simulation
            console.log('🎯 Running attack simulation...');
            await this.simulator.simulateStealthAttack();
            
            // 3. Run advanced data capture
            console.log('🔍 Running advanced data capture...');
            const advancedCapture = new AdvancedDataCapture(this.simulator.page);
            const advancedData = await advancedCapture.captureAdvancedData();
            this.results.capturedData.push({
                type: 'advanced_capture',
                data: advancedData,
                timestamp: new Date().toISOString()
            });
            
            // 4. Run social engineering attacks
            console.log('🎭 Running social engineering attacks...');
            const socialEngineering = new SocialEngineeringAttack(this.simulator.page);
            const socialData = await socialEngineering.executeSocialEngineeringAttacks();
            this.results.capturedData.push({
                type: 'social_engineering',
                data: socialData,
                timestamp: new Date().toISOString()
            });
            
            // 5. Run network attacks
            console.log('🌐 Running network attacks...');
            const networkAttacks = new NetworkAttackModule(this.simulator.page);
            const networkData = await networkAttacks.executeNetworkAttacks();
            this.results.capturedData.push({
                type: 'network_attacks',
                data: networkData,
                timestamp: new Date().toISOString()
            });

            // 3. Collect results
            console.log('📊 Collecting results...');
            this.results.capturedData = this.simulator.results.capturedData;
            this.results.vulnerabilities = this.simulator.results.vulnerabilities;

            // 4. Save results
            console.log('💾 Saving results...');
            await this.saveResults();

            // 5. Generate report
            console.log('📋 Generating report...');
            await this.generateReport();

            this.results.success = true;

        } catch (error) {
            console.error('❌ Attack simulation failed:', error.message);
            this.results.errors.push({
                message: error.message,
                stack: error.stack,
                timestamp: new Date().toISOString()
            });
        } finally {
            // 6. Cleanup
            console.log('🧹 Cleaning up...');
            await this.cleanup();
            
            this.results.endTime = new Date();
            this.results.duration = this.results.endTime - this.results.startTime;

            // 7. Final summary
            this.printSummary();
        }
    }

    async saveResults() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const resultsDir = './attack_results';
        
        // Create results directory if it doesn't exist
        if (!fs.existsSync(resultsDir)) {
            fs.mkdirSync(resultsDir, { recursive: true });
        }

        // Save detailed results
        const resultsFile = path.join(resultsDir, `attack_simulation_${timestamp}.json`);
        fs.writeFileSync(resultsFile, JSON.stringify(this.results, null, 2));
        console.log(`💾 Detailed results saved to: ${resultsFile}`);

        // Save captured data separately
        if (this.results.capturedData.length > 0) {
            const dataFile = path.join(resultsDir, `captured_data_${timestamp}.json`);
            fs.writeFileSync(dataFile, JSON.stringify(this.results.capturedData, null, 2));
            console.log(`📊 Captured data saved to: ${dataFile}`);
        }

        // Save vulnerabilities separately
        if (this.results.vulnerabilities.length > 0) {
            const vulnFile = path.join(resultsDir, `vulnerabilities_${timestamp}.json`);
            fs.writeFileSync(vulnFile, JSON.stringify(this.results.vulnerabilities, null, 2));
            console.log(`🚨 Vulnerabilities saved to: ${vulnFile}`);
        }
    }

    async generateReport() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const reportFile = `./attack_results/attack_report_${timestamp}.md`;
        
        const report = this.generateMarkdownReport();
        fs.writeFileSync(reportFile, report);
        console.log(`📋 Report saved to: ${reportFile}`);
    }

    generateMarkdownReport() {
        const duration = this.results.duration ? `${Math.round(this.results.duration / 1000)}s` : 'N/A';
        const success = this.results.success ? '✅ SUCCESS' : '❌ FAILED';
        
        let report = `# Headless Browser Attack Simulation Report

## Executive Summary
- **Status**: ${success}
- **Start Time**: ${this.results.startTime?.toISOString()}
- **End Time**: ${this.results.endTime?.toISOString()}
- **Duration**: ${duration}
- **Data Points Captured**: ${this.results.capturedData.length}
- **Vulnerabilities Found**: ${this.results.vulnerabilities.length}

## Data Types Captured
`;

        // Group data by type
        const dataTypes = {};
        this.results.capturedData.forEach(data => {
            const type = data.type;
            if (!dataTypes[type]) dataTypes[type] = 0;
            dataTypes[type]++;
        });

        Object.entries(dataTypes).forEach(([type, count]) => {
            report += `- **${type}**: ${count} entries\n`;
        });

        report += `
## Vulnerabilities Detected
`;

        this.results.vulnerabilities.forEach((vuln, index) => {
            report += `${index + 1}. **${vuln.type}** (${vuln.timestamp})
   - ${vuln.description || vuln.message || 'No description'}
`;
        });

        if (this.results.errors.length > 0) {
            report += `
## Errors Encountered
`;
            this.results.errors.forEach((error, index) => {
                report += `${index + 1}. **${error.message}** (${error.timestamp})
   - Stack: ${error.stack}
`;
            });
        }

        report += `
## Technical Details

### Browser Configuration
- **Headless Mode**: Enabled
- **Permissions Granted**: ${config.contextOptions.permissions.length} permissions
- **Stealth Measures**: ${config.stealthScripts.length} scripts injected
- **Target Domains**: ${config.targets.localServers.join(', ')}

### Data Capture Summary
`;

        // Detailed data analysis
        const dataAnalysis = this.analyzeCapturedData();
        Object.entries(dataAnalysis).forEach(([category, details]) => {
            report += `#### ${category}\n`;
            Object.entries(details).forEach(([key, value]) => {
                report += `- **${key}**: ${value}\n`;
            });
            report += '\n';
        });

        report += `
## Recommendations

### For Defense Development
1. **Monitor for stealth form submissions**
2. **Detect auto-submit scripts**
3. **Block hidden form elements**
4. **Monitor for unusual permission requests**
5. **Implement browser fingerprinting detection**

### For Attack Prevention
1. **Use Content Security Policy (CSP)**
2. **Implement form submission monitoring**
3. **Detect and block headless browsers**
4. **Monitor for unusual network patterns**
5. **Implement rate limiting on form submissions**

---
*Report generated on ${new Date().toISOString()}*
*For internal security research purposes only*
`;

        return report;
    }

    analyzeCapturedData() {
        const analysis = {
            'Browser Information': {},
            'System Information': {},
            'Network Activity': {},
            'Storage Data': {},
            'Device Fingerprinting': {}
        };

        this.results.capturedData.forEach(data => {
            if (data.type === 'browser_data' && data.data) {
                const browser = data.data;
                analysis['Browser Information']['User Agent'] = browser.userAgent?.substring(0, 50) + '...';
                analysis['Browser Information']['Platform'] = browser.platform;
                analysis['Browser Information']['Language'] = browser.language;
                analysis['Browser Information']['Screen Resolution'] = `${browser.screen?.width}x${browser.screen?.height}`;
            }

            if (data.type === 'system_info' && data.data) {
                const system = data.data;
                if (system.battery) {
                    analysis['System Information']['Battery Level'] = `${Math.round(system.battery.level * 100)}%`;
                    analysis['System Information']['Charging'] = system.battery.charging ? 'Yes' : 'No';
                }
                if (system.connection) {
                    analysis['System Information']['Connection Type'] = system.connection.effectiveType;
                    analysis['System Information']['Download Speed'] = `${system.connection.downlink} Mbps`;
                }
            }

            if (data.type === 'network_request') {
                analysis['Network Activity']['Total Requests'] = (analysis['Network Activity']['Total Requests'] || 0) + 1;
            }

            if (data.type === 'storage_data' && data.data) {
                const storage = data.data;
                analysis['Storage Data']['Local Storage Keys'] = Object.keys(storage.localStorage || {}).length;
                analysis['Storage Data']['Session Storage Keys'] = Object.keys(storage.sessionStorage || {}).length;
                analysis['Storage Data']['Cookies Present'] = storage.cookies ? 'Yes' : 'No';
            }

            if (data.type === 'device_info' && data.data) {
                const device = data.data;
                analysis['Device Fingerprinting']['Device Pixel Ratio'] = device.devicePixelRatio;
                analysis['Device Fingerprinting']['Color Gamut'] = device.colorGamut;
                analysis['Device Fingerprinting']['WebGL Available'] = device.webGL ? 'Yes' : 'No';
            }
        });

        return analysis;
    }

    async cleanup() {
        if (this.simulator) {
            await this.simulator.cleanup();
        }

        // Delete temporary files if configured
        if (config.safety.deleteAfterTest) {
            console.log('🗑️  Cleaning up temporary files...');
            // Add cleanup logic here if needed
        }
    }

    printSummary() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 ATTACK SIMULATION SUMMARY');
        console.log('='.repeat(60));
        console.log(`Status: ${this.results.success ? '✅ SUCCESS' : '❌ FAILED'}`);
        console.log(`Duration: ${this.results.duration ? Math.round(this.results.duration / 1000) + 's' : 'N/A'}`);
        console.log(`Data Points Captured: ${this.results.capturedData.length}`);
        console.log(`Vulnerabilities Found: ${this.results.vulnerabilities.length}`);
        console.log(`Errors: ${this.results.errors.length}`);
        
        if (this.results.capturedData.length > 0) {
            console.log('\n📈 Data Types Captured:');
            const dataTypes = {};
            this.results.capturedData.forEach(data => {
                const type = data.type;
                dataTypes[type] = (dataTypes[type] || 0) + 1;
            });
            Object.entries(dataTypes).forEach(([type, count]) => {
                console.log(`  - ${type}: ${count}`);
            });
        }

        if (this.results.vulnerabilities.length > 0) {
            console.log('\n🚨 Vulnerabilities Detected:');
            this.results.vulnerabilities.forEach((vuln, index) => {
                console.log(`  ${index + 1}. ${vuln.type}`);
            });
        }

        console.log('\n💾 Results saved to ./attack_results/');
        console.log('📋 Report generated with detailed analysis');
        console.log('='.repeat(60));
    }
}

// Run the simulation if this script is executed directly
if (require.main === module) {
    const runner = new AttackSimulationRunner();
    runner.run().catch(console.error);
}

module.exports = AttackSimulationRunner; 