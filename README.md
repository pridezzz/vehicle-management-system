# 🚗 Vehicle Management System

A modern React + TypeScript application for managing vehicle models and makes.

## ✨ Features

- **Complete CRUD Operations** - Create, read, update, and delete vehicle models
- **Advanced Search & Filtering** - Search by model/make name, filter by specific makes
- **Multi-field Sorting** - Sort by name, abbreviation, make, or ID
- **Pagination** - Customizable page sizes (5, 10, 20, 50 items)
- **Form Validation** - Real-time validation with React Hook Form
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Type Safety** - 100% TypeScript with strict typing
- **Modern Architecture** - Redux Toolkit + RTK Query for state management

## 🛠️ Tech Stack

- **React 18** - Latest React with hooks and concurrent features
- **TypeScript** - Full type safety throughout the application
- **Redux Toolkit** - Modern Redux with RTK Query for API calls
- **React Router v6** - Client-side routing
- **React Hook Form** - Performant form handling with validation
- **CSS-in-JS** - Inline styles for component-scoped styling

## 🚀 Quick Start

### Development
```bash
npm install
npm start
```
Open [http://localhost:3000](http://localhost:3000)

### Testing
```bash
npm test
```

### Production Build
```bash
npm run build
```

## 📊 Sample Data

The app comes pre-loaded with:

### Vehicle Makes:
- BMW
- Mercedes-Benz  
- Audi
- Toyota
- Honda

### Vehicle Models:
- BMW: 325i, X5, M3
- Mercedes-Benz: C-Class, E-Class, S-Class
- Audi: A4, Q7
- Toyota: Camry, Prius
- Honda: Civic, Accord

## 🎯 Usage

### Vehicle List Page
- **Search**: Type in the search box to find models or makes
- **Filter**: Use the dropdown to filter by specific vehicle makes
- **Sort**: Choose sorting field and direction (ascending/descending)
- **Paginate**: Navigate through results with customizable page sizes

### Create New Model
- Click "Add New Model" button
- Fill in required fields:
  - Model Name (2-50 characters)
  - Abbreviation (1-10 characters)
  - Select a Make
- Form validation provides real-time feedback

### Edit Existing Model
- Click "Edit" on any vehicle model card
- Form pre-populates with existing data
- Same validation rules apply
- Changes are saved immediately

### Delete Model
- Click "Delete" on any vehicle model card
- Confirmation dialog prevents accidental deletions
- Model is removed from the list instantly

## 🏗️ Architecture

### Folder Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Main page components
├── store/         # Redux slices and store configuration
├── api/           # RTK Query API definitions
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

### State Management
- **Redux Toolkit** for global state
- **RTK Query** for API calls and caching
- **Local state** with React hooks for UI state

### API Layer
- Mock API implementation with realistic delays
- Supports all CRUD operations
- Simulates pagination, sorting, and filtering
- Easily replaceable with real backend

## 🧪 Testing

The app includes comprehensive tests:
- Component unit tests
- Integration tests
- All tests pass with Jest and React Testing Library

## 📱 Responsive Design

- **Desktop**: Full feature grid layout
- **Tablet**: Responsive grid adjusts to screen size
- **Mobile**: Single column layout with touch-friendly controls

## 🔧 Performance

- **Bundle Size**: 91.89 kB (gzipped)
- **Load Time**: Optimized for fast initial load
- **Runtime**: Smooth interactions with proper state management
- **Memory**: Efficient with proper component lifecycle management

## 🚀 Deployment

The app is ready for deployment to any static hosting service:

### Netlify (Recommended)
1. Build: `npm run build`
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag the `build` folder
4. Done!

### Other Options
- Vercel: `vercel --prod`
- Surge.sh: `surge` (from build directory)
- GitHub Pages: `npm run deploy`
- Firebase: `firebase deploy`

## 📝 Configuration Files

All deployment configurations are included:
- `netlify.toml` - Netlify configuration
- `vercel.json` - Vercel configuration  
- `firebase.json` - Firebase hosting configuration
- `_redirects` - SPA routing for static hosts

## 🎯 Future Enhancements

Potential improvements for a real-world application:
- Real backend API integration
- User authentication and authorization
- Image uploads for vehicle models
- Advanced filtering (year, price, etc.)
- Export functionality (CSV, PDF)
- Bulk operations
- Vehicle model comparison
- Search history
- Favorites/bookmarks

## 🤝 Contributing

This is a demo project, but contributions are welcome:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

MIT License - feel free to use this code for your own projects!

---

**Built with ❤️ using React + TypeScript**