#!/usr/bin/env node

/**
 * VERCEL DEPLOYMENT SCRIPT
 * Automated deployment with MongoDB configuration
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class VercelDeployer {
    constructor() {
        this.projectName = 'advanced-attack-system';
        this.mongoUri = 'mongodb+srv://dbuser:Bil%40l112@cluster0.ey6gj6g.mongodb.net/attack-system';
    }
    
    async deploy() {
        console.log('🚀 Starting Vercel deployment...\n');
        
        try {
            // Check if Vercel CLI is installed
            this.checkVercelCLI();
            
            // Test MongoDB connection
            await this.testMongoDBConnection();
            
            // Deploy to Vercel
            await this.deployToVercel();
            
            // Set environment variables
            await this.setEnvironmentVariables();
            
            // Test deployment
            await this.testDeployment();
            
            console.log('\n🎉 Deployment completed successfully!');
            console.log('\n📋 Next steps:');
            console.log('1. Test your API endpoints');
            console.log('2. Access the dashboard');
            console.log('3. Monitor logs in Vercel dashboard');
            
        } catch (error) {
            console.error('❌ Deployment failed:', error.message);
            process.exit(1);
        }
    }
    
    checkVercelCLI() {
        try {
            execSync('vercel --version', { stdio: 'pipe' });
            console.log('✅ Vercel CLI is installed');
        } catch (error) {
            console.log('📦 Installing Vercel CLI...');
            execSync('npm install -g vercel', { stdio: 'inherit' });
        }
    }
    
    async testMongoDBConnection() {
        console.log('🔍 Testing MongoDB connection...');
        
        try {
            const mongoose = require('mongoose');
            await mongoose.connect(this.mongoUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('✅ MongoDB connection successful');
            await mongoose.disconnect();
        } catch (error) {
            console.error('❌ MongoDB connection failed:', error.message);
            throw new Error('MongoDB connection failed');
        }
    }
    
    async deployToVercel() {
        console.log('🚀 Deploying to Vercel...');
        
        try {
            // Check if already logged in
            try {
                execSync('vercel whoami', { stdio: 'pipe' });
                console.log('✅ Already logged in to Vercel');
            } catch (error) {
                console.log('🔐 Logging in to Vercel...');
                execSync('vercel login', { stdio: 'inherit' });
            }
            
            // Deploy
            console.log('📤 Deploying project...');
            execSync('vercel --prod --yes', { stdio: 'inherit' });
            
            console.log('✅ Deployment completed');
            
        } catch (error) {
            console.error('❌ Deployment failed:', error.message);
            throw error;
        }
    }
    
    async setEnvironmentVariables() {
        console.log('🔧 Setting environment variables...');
        
        try {
            // Set MongoDB URI
            execSync(`vercel env add MONGODB_URI production "${this.mongoUri}"`, { stdio: 'inherit' });
            
            // Set other environment variables
            const envVars = {
                'NODE_ENV': 'production',
                'JWT_SECRET': this.generateSecret(32),
                'ENCRYPTION_KEY': this.generateSecret(32)
            };
            
            for (const [key, value] of Object.entries(envVars)) {
                execSync(`vercel env add ${key} production "${value}"`, { stdio: 'inherit' });
            }
            
            console.log('✅ Environment variables set');
            
        } catch (error) {
            console.error('❌ Failed to set environment variables:', error.message);
            throw error;
        }
    }
    
    generateSecret(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    async testDeployment() {
        console.log('🧪 Testing deployment...');
        
        try {
            // Get deployment URL
            const output = execSync('vercel ls', { encoding: 'utf8' });
            const lines = output.split('\n');
            const productionLine = lines.find(line => line.includes('production'));
            
            if (productionLine) {
                const url = productionLine.split(/\s+/)[1];
                console.log(`🌐 Deployment URL: ${url}`);
                
                // Test health endpoint
                console.log('🔍 Testing health endpoint...');
                const response = await this.testEndpoint(`${url}/api/health`);
                
                if (response.status === 'healthy') {
                    console.log('✅ Health check passed');
                } else {
                    console.log('⚠️ Health check failed');
                }
                
                // Test devices endpoint
                console.log('🔍 Testing devices endpoint...');
                const devicesResponse = await this.testEndpoint(`${url}/api/devices?page=1&limit=5`);
                
                if (devicesResponse.data !== undefined) {
                    console.log('✅ Devices endpoint working');
                } else {
                    console.log('⚠️ Devices endpoint failed');
                }
                
            } else {
                console.log('⚠️ Could not find deployment URL');
            }
            
        } catch (error) {
            console.error('❌ Testing failed:', error.message);
        }
    }
    
    async testEndpoint(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            return { error: error.message };
        }
    }
    
    // Manual deployment instructions
    printManualInstructions() {
        console.log('\n📋 Manual Deployment Instructions:');
        console.log('=====================================\n');
        
        console.log('1. Go to: https://vercel.com/new?teamSlug=t6765bilsls-projects');
        console.log('2. Click "Import Git Repository"');
        console.log('3. Select your repository');
        console.log('4. Configure project:');
        console.log('   - Project Name: advanced-attack-system');
        console.log('   - Framework Preset: Node.js');
        console.log('   - Root Directory: ./');
        console.log('   - Build Command: npm run build');
        console.log('   - Output Directory: ./');
        console.log('   - Install Command: npm install');
        
        console.log('\n5. Environment Variables:');
        console.log(`   MONGODB_URI: ${this.mongoUri}`);
        console.log('   NODE_ENV: production');
        console.log('   JWT_SECRET: [generate random 32 chars]');
        console.log('   ENCRYPTION_KEY: [generate random 32 chars]');
        
        console.log('\n6. Click "Deploy"');
        console.log('\n7. Test your deployment:');
        console.log('   - Health: https://your-project.vercel.app/api/health');
        console.log('   - Devices: https://your-project.vercel.app/api/devices');
        console.log('   - Dashboard: https://your-project.vercel.app/paginated_dashboard.html');
    }
}

// Run deployment
if (require.main === module) {
    const deployer = new VercelDeployer();
    
    const args = process.argv.slice(2);
    
    if (args.includes('--manual')) {
        deployer.printManualInstructions();
    } else {
        deployer.deploy();
    }
}

module.exports = VercelDeployer; 