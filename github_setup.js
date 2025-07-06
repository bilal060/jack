#!/usr/bin/env node

/**
 * GITHUB SETUP SCRIPT
 * Automated GitHub repository setup and deployment configuration
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class GitHubSetup {
    constructor() {
        this.repoName = 'advanced-attack-system';
        this.description = 'Advanced security research platform with device-based data organization';
        this.topics = ['security', 'research', 'attack-simulation', 'device-tracking', 'pagination'];
    }
    
    // Initialize GitHub repository
    async initializeRepository() {
        console.log('🚀 Initializing GitHub repository...\n');
        
        try {
            // Check if git is initialized
            if (!fs.existsSync('.git')) {
                console.log('📁 Initializing git repository...');
                execSync('git init', { stdio: 'inherit' });
            }
            
            // Create .gitignore if it doesn't exist
            this.createGitignore();
            
            // Create README.md
            this.createReadme();
            
            // Create GitHub Actions workflows
            this.createWorkflows();
            
            // Create GitHub templates
            this.createTemplates();
            
            // Create security policy
            this.createSecurityPolicy();
            
            // Create contributing guidelines
            this.createContributing();
            
            // Create license
            this.createLicense();
            
            // Add all files
            console.log('📝 Adding files to git...');
            execSync('git add .', { stdio: 'inherit' });
            
            // Initial commit
            console.log('💾 Creating initial commit...');
            execSync('git commit -m "Initial commit: Advanced attack system with device-based organization"', { stdio: 'inherit' });
            
            console.log('\n✅ GitHub repository setup complete!');
            console.log('\n📋 Next steps:');
            console.log('1. Create a new repository on GitHub');
            console.log('2. Add the remote origin: git remote add origin https://github.com/username/repo-name.git');
            console.log('3. Push to GitHub: git push -u origin main');
            console.log('4. Set up GitHub Secrets for Vercel deployment');
            
        } catch (error) {
            console.error('❌ Error setting up GitHub repository:', error);
        }
    }
    
    // Create .gitignore file
    createGitignore() {
        const gitignore = `
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/
.next/
out/

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Data directories
data/devices/
videos/
logs/
backup/

# Database files
*.db
*.sqlite
*.sqlite3

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# Vercel
.vercel

# Local development
.local
        `.trim();
        
        fs.writeFileSync('.gitignore', gitignore);
        console.log('📄 Created .gitignore');
    }
    
    // Create README.md
    createReadme() {
        const readme = `# 🚀 Advanced Attack System

## 📱 Device-Based Security Research Platform

A comprehensive security research platform featuring device-based data organization, advanced attack simulation, and real-time monitoring capabilities.

## ✨ Features

- **📱 Device-Based Organization**: All data organized by device ID
- **🔍 Advanced Data Capture**: Browser fingerprinting, behavioral analysis
- **⚔️ Attack Simulation**: Social engineering, network attacks, persistence
- **📊 Real-time Monitoring**: Live device tracking and analytics
- **📄 Pagination System**: Efficient data browsing and search
- **🎬 ASMR Video Scheduler**: Automated video management
- **🔐 Permission Handling**: Advanced permission management
- **🤖 ML Integration**: Machine learning attack modules
- **🥷 Evasion Techniques**: Anti-detection and stealth capabilities

## 🏗️ Architecture

\`\`\`
📁 Project Structure
├── 📱 Device Management
│   ├── Database schemas
│   ├── File organization
│   └── Session tracking
├── 🔍 Data Capture
│   ├── Browser fingerprinting
│   ├── Behavioral patterns
│   └── Network analysis
├── ⚔️ Attack Modules
│   ├── Social engineering
│   ├── Network attacks
│   ├── Persistence mechanisms
│   └── Evasion techniques
├── 📊 Analytics
│   ├── Real-time monitoring
│   ├── Device statistics
│   └── Attack success rates
└── 🎬 Video System
    ├── ASMR scheduler
    ├── Category management
    └── Download automation
\`\`\`

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (optional)
- Vercel account (for deployment)

### Installation
\`\`\`bash
# Clone repository
git clone https://github.com/username/advanced-attack-system.git
cd advanced-attack-system

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

# Run attack simulation
npm run attack

# Start video scheduler
npm run scheduler
\`\`\`

### Environment Variables
\`\`\`env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database (optional)
MONGODB_URI=mongodb://localhost:27017/attack-system

# Vercel Deployment
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Security
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key
\`\`\`

## 📊 API Endpoints

### Device Management
\`\`\`http
GET /api/devices                    # All devices (paginated)
GET /api/devices/search?q=abc       # Search devices
GET /api/device/:deviceId/stats     # Device statistics
GET /api/device/:deviceId/data      # Device data (paginated)
\`\`\`

### Data Capture
\`\`\`http
POST /api/capture                   # Capture data
POST /api/permissions/auto-granted  # Log permissions
POST /api/social-engineering/:type  # Log attacks
POST /api/network/:attack          # Log network attacks
\`\`\`

### Pagination Parameters
\`\`\`http
GET /api/devices?page=1&limit=20&sort=-timestamp
GET /api/device/abc/data?page=2&limit=50&type=attacks
GET /api/device/abc/attacks?search=phishing&status=success
\`\`\`

## 🎯 Usage Examples

### View Device Dashboard
\`\`\`bash
# Web interface
open http://localhost:3000/device_dashboard.html

# Command line
node device_data_viewer.js
\`\`\`

### Monitor Device Activity
\`\`\`javascript
// Get device statistics
const response = await fetch('/api/device/abc/stats');
const stats = await response.json();

// Get paginated attack data
const attacks = await fetch('/api/device/abc/attacks?page=1&limit=20');
const data = await attacks.json();
\`\`\`

### Run Attack Simulation
\`\`\`bash
# Full attack simulation
npm run attack

# Specific modules
node social_engineering_attack.js
node network_attack_module.js
node ml_attack_module.js
\`\`\`

## 📈 Pagination System

The system includes advanced pagination with:

- **Page-based navigation**: \`?page=1&limit=20\`
- **Sorting**: \`?sort=-timestamp,name\`
- **Filtering**: \`?type=attacks&status=success\`
- **Search**: \`?search=phishing\`
- **Date ranges**: \`?startDate=2024-01-01&endDate=2024-01-31\`

### Pagination Response Format
\`\`\`json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false,
    "nextPage": 2,
    "prevPage": null
  },
  "links": {
    "first": "/api/devices?page=1&limit=20",
    "last": "/api/devices?page=8&limit=20",
    "next": "/api/devices?page=2&limit=20",
    "prev": null
  }
}
\`\`\`

## 🔧 Development

### Scripts
\`\`\`bash
npm start          # Start production server
npm run dev        # Start development server
npm run attack     # Run attack simulation
npm run scheduler  # Start video scheduler
npm test           # Run tests
npm run lint       # Lint code
npm run build      # Build for production
\`\`\`

### Project Structure
\`\`\`
📁 Core Files
├── vercel_server.js              # Main server
├── device_database_schema.js     # Database schemas
├── device_file_manager.js        # File organization
├── pagination_system.js          # Pagination logic
└── device_data_viewer.js         # CLI viewer

📁 Attack Modules
├── social_engineering_attack.js  # Social engineering
├── network_attack_module.js      # Network attacks
├── ml_attack_module.js           # ML analysis
├── persistence_mechanisms.js     # Persistence
└── advanced_evasion.js           # Evasion techniques

📁 Data Organization
├── data/devices/                 # Device data
├── videos/devices/               # Video files
├── logs/devices/                 # Log files
└── backup/devices/               # Backups

📁 Web Interface
├── public/device_dashboard.html  # Device dashboard
├── public/index.html             # Main page
└── public/login.html             # Login page
\`\`\`

## 🚀 Deployment

### Vercel Deployment
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables
vercel env add VERCEL_TOKEN
vercel env add MONGODB_URI
\`\`\`

### GitHub Actions
The repository includes automated deployment workflows:
- **Deploy**: Automatic deployment to Vercel
- **Security Scan**: Daily security vulnerability scanning
- **Testing**: Automated testing on pull requests

## 🔒 Security

### Features
- **Data Encryption**: All sensitive data encrypted
- **Access Controls**: Device-specific permissions
- **Audit Logging**: Complete activity tracking
- **Rate Limiting**: API protection
- **Input Validation**: Comprehensive validation

### Best Practices
- Use HTTPS in production
- Implement proper authentication
- Regular security updates
- Monitor for suspicious activity
- Backup data regularly

## 📊 Monitoring

### Real-time Metrics
- Device activity tracking
- Attack success rates
- Data collection statistics
- Performance metrics
- Error monitoring

### Alerts
- Unusual device activity
- Failed attack attempts
- System performance issues
- Security violations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This software is for **security research and educational purposes only**. Users are responsible for ensuring compliance with applicable laws and regulations. The authors are not liable for any misuse of this software.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/username/advanced-attack-system/issues)
- **Documentation**: [Wiki](https://github.com/username/advanced-attack-system/wiki)
- **Discussions**: [GitHub Discussions](https://github.com/username/advanced-attack-system/discussions)

---

**Built with ❤️ for security research and education**
        `.trim();
        
        fs.writeFileSync('README.md', readme);
        console.log('📄 Created README.md');
    }
    
    // Create GitHub Actions workflows
    createWorkflows() {
        const workflowsDir = '.github/workflows';
        
        if (!fs.existsSync(workflowsDir)) {
            fs.mkdirSync(workflowsDir, { recursive: true });
        }
        
        // Deploy workflow
        const deployWorkflow = `
name: Deploy to Vercel

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: \${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
        `.trim();
        
        fs.writeFileSync(path.join(workflowsDir, 'deploy.yml'), deployWorkflow);
        console.log('📄 Created GitHub Actions deploy workflow');
        
        // Security scan workflow
        const securityWorkflow = `
name: Security Scan

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM

jobs:
  security-scan:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run npm audit
      run: npm audit --audit-level=moderate
      
    - name: Run Snyk security scan
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
      with:
        args: --severity-threshold=high
        `.trim();
        
        fs.writeFileSync(path.join(workflowsDir, 'security-scan.yml'), securityWorkflow);
        console.log('📄 Created GitHub Actions security workflow');
    }
    
    // Create GitHub templates
    createTemplates() {
        const templatesDir = '.github';
        
        if (!fs.existsSync(templatesDir)) {
            fs.mkdirSync(templatesDir, { recursive: true });
        }
        
        // Issue template
        const issueTemplate = `
---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: ['bug']
assignees: ''

---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. macOS, Windows, Linux]
 - Node.js version: [e.g. 18.0.0]
 - Browser: [e.g. Chrome, Firefox, Safari]

**Additional context**
Add any other context about the problem here.
        `.trim();
        
        fs.writeFileSync(path.join(templatesDir, 'ISSUE_TEMPLATE.md'), issueTemplate);
        console.log('📄 Created issue template');
        
        // Pull request template
        const prTemplate = `
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Checklist
- [ ] I have read the [CONTRIBUTING.md](CONTRIBUTING.md) file
- [ ] My code follows the project's coding standards
- [ ] I have updated the documentation accordingly
- [ ] I have added tests for my changes
- [ ] All tests pass
        `.trim();
        
        fs.writeFileSync(path.join(templatesDir, 'pull_request_template.md'), prTemplate);
        console.log('📄 Created pull request template');
    }
    
    // Create security policy
    createSecurityPolicy() {
        const securityPolicy = `
# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

1. **Do not create a public issue** for the vulnerability
2. **Email us** at security@example.com with details
3. **Include** a detailed description of the vulnerability
4. **Provide** steps to reproduce the issue
5. **Suggest** a fix if possible

### What to include in your report:

- **Vulnerability type** (e.g., XSS, SQL injection, etc.)
- **Affected component** (e.g., API endpoint, web interface)
- **Severity level** (Low, Medium, High, Critical)
- **Proof of concept** (if applicable)
- **Suggested fix** (if you have one)

### Response timeline:

- **Initial response**: Within 24 hours
- **Status update**: Within 72 hours
- **Fix timeline**: Depends on severity (1-30 days)

## Security Best Practices

When using this software:

1. **Keep it updated** to the latest version
2. **Use HTTPS** in production environments
3. **Implement proper authentication**
4. **Monitor logs** for suspicious activity
5. **Regular security audits**
6. **Follow the principle of least privilege**

## Responsible Disclosure

We follow responsible disclosure practices:

- We will acknowledge receipt of your report
- We will investigate and provide updates
- We will credit you in our security advisories
- We will coordinate public disclosure

Thank you for helping keep our software secure!
        `.trim();
        
        fs.writeFileSync('SECURITY.md', securityPolicy);
        console.log('📄 Created SECURITY.md');
    }
    
    // Create contributing guidelines
    createContributing() {
        const contributing = `
# Contributing to Advanced Attack System

Thank you for your interest in contributing to our security research platform! This document provides guidelines for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct.

## How Can I Contribute?

### Reporting Bugs
- Use the [bug report template](.github/ISSUE_TEMPLATE.md)
- Include detailed steps to reproduce
- Provide environment information
- Include error messages and logs

### Suggesting Enhancements
- Use the feature request template
- Describe the use case clearly
- Explain the benefits
- Consider implementation complexity

### Pull Requests
- Fork the repository
- Create a feature branch
- Make your changes
- Add tests
- Update documentation
- Submit a pull request

## Development Setup

### Prerequisites
- Node.js 18+
- Git
- Code editor

### Local Development
\`\`\`bash
# Fork and clone
git clone https://github.com/your-username/advanced-attack-system.git
cd advanced-attack-system

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

# Run tests
npm test

# Lint code
npm run lint
\`\`\`

## Coding Standards

### JavaScript/Node.js
- Use ES6+ features
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused

### Code Style
- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Use camelCase for variables
- Use PascalCase for classes

### Git Commit Messages
- Use conventional commit format
- Keep messages concise and clear
- Reference issues when applicable

Example:
\`\`\`
feat: add pagination system for device data
fix: resolve memory leak in data capture
docs: update API documentation
\`\`\`

## Testing

### Writing Tests
- Write tests for new features
- Ensure good test coverage
- Use descriptive test names
- Test both success and failure cases

### Running Tests
\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

## Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex algorithms
- Explain business logic
- Keep comments up to date

### API Documentation
- Document all endpoints
- Include request/response examples
- Explain parameters and responses
- Update when API changes

### User Documentation
- Write clear installation instructions
- Provide usage examples
- Include troubleshooting guides
- Keep documentation current

## Review Process

### Pull Request Review
1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** on multiple environments
4. **Documentation** review
5. **Security** review for sensitive changes

### Review Criteria
- Code quality and style
- Test coverage
- Documentation updates
- Security implications
- Performance impact

## Release Process

### Versioning
We use [Semantic Versioning](https://semver.org/):
- **Major**: Breaking changes
- **Minor**: New features
- **Patch**: Bug fixes

### Release Steps
1. Update version in package.json
2. Update CHANGELOG.md
3. Create release notes
4. Tag the release
5. Deploy to production

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/username/advanced-attack-system/issues)
- **Discussions**: [GitHub Discussions](https://github.com/username/advanced-attack-system/discussions)
- **Documentation**: [Wiki](https://github.com/username/advanced-attack-system/wiki)

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation
- GitHub contributors page

Thank you for contributing to our security research platform!
        `.trim();
        
        fs.writeFileSync('CONTRIBUTING.md', contributing);
        console.log('📄 Created CONTRIBUTING.md');
    }
    
    // Create license
    createLicense() {
        const license = `
MIT License

Copyright (c) 2024 Advanced Attack System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
        `.trim();
        
        fs.writeFileSync('LICENSE', license);
        console.log('📄 Created LICENSE');
    }
    
    // Setup GitHub Secrets instructions
    printSecretsInstructions() {
        console.log('\n🔐 GitHub Secrets Setup Instructions:');
        console.log('=====================================\n');
        
        console.log('1. Go to your GitHub repository');
        console.log('2. Click Settings > Secrets and variables > Actions');
        console.log('3. Add the following secrets:\n');
        
        console.log('   VERCEL_TOKEN:');
        console.log('   - Get from: https://vercel.com/account/tokens');
        console.log('   - Create a new token with full access\n');
        
        console.log('   VERCEL_ORG_ID:');
        console.log('   - Get from: vercel whoami');
        console.log('   - Or from Vercel dashboard settings\n');
        
        console.log('   VERCEL_PROJECT_ID:');
        console.log('   - Get from: vercel project ls');
        console.log('   - Or from project settings in Vercel dashboard\n');
        
        console.log('   SNYK_TOKEN (optional):');
        console.log('   - Get from: https://app.snyk.io/account/api-tokens');
        console.log('   - For security vulnerability scanning\n');
        
        console.log('4. After adding secrets, push to main branch to trigger deployment');
    }
}

// Run the setup
if (require.main === module) {
    const setup = new GitHubSetup();
    setup.initializeRepository();
    setup.printSecretsInstructions();
}

module.exports = GitHubSetup; 