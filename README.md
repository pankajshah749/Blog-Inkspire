# Inkspire Blog Platform
React + Tailwind CSS frontend with an Express API serving read-only blog posts from a static JSON file.

## Run locally
Backend: `cd backend`, run `npm install` and `npm run dev`. Posts are stored in `backend/src/data/posts.json`; add published post objects there and restart the backend to load changes.
Frontend: `cd frontend`, copy `.env.example` to `.env`, then `npm install` and `npm run dev`.
Frontend: http://localhost:5173 | API: http://localhost:5000/api

Posts in the JSON file must use the public API shape: `title`, `slug`, `excerpt`, `content`, `coverImage`, `category`, `tags`, `author` (with a `name`), `status` (`published`), `featured`, `readingMinutes`, `createdAt`, and `updatedAt`. The API is read-only; authentication, writing, comments, newsletter subscriptions, uploads, and database persistence have been removed.

## Deploy
Vercel frontend (root `frontend`) and Render backend (root `backend`). Configure `VITE_API_URL` and `CLIENT_URL` in hosting dashboards. The JSON post file is deployed with the backend source.

## Production checklist
Use HTTPS, set the exact CORS origin, monitor the service, and review the static content before deployment.
