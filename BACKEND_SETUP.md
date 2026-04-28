# Backend Deployment Fix Guide

## Problem
The contact form shows: **"Server is not responding. Make sure backend is running!"**

## Solution

### Step 1: Set up Vercel Environment Variables
1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Select your project (LogicMint_Solution)
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
GMAIL_USER=logicmint.solution@gmail.com
GMAIL_PASS=your_gmail_app_password
NODE_ENV=production
```

**Important**: For `GMAIL_PASS`, you must use an **App Password** (not your regular Gmail password):
- Go to https://myaccount.google.com/apppasswords
- Select "Mail" and "Windows Computer"
- Google will generate a 16-character password
- Copy and paste that here

### Step 2: Deploy Backend to Vercel

1. Push your code to GitHub (if not already):
```bash
git add .
git commit -m "Add backend API with email support"
git push
```

2. Vercel will automatically detect the `src/backend/vercel.json` and deploy serverless functions

3. Your API will be accessible at:
```
https://your-project-name.vercel.app/api/send-mail
```

### Step 3: Verify API is Working

Test the endpoint locally first:
```bash
cd src/backend
npm install
node server.js
```

Then test with curl:
```bash
curl -X POST http://localhost:5000/api/send-mail \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Testing the API"
  }'
```

### Step 4: Check Deployment Status

- Visit your Vercel project Functions tab
- Check that `api/send-mail` is deployed
- View real-time logs for any errors

### Step 5: CORS Configuration

The backend already has CORS configured for:
- `https://logicmint.solutions`
- `http://localhost:5173` (local testing)

If you're using a different domain, update `src/backend/server.js`:
```javascript
origin: ["https://your-domain.com", "http://localhost:5173"],
```

## Troubleshooting

**"Gmail authentication failed"**
- Verify App Password is correct (16 characters)
- Ensure 2-Factor Authentication is enabled on your Google Account
- Check that Less Secure App Access is allowed

**"CORS error"**
- Confirm domain is added to `origin` array in server.js
- Redeploy after making changes

**"404 Not Found on /api/send-mail"**
- Verify vercel.json is in `src/backend/` directory
- Check that backend is deployed in Vercel Functions
- Redeploy the project

## Testing on Live Site

1. Go to https://logicmint.solutions
2. Scroll to contact section or click "Contact Now"
3. Fill the form and submit
4. Check Vercel logs for any errors

---

Need help? Check Vercel logs: Vercel Dashboard → Deployments → Logs → Function Logs
