# Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Git

## Step 1: Firebase Setup

1. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add Project"
   - Follow the setup wizard

2. Get Firebase Admin SDK credentials:
   - In Firebase Console, go to Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file
   - Convert the JSON to a string and add it to `FIREBASE_SERVICE_ACCOUNT` in backend/.env

3. Get Firebase Web Config:
   - In Firebase Console, go to Project Settings > General
   - Scroll down to "Your apps" and click the web icon (</>)
   - Register your app and copy the configuration
   - Add these values to frontend/.env:
     ```
     REACT_APP_FIREBASE_API_KEY=
     REACT_APP_FIREBASE_AUTH_DOMAIN=
     REACT_APP_FIREBASE_PROJECT_ID=
     REACT_APP_FIREBASE_STORAGE_BUCKET=
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
     REACT_APP_FIREBASE_APP_ID=
     ```

4. Enable Email/Password authentication:
   - In Firebase Console, go to Authentication > Sign-in method
   - Enable Email/Password provider

## Step 2: MongoDB Setup

1. Local MongoDB:
   ```bash
   # Install MongoDB locally
   # OR
   # Use MongoDB Atlas (cloud)
   ```

2. Get your MongoDB URI:
   - For local: `mongodb://localhost:27017/your-database`
   - For Atlas: Get the connection string from MongoDB Atlas

3. Add to backend/.env:
   ```
   MONGODB_URI=your-mongodb-uri
   ```

## Step 3: Social Media API Setup

### Facebook
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add to backend/.env:
   ```
   FACEBOOK_CLIENT_ID=your-app-id
   FACEBOOK_CLIENT_SECRET=your-app-secret
   ```

### Instagram
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Add Instagram to your Facebook app
3. Add to backend/.env:
   ```
   INSTAGRAM_CLIENT_ID=your-app-id
   INSTAGRAM_CLIENT_SECRET=your-app-secret
   ```

### Shopify
1. Go to [Shopify Partners](https://partners.shopify.com/)
2. Create a new app
3. Add to backend/.env:
   ```
   SHOPIFY_CLIENT_ID=your-app-id
   SHOPIFY_CLIENT_SECRET=your-app-secret
   ```

## Step 4: Security Setup

1. Generate Encryption Key:
   ```bash
   # Run this in your terminal
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. Add to backend/.env:
   ```
   ENCRYPTION_KEY=your-generated-key
   ```

## Step 5: Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GLouv/modern-web-starter.git
   cd modern-web-starter
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Fill in your .env file with the values from steps 1-4
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Fill in your .env file with Firebase config
   ```

## Step 6: Running the Application

1. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Visit http://localhost:3000 in your browser

## Troubleshooting

### Common Issues:

1. Firebase Connection:
   - Ensure service account JSON is properly formatted
   - Check if Firebase config in frontend matches your project

2. MongoDB Connection:
   - Check if MongoDB is running (if local)
   - Verify connection string format
   - Check network access (if using Atlas)

3. Social Media APIs:
   - Verify OAuth redirect URIs are correctly set in provider dashboards
   - Check if API keys and secrets match
   - Ensure required scopes are enabled

### Getting Help:
- Check the [Firebase Documentation](https://firebase.google.com/docs)
- Check the [MongoDB Documentation](https://docs.mongodb.com)
- Create an issue in the repository for bugs
- Contact the maintainers for security issues

## Security Notes

1. Never commit .env files
2. Keep your encryption key secure
3. Regularly rotate API keys
4. Monitor Firebase usage
5. Set up proper MongoDB access controls