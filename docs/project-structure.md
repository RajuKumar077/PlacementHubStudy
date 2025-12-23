# PlacementHubStudy - Project Structure

## Directory Overview

This document outlines the project structure and organization of the PlacementHubStudy platform.

```
PlacementHubStudy/
├── README.md                 # Main project documentation
├── LICENSE                   # MIT License
├── .gitignore               # Git ignore rules
│
├── docs/                    # Documentation files
│   ├── project-structure.md # This file - project structure
│   ├── tech-stack.md        # Technology stack details
│   └── setup-guide.md       # Setup and installation guide
│
├── frontend/                # React/Next.js frontend application
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── styles/          # CSS modules and global styles
│   │   ├── utils/           # Utility functions
│   │   ├── hooks/           # Custom React hooks
│   │   └── App.js           # Main App component
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   ├── next.config.js       # Next.js configuration
│   └── vercel.json          # Vercel deployment config
│
├── backend/                 # Node.js/Express backend API
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Utility functions
│   ├── config/              # Configuration files
│   ├── server.js            # Main server file
│   ├── package.json         # Backend dependencies
│   └── requirements.txt      # Alternative: Python dependencies
│
├── projects/                # Real-world project examples
│   ├── project-1/           # First hands-on project
│   │   ├── README.md        # Project description
│   │   ├── problem-statement.md
│   │   ├── starter-code/    # Initial code template
│   │   └── solution/        # Complete solution
│   ├── project-2/           # Second hands-on project
│   │   ├── README.md
│   │   ├── problem-statement.md
│   │   ├── starter-code/
│   │   └── solution/
│   └── README.md            # Projects overview
│
└── .env.example             # Environment variables template
```

## Key Directories Explained

### Frontend (`/frontend`)
- Modern React/Next.js application
- Deployed on Vercel for fast performance
- Components for learning paths, projects, and user dashboard
- Responsive design for all devices

### Backend (`/backend`)
- REST API built with Node.js/Express
- Database models for users, projects, and learning paths
- Authentication and authorization
- API endpoints for CRUD operations

### Projects (`/projects`)
- Hands-on industry-simulated projects
- Each project includes:
  - Clear problem statement
  - Starter code template
  - Complete solution reference
  - Resume-building points

### Documentation (`/docs`)
- Complete setup and deployment guides
- Technology stack information
- Architecture and design decisions

## File Naming Conventions

- **Components**: PascalCase (e.g., `UserDashboard.js`)
- **Utilities**: camelCase (e.g., `formatDate.js`)
- **CSS Modules**: .module.css (e.g., `Button.module.css`)
- **Markdown files**: lowercase with hyphens (e.g., `project-structure.md`)

## Development Workflow

1. Create feature branches from main
2. Commit changes with meaningful messages
3. Create pull requests for review
4. Deploy to staging via Vercel
5. Merge to main after approval
6. Auto-deploy to production
