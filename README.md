# Fitness Program Manager

A MERN stack workout program manager for coaches and trainees. It turns a static 4-day workout sheet into an interactive program with authentication, coach/admin tools, trainee views, warmups, circuit exercises, cardio, bilingual Arabic/English notes, assignments, and progress tracking.

## Features

- JWT authentication with coach/admin and trainee roles
- Coach dashboard for programs, duplication, and soft delete/archive
- Program editor with workout days, warmups, exercises, circuit groups, cardio, and bilingual notes
- Trainee view for assigned programs with day tabs and completion tracking
- Assignment management for linking trainees to programs
- Seeded 4-day beginner fat-loss workout program
- Colorful responsive UI with generated fitness background artwork
- MongoDB/Mongoose data models for users, programs, days, exercises, assignments, and progress

## Structure

- `server/` Express, MongoDB, Mongoose, JWT, bcrypt
- `client/` React, React Router, Axios, Tailwind CSS

## Requirements

- Node.js
- npm
- MongoDB running locally or a MongoDB connection string

## Quick Start

1. Install dependencies:

```bash
npm run install:all
```

2. Create `server/.env`:

```env
PORT=5002
MONGO_URI=mongodb://127.0.0.1:27017/fitness_program_manager
JWT_SECRET=change_this_secret
CLIENT_URL=http://localhost:5173,http://localhost:5174
```

3. Seed demo users and the 4-day program:

```bash
npm run seed --prefix server
```

4. Start both apps:

```bash
npm run dev
```

The frontend runs on the Vite URL printed in the terminal, usually:

```txt
http://localhost:5173
```

The backend API runs on:

```txt
http://localhost:5002/api
```

## Demo Accounts

- Coach: `coach@example.com` / `password123`
- Trainee: `trainee@example.com` / `password123`

## Useful Commands

```bash
npm run server
npm run client
npm run build --prefix client
npm run seed --prefix server
```

## Notes

- Deleted programs are archived with `deletedAt` so history is not broken.
- Arabic notes are stored as UTF-8 text in MongoDB.
- If the frontend cannot connect to the API, confirm `client/src/api/http.js` points to `http://localhost:5002/api` and the backend is running.
