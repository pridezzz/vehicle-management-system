You are a senior frontend engineer helping me build a job test project for a React developer role at a company.

Build a minimalistic web application using React and TypeScript. The application must support full CRUD functionality and interact with a REST API (using Supabase, Firebase, or a custom backend).

The project domain is a Vehicle Management System with the following data models:
- VehicleMake: { id: number, name: string, abrv: string }
- VehicleModel: { id: number, makeId: number, name: string, abrv: string }
VehicleModels are linked to VehicleMakes via the makeId field.

Requirements:
- Display a list/grid of VehicleModels
- Include filtering, sorting, and pagination — all handled via REST API
- Persist filter state between sessions (e.g. via localStorage)
- Include full CRUD operations: create, read, update, delete
- Use React Hook Form for create/edit forms with validation
- Use Redux Toolkit + RTK Query for state and API
- Use TypeScript throughout (no use of `any`)
- Use React Router for navigation
- Follow Airbnb React naming conventions
- Use this folder structure:
  /components, /pages, /store, /api, /utils
- Use Git with meaningful, structured commits per feature or module
- Ensure the app is buildable, clean, and production-ready

Additional requirement:
Include at least 2 small enhancements to increase the chance of being hired, such as:
- Search bar with debounce
- Optimistic UI updates
- Toast notifications
- Confirmation modals
- Dark mode toggle