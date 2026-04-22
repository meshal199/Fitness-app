# Fitness Program Manager

A MERN stack workout program manager for coaches and trainees. It supports JWT auth, role-based program management, 4-day workout plans, warmups, circuit exercises, cardio, bilingual notes, assignments, and progress tracking.

## Structure

- `server/` Express, MongoDB, Mongoose, JWT, bcrypt
- `client/` React, React Router, Axios, Tailwind CSS

## Quick Start

1. Install dependencies:

```bash
npm run install:all
```

2. Create `server/.env`:

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/fitness_program_manager
JWT_SECRET=change_this_secret
CLIENT_URL=http://localhost:5173
```

3. Seed demo users and the 4-day program:

```bash
npm run seed --prefix server
```

4. Start both apps:

```bash
npm run dev
```

## Demo Accounts

- Coach: `coach@example.com` / `password123`
- Trainee: `trainee@example.com` / `password123`
