# 🚀 **GitHub Setup & Deployment Guide**

## **Overview**

This guide will help you set up GitHub repository, configure automated deployment, and implement pagination for the advanced attack system.

## **📋 Prerequisites**

- GitHub account
- Node.js 18+ installed
- Git installed
- Vercel account (for deployment)
- Snyk account (optional, for security scanning)

## **🔧 Step 1: Initialize GitHub Repository**

### **Automated Setup**
```bash
# Run the GitHub setup script
node github_setup.js
```

### **Manual Setup**
```bash
# Initialize git repository
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Advanced attack system with device-based organization"

# Create repository on GitHub (via web interface)
# Then add remote origin
git remote add origin https://github.com/username/repo-name.git

# Push to GitHub
git push -u origin main
```

## **🔐 Step 2: Configure GitHub Secrets**

### **Required Secrets**

1. **Go to your GitHub repository**
2. **Navigate to Settings > Secrets and variables > Actions**
3. **Add the following secrets:**

#### **VERCEL_TOKEN**
- **Source**: https://vercel.com/account/tokens
- **Steps**:
  1. Go to Vercel dashboard
  2. Click Account Settings
  3. Go to Tokens tab
  4. Create new token with full access
  5. Copy the token

#### **VERCEL_ORG_ID**
- **Source**: Vercel CLI or dashboard
- **Steps**:
  ```bash
  # Install Vercel CLI
  npm i -g vercel
  
  # Login to Vercel
  vercel login
  
  # Get organization ID
  vercel whoami
  ```

#### **VERCEL_PROJECT_ID**
- **Source**: Vercel project settings
- **Steps**:
  ```bash
  # List projects
  vercel project ls
  
  # Or get from project settings in Vercel dashboard
  ```

#### **SNYK_TOKEN (Optional)**
- **Source**: https://app.snyk.io/account/api-tokens
- **Purpose**: Security vulnerability scanning
- **Steps**:
  1. Create Snyk account
  2. Go to Account Settings
  3. Generate API token

## **🚀 Step 3: Deploy to Vercel**

### **Automatic Deployment (Recommended)**
```bash
# Push to main branch to trigger automatic deployment
git push origin main
```

### **Manual Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables
vercel env add VERCEL_TOKEN
vercel env add MONGODB_URI
```

## **📊 Step 4: Pagination System**

### **Features Implemented**

✅ **Page-based navigation**  
✅ **Advanced filtering**  
✅ **Search functionality**  
✅ **Sorting options**  
✅ **Date range filtering**  
✅ **Real-time updates**  
✅ **Responsive design**  

### **API Endpoints with Pagination**

#### **Device List with Pagination**
```http
GET /api/devices?page=1&limit=20&sort=-timestamp
```

#### **Device Data with Pagination**
```http
GET /api/device/abc/data?page=1&limit=50&type=attacks
GET /api/device/abc/attacks?search=phishing&status=success
```

#### **Search Devices**
```http
GET /api/devices/search?q=abc&type=active&status=success
```

### **Pagination Parameters**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | number | Page number (1-based) | `?page=1` |
| `limit` | number | Items per page (max 100) | `?limit=20` |
| `sort` | string | Sort field and direction | `?sort=-timestamp,name` |
| `search` | string | Search term | `?search=phishing` |
| `type` | string | Filter by data type | `?type=attacks` |
| `status` | string | Filter by status | `?status=success` |
| `startDate` | string | Start date filter | `?startDate=2024-01-01` |
| `endDate` | string | End date filter | `?endDate=2024-01-31` |

### **Response Format**
```json
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
```

## **🎯 Step 5: Using the Paginated Dashboard**

### **Access Dashboard**
```
http://localhost:3000/paginated_dashboard.html
```

### **Features**

#### **Advanced Filtering**
- **Data Type**: Filter by sessions, attacks, permissions, etc.
- **Device ID**: Filter by specific device
- **Status**: Filter by success/failed/pending
- **Date Range**: Filter by time period
- **Search**: Full-text search across data

#### **Sorting Options**
- **Newest First**: `-timestamp`
- **Oldest First**: `timestamp`
- **Type**: `type`
- **Device ID**: `deviceId`
- **Status**: `status`

#### **Pagination Controls**
- **Page Size**: 10, 20, 50, 100 items per page
- **Navigation**: First, Previous, Next, Last
- **Page Numbers**: Direct page navigation
- **Info Display**: Current page and total items

## **🔧 Step 6: GitHub Actions Workflows**

### **Deploy Workflow**
- **Trigger**: Push to main/master branch
- **Actions**:
  1. Checkout code
  2. Setup Node.js
  3. Install dependencies
  4. Run tests
  5. Deploy to Vercel

### **Security Scan Workflow**
- **Trigger**: Push, PR, or daily schedule
- **Actions**:
  1. Checkout code
  2. Setup Node.js
  3. Install dependencies
  4. Run npm audit
  5. Run Snyk security scan

## **📱 Step 7: Device-Based Organization**

### **Database Structure**
```
Device Collection:
┌─────────────┬─────────────┐
│ _id         │ device      │
├─────────────┼─────────────┤
│ 12213       │ abc         │
│ 2345        │ xyz         │
│ 6543        │ wsd         │
└─────────────┴─────────────┘
```

### **File Structure**
```
data/devices/
├── abc/          # Device ABC
│   ├── device_info.json
│   ├── data/     # General data
│   ├── sessions/ # Session logs
│   ├── attacks/  # Attack attempts
│   ├── permissions/ # Permission logs
│   ├── fingerprints/ # Browser fingerprints
│   ├── behavioral/ # Behavioral patterns
│   ├── network/  # Network attacks
│   ├── storage/  # Storage data
│   ├── ml/       # ML analysis
│   └── evasion/  # Evasion techniques
├── xyz/          # Device XYZ
└── wsd/          # Device WSD
```

## **🔍 Step 8: Testing the System**

### **Test Pagination**
```bash
# Test device list pagination
curl "http://localhost:3000/api/devices?page=1&limit=10"

# Test device data pagination
curl "http://localhost:3000/api/device/abc/data?page=1&limit=20"

# Test search functionality
curl "http://localhost:3000/api/devices/search?q=abc"
```

### **Test Dashboard**
1. **Open**: `http://localhost:3000/paginated_dashboard.html`
2. **Try filtering**: Select different data types
3. **Test search**: Enter search terms
4. **Test pagination**: Navigate through pages
5. **Test sorting**: Change sort order

## **🚨 Step 9: Security Considerations**

### **GitHub Security**
- **Enable 2FA** on GitHub account
- **Use SSH keys** for authentication
- **Review access** to repository
- **Enable branch protection** rules

### **Vercel Security**
- **Use environment variables** for secrets
- **Enable preview deployments** for PRs
- **Set up custom domains** with SSL
- **Monitor deployment logs**

### **Application Security**
- **Validate all inputs** in pagination
- **Implement rate limiting** on API endpoints
- **Use HTTPS** in production
- **Regular security updates**

## **📈 Step 10: Monitoring & Analytics**

### **GitHub Insights**
- **Traffic**: Repository views and clones
- **Contributors**: Team activity
- **Commits**: Development activity
- **Issues**: Bug reports and feature requests

### **Vercel Analytics**
- **Performance**: Page load times
- **Traffic**: Request volume
- **Errors**: Error rates and types
- **Functions**: Serverless function metrics

### **Application Monitoring**
- **Device activity**: Real-time device tracking
- **Attack success rates**: Effectiveness metrics
- **Data collection**: Volume and types
- **System performance**: Response times

## **🔧 Troubleshooting**

### **Common Issues**

#### **GitHub Actions Fail**
```bash
# Check workflow logs
# Verify secrets are set correctly
# Ensure Node.js version compatibility
```

#### **Vercel Deployment Fails**
```bash
# Check build logs
# Verify environment variables
# Test locally first
```

#### **Pagination Not Working**
```bash
# Check API endpoints
# Verify query parameters
# Test with curl commands
```

### **Debug Commands**
```bash
# Test API endpoints
curl -X GET "http://localhost:3000/api/health"

# Check pagination
curl -X GET "http://localhost:3000/api/devices?page=1&limit=5"

# Test device data
curl -X GET "http://localhost:3000/api/device/abc/stats"
```

## **📚 Additional Resources**

### **Documentation**
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Node.js Documentation](https://nodejs.org/docs)

### **Tools**
- [GitHub CLI](https://cli.github.com/)
- [Vercel CLI](https://vercel.com/cli)
- [Snyk CLI](https://snyk.io/docs/cli/)

### **Best Practices**
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**🎉 Congratulations! Your advanced attack system is now set up with GitHub integration and pagination!**

**Next Steps:**
1. **Monitor deployments** in GitHub Actions
2. **Test pagination** in the dashboard
3. **Configure alerts** for security issues
4. **Set up monitoring** for production
5. **Document customizations** for your team 