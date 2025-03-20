# Modern Web Starter

A modern web application starter template with authentication, API integration, and database setup.

## Features

- 🔐 Authentication with Firebase
- 🚀 Express.js backend
- 🎯 React frontend
- 📦 MongoDB database support
- 🔒 Protected routes
- 🌐 CORS configured
- 🔄 API integration ready

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- MongoDB (optional)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Add your Firebase service account credentials to the `.env` file

5. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Add your Firebase configuration to the `.env` file

5. Start the development server:
```bash
npm start
```

## Project Structure

```
.
├── backend/
│   ├── config/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── utils/
    └── package.json
```

## License

MIT