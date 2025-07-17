# Vehicle Management System

A React + TypeScript app for managing vehicle models and makes. Built for a job interview test project.

## Features

- Full CRUD operations for vehicle models
- Search and filter by make or model name
- Sorting and pagination
- Form validation
- Responsive design
- Real-time notifications

## Tech Stack

- React 18 + TypeScript
- Redux Toolkit + RTK Query
- React Hook Form
- Supabase (PostgreSQL)
- React Router

## Setup

```bash
npm install
npm start
```

For full functionality, add your Supabase credentials to `.env.local`:
```
REACT_APP_SUPABASE_URL=your-url
REACT_APP_SUPABASE_ANON_KEY=your-key
```

## Scripts

- `npm start` - Development server
- `npm test` - Run tests
- `npm run build` - Production build