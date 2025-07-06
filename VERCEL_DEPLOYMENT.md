# 🚀 **Vercel Deployment with MongoDB**

## **Quick Deploy Options**

### **Option 1: Automated Deployment (Recommended)**
```bash
# Run automated deployment script
npm run deploy
```

### **Option 2: Manual Deployment**
```bash
# Get manual instructions
npm run deploy:manual
```

### **Option 3: Direct Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel --prod
```

## **🔧 Environment Variables**

Your MongoDB connection is already configured:
```
MONGODB_URI=mongodb+srv://dbuser:Bil%40l112@cluster0.ey6gj6g.mongodb.net/attack-system
```

### **Required Environment Variables**
- `MONGODB_URI` - Your MongoDB connection string
- `NODE_ENV` - Set to `production`
- `JWT_SECRET` - Random 32-character string
- `ENCRYPTION_KEY` - Random 32-character string

## **🎯 Manual Deployment Steps**

1. **Go to Vercel**: https://vercel.com/new?teamSlug=t6765bilsls-projects

2. **Import Repository**:
   - Click "Import Git Repository"
   - Select your repository
   - Choose "Node.js" framework

3. **Configure Project**:
   ```
   Project Name: advanced-attack-system
   Framework Preset: Node.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: ./
   Install Command: npm install
   ```

4. **Add Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://dbuser:Bil%40l112@cluster0.ey6gj6g.mongodb.net/attack-system
   NODE_ENV=production
   JWT_SECRET=your_random_32_character_string_here
   ENCRYPTION_KEY=your_random_32_character_string_here
   ```

5. **Deploy**: Click "Deploy"

## **🧪 Test Your Deployment**

Once deployed, test these endpoints:

```bash
# Health check
curl https://your-project.vercel.app/api/health

# Devices list
curl https://your-project.vercel.app/api/devices?page=1&limit=5

# Paginated dashboard
open https://your-project.vercel.app/paginated_dashboard.html
```

## **📊 Expected Response**

### **Health Check**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 123.456,
  "memory": {...},
  "version": "1.0.0",
  "deviceId": "unknown",
  "mongodb": "connected"
}
```

### **Devices List**
```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 0,
    "totalPages": 0,
    "hasNext": false,
    "hasPrev": false
  },
  "links": {...},
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## **🔍 Troubleshooting**

### **MongoDB Connection Issues**
```bash
# Test MongoDB connection locally
node -e "
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbuser:Bil%40l112@cluster0.ey6gj6g.mongodb.net/attack-system')
  .then(() => console.log('✅ Connected'))
  .catch(err => console.error('❌ Error:', err.message));
"
```

### **Vercel Deployment Issues**
```bash
# Check Vercel logs
vercel logs

# Redeploy
vercel --prod --force
```

### **Environment Variables**
```bash
# List environment variables
vercel env ls

# Add missing variables
vercel env add MONGODB_URI production "mongodb+srv://dbuser:Bil%40l112@cluster0.ey6gj6g.mongodb.net/attack-system"
```

## **🎉 Success Indicators**

✅ **Health endpoint returns status "healthy"**  
✅ **MongoDB shows "connected"**  
✅ **Devices endpoint returns paginated data**  
✅ **Dashboard loads without errors**  
✅ **No errors in Vercel function logs**  

## **📈 Post-Deployment**

1. **Monitor Logs**: Check Vercel function logs
2. **Test Features**: Use the paginated dashboard
3. **Set Up Monitoring**: Configure alerts
4. **Custom Domain**: Add your domain (optional)
5. **SSL**: Automatically configured by Vercel

---

**🚀 Your advanced attack system is now live on Vercel with MongoDB!** 