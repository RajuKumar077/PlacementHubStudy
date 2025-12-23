# PlacementHubStudy - Full Implementation Guide

## Project Status
Backend foundation has been created with:
- ✅ Server setup (server.js)
- ✅ Database models (User, LearningPath, Project, Progress)
- ✅ JWT authentication middleware
- ✅ Authentication routes (register, login, get current user)
- ⏳ Remaining: Additional routes (users, learning-paths, projects, progress) + Frontend

## Remaining Backend Files to Create

### 1. routes/users.js
```javascript
const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    if (req.userId.toString() !== req.params.id && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const { name, bio, skills, profileImage } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, bio, skills, profileImage, updatedAt: Date.now() },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### 2. routes/learningPaths.js
```javascript
const express = require('express');
const LearningPath = require('../models/LearningPath');
const Progress = require('../models/Progress');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const paths = await LearningPath.find().select('-modules');
    res.json(paths);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const path = await LearningPath.findById(req.params.id);
    if (!path) return res.status(404).json({ error: 'Path not found' });
    res.json(path);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    if (req.userRole !== 'admin' && req.userRole !== 'instructor') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const path = new LearningPath({ ...req.body, createdBy: req.userId });
    await path.save();
    res.status(201).json(path);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/enroll', auth, async (req, res) => {
  try {
    const path = await LearningPath.findById(req.params.id);
    if (!path) return res.status(404).json({ error: 'Path not found' });

    if (!path.enrolledStudents.includes(req.userId)) {
      path.enrolledStudents.push(req.userId);
      await path.save();

      const progress = new Progress({
        userId: req.userId,
        pathId: req.params.id,
        currentModule: 0,
        progressPercentage: 0
      });
      await progress.save();
    }
    res.json({ message: 'Enrolled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### 3. routes/projects.js
```javascript
const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    if (req.userRole !== 'admin' && req.userRole !== 'instructor') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const project = new Project({ ...req.body, createdBy: req.userId });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/submit', auth, async (req, res) => {
  try {
    const { gitLink, code, notes } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    project.submittedBy.push({
      userId: req.userId,
      gitLink,
      code,
      notes,
      submissionDate: new Date()
    });
    await project.save();
    res.json({ message: 'Project submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### 4. routes/progress.js
```javascript
const express = require('express');
const Progress = require('../models/Progress');
const LearningPath = require('../models/LearningPath');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/path/:pathId', auth, async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userId: req.userId,
      pathId: req.params.pathId
    });
    if (!progress) return res.status(404).json({ error: 'Progress not found' });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:progressId', auth, async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.progressId);
    if (!progress || progress.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { currentModule, completedModules } = req.body;
    progress.currentModule = currentModule || progress.currentModule;
    if (completedModules) {
      progress.completedModules.push(...completedModules);
    }
    progress.lastAccessed = new Date();
    
    const path = await LearningPath.findById(progress.pathId);
    if (path && path.modules.length > 0) {
      progress.progressPercentage = Math.round(
        (progress.completedModules.length / path.modules.length) * 100
      );
    }
    
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

## Quick Setup Instructions

### Backend Setup
1. Navigate to backend folder: `cd backend`
2. Install dependencies: `npm install express cors dotenv mongoose bcryptjs jsonwebtoken axios`
3. Install dev dependency: `npm install --save-dev nodemon`
4. Create `.env` file with provided configuration
5. Create folders: `mkdir models middleware routes` (if not exists)
6. Copy all model files into `models/` folder
7. Copy middleware files into `middleware/` folder  
8. Copy route files into `routes/` folder
9. Start backend: `npm run dev` (server runs on http://localhost:5000)

### Frontend Setup (Next.js)
1. Navigate to frontend folder: `cd frontend`
2. Create Next.js project: `npx create-next-app@latest . --typescript`
3. Install dependencies: `npm install axios zustand tailwindcss`

## API Endpoints Summary

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires auth)
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile (requires auth)
- `GET /api/learning-paths` - Get all learning paths
- `GET /api/learning-paths/:id` - Get single learning path
- `POST /api/learning-paths` - Create learning path (admin/instructor)
- `POST /api/learning-paths/:id/enroll` - Enroll in path (requires auth)
- `GET /api/projects` - Get all projects
- `POST /api/projects/:id/submit` - Submit project (requires auth)
- `GET /api/progress/path/:pathId` - Get progress for path (requires auth)
- `PUT /api/progress/:progressId` - Update progress (requires auth)

## Next Steps
1. Create all remaining route files using provided code
2. Test backend with Postman
3. Build frontend with Next.js
4. Connect frontend to backend APIs
5. Deploy to production (Vercel/Heroku)

## Tech Stack
- Backend: Node.js, Express, MongoDB, JWT
- Frontend: Next.js, React, Tailwind CSS (to be implemented)
- Database: MongoDB (local or Atlas)
- Authentication: JWT tokens
