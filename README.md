# College Health Center — Appointments

This project is a small React + Vite frontend with an Express backend. It provides a simple appointment booking UI and demo API endpoints.

## Quick local run (development)

1. Install dependencies (root + backend):

```powershell
cd "C:\Users\sayan\Downloads\COLLEGE-HEALTH-CENTER-APPOINTMENTS"
npm install
cd backend; npm install; cd ..
```

2. Start backend (dev with nodemon):

```powershell
cd backend
npm run dev
```

3. Start frontend (Vite dev server) in a separate terminal:

```powershell
cd "C:\Users\sayan\Downloads\COLLEGE-HEALTH-CENTER-APPOINTMENTS"
npm run dev
```

Frontend will be available at the Vite URL (default http://localhost:5173 or http://localhost:5174 if 5173 in use). Backend runs on http://localhost:5000 by default.

## Environment

- Backend: `backend/.env.example` contains recommended variables. Create `backend/.env` with values for `MONGODB_URI` and `JWT_SECRET` to enable MongoDB persistence and JWT auth.
- Frontend: root `.env.example` has `VITE_API_BASE`. Create a local `.env` to override the API base if needed.

## Features added

- Optional MongoDB persistence (MONGODB_URI). If not provided, the server uses in-memory arrays (data lost on restart).
- Mongoose models for User, Appointment, Feedback, Doctor, Service.
- Seed script: `cd backend && npm run seed` to populate doctors and services when MongoDB is configured.
- Register/login endpoints and JWT-based auth. Frontend stores token in `localStorage` under `chca_token`.
- Dockerfiles and `docker-compose.yml` to run MongoDB + backend + frontend.

## Docker

To run with Docker Compose (builds images):

```powershell
docker compose up --build
```

This will expose frontend on `http://localhost:5174` (mapped) and backend on `http://localhost:5000`.

## Next steps / TODO

- Improve validation and error handling.
- Add admin UI to manage doctors/services/appointments.
- Add tests and CI.

If you want, I can continue and implement the remaining roadmap items (admin UI, full tests, CI, deployment). Tell me which to prioritize.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
