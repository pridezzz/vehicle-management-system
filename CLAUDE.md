You are a senior frontend engineer helping me build a job test project for Mono Software.

Goal:
Create a simple React + TypeScript application that lets users view, create, edit, and delete vehicles.

Each vehicle consists of:
- VehicleMake: id, name, abrv (e.g., BMW)
- VehicleModel: id, makeId, name, abrv (e.g., 325, X5, linked to BMW)

The project must:
- Display a list/grid of VehicleModels (with their Make shown)
- Support filtering, sorting, and pagination (simulate via local data or API)
- Include Create/Edit pages with form validation
- Use React Hook Form for forms
- Use Redux Toolkit + RTK Query for state and API
- Use React Router for page navigation
- Use a folder structure with: `/components`, `/pages`, `/store`, `/api`, `/utils`

Constraints:
- Written in TypeScript (no `any`)
- Follow good commit practices (explain later)
- Output code using fenced code blocks
- Explain your reasoning only if I ask

Step-by-step:
1. Start by creating the folder structure and a simple file scaffold
2. Then scaffold a routing layout using React Router
3. Next, generate the data types and Redux slices for VehicleMake and VehicleModel
4. After that, generate the RTK Query setup
5. Then, build the list/grid view (with sorting, filtering, pagination)
6. Then the Create/Edit forms with React Hook Form

Let’s begin.

🔹 First task:  
Create the basic folder structure and starter files (no functionality yet). Use `src/` as the root.
Output just the folder/file structure using tree-style formatting, and include placeholder code in key files (e.g., App.tsx, index.tsx).
