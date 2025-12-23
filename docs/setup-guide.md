# PlacementHubStudy - Setup & Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas cloud
- **VS Code** (Recommended) - [Download](https://code.visualstudio.com/)

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/RajuKumar077/PlacementHubStudy.git
cd PlacementHubStudy
```

### 2. Install Dependencies

#### Frontend Setup

```bash
cd frontend
npm install
# or
pnpm install
```

#### Backend Setup

```bash
cd backend
npm install
```

### 3. Environment Variables

#### Frontend (.env.local)

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

#### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/placementhubstudy
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/placementhubstudy?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# API
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000

# Email Configuration (Optional)
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Cloudinary (For image uploads - Optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Running the Application

### Option 1: Run Frontend and Backend Separately

#### Terminal 1 - Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
✓ Server running on http://localhost:5000
✓ Connected to MongoDB
```

#### Terminal 2 - Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Expected output:
```
> next dev
▶ localhost:3000
```

Visit http://localhost:3000 in your browser.

### Option 2: Run with Docker (Optional)

```bash
docker-compose up -d
```

## Database Setup

### Using MongoDB Locally

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

### Using MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `.env` with your MongoDB URI

## Scripts

### Frontend Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run type-check # Check TypeScript types
```

### Backend Scripts

```bash
npm run dev      # Start with nodemon
npm run build    # Build TypeScript
npm start        # Start production server
npm test         # Run tests
npm run lint     # Run ESLint
```

## Testing

### Frontend Testing

```bash
cd frontend
npm test              # Run unit tests
npm run test:e2e      # Run end-to-end tests
npm run test:coverage # Generate coverage report
```

### Backend Testing

```bash
cd backend
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## Deployment

### Deploy Frontend to Vercel

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Set environment variables in Vercel dashboard
4. Deploy:
   ```bash
   vercel deploy
   ```

### Deploy Backend to Railway/Render

#### Using Railway

1. Create account at [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add environment variables
4. Deploy automatically

#### Using Render

1. Create account at [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Configure build and start commands
5. Deploy

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### MongoDB Connection Error

- Verify MongoDB is running
- Check connection string in `.env`
- Ensure database name is correct

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Loading

- Ensure `.env` file is in correct directory
- Restart development server after changing `.env`
- For Next.js, prefix with `NEXT_PUBLIC_` for client-side vars

## Development Tips

1. **Use Git Branches**: Create feature branches for new work
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Follow Commit Conventions**: 
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve bug"
   ```

3. **Run Linters Before Commit**:
   ```bash
   npm run lint
   npm run format
   ```

4. **Debug in VS Code**: Install Debugger for Chrome extension

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Best Practices](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Getting Help

If you encounter issues:

1. Check existing GitHub issues
2. Create a detailed bug report
3. Ask in discussions
4. Reach out to maintainers

---

**Happy Coding! ❤️**
