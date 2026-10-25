# o2h Task Manager Portal (MERN)

Task Management Portal built using MERN Stack.

## Features

- CRUD Operations
- Search (by title)
- Filter (All / Pending / In Progress / Completed)
- Sort (Newest First / Oldest First)
- Statistics Dashboard
- Dark Mode (stored in LocalStorage)
- Responsive Mobile Design
- Toast Notifications
- Loading Spinner
- Empty State

## Project Structure

```
project-root/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── TaskCard.jsx
│       │   ├── TaskFilter.jsx
│       │   ├── SearchBar.jsx
│       │   ├── Statistics.jsx
│       │   ├── LoadingSpinner.jsx
│       │   ├── EmptyState.jsx
│       │   └── ThemeToggle.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   └── AddTask.jsx
│       ├── services/
│       │   └── taskService.js
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
├── backend/
│   ├── config/db.js
│   ├── controllers/taskController.js
│   ├── models/Task.js
│   ├── routes/taskRoutes.js
│   ├── server.js
│   └── package.json
└── README.md
```

## Tech Stack

- Frontend: React (Vite), React Router DOM, Axios, Bootstrap 5
- Backend: Node.js, Express.js, MongoDB Atlas, Mongoose, CORS, Dotenv

## Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```


## Environment Variables

Create `.env` in `backend/`:

```env
MONGO_URI=
PORT=5000
```

## API Documentation

Base URL: `http://localhost:5000/api`

### GET /api/tasks

Returns all tasks.

Example:

```http
GET /api/tasks
```

Response:

```json
[
  {
    "_id": "123",
    "title": "Build Login Page",
    "description": "Create responsive login page",
    "status": "Pending",
    "createdAt": "2026-06-19"
  }
]
```

### POST /api/tasks

Create task.

```http
POST /api/tasks
Content-Type: application/json
```

Request:

```json
{
  "title": "Build Login Page",
  "description": "Create responsive login page with validation",
  "status": "Pending"
}
```

Response: `201 Created`

### PUT /api/tasks/:id

Update task status.

```http
PUT /api/tasks/:id
Content-Type: application/json
```

Request:

```json
{
  "status": "Completed"
}
```

Response: updated task.

### DELETE /api/tasks/:id

```http
DELETE /api/tasks/:id
```

Response:

```json
{
  "message": "Task deleted successfully"
}
```

## Assumptions

- Tasks are stored in MongoDB Atlas.
- `status` is one of: `Pending`, `In Progress`, `Completed`.
- On the frontend, status updates are done via the “Complete Task” button.

## GitHub Commands (example)

Commit history examples:

1. `Initial project setup`
2. `Configured MongoDB and Express server`
3. `Implemented Task CRUD APIs`
4. `Built React Dashboard`
5. `Added Add Task page`
6. `Integrated frontend and backend`
7. `Implemented Search, Filter and Sort`
8. `Added Statistics Dashboard`
9. `Implemented Dark Mode`
10. `Updated README and final cleanup`

Commands:

```bash
git init
git add .
git commit -m "Initial project setup"
...
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step-by-step Run Instructions

1. Create `backend/.env` with `MONGO_URI` and `PORT`.
2. Start backend:
   - `cd backend && npm install && npm run dev`
3. Start frontend:
   - `cd frontend && npm install && npm run dev`
4. Open the frontend URL shown by Vite.

