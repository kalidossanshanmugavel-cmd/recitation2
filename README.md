# Recitation - Fully Dynamic SQL Learning Application

A full-stack learning and assessment application with database-driven courses, lessons, MCQs, practice exercises, assessments, and learner progress tracking.

## Architecture

```text
React + Vite + Material UI
          ↓
       FastAPI
          ↓
     SQLAlchemy
          ↓
        SQLite
```

All learning content displayed by the React frontend is retrieved through FastAPI from SQLite.

---

## Automatic Database Setup & Seeding

You do **not** need to run `seed.py` manually.

Start the backend:

```powershell
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

When FastAPI starts, it automatically:

1. Creates `recitation.db` if it does not exist.
2. Creates missing database tables.
3. Calls `seed_database(db)`.
4. Creates the demo learner if missing.
5. Seeds missing courses, lessons, MCQs, and practice exercises.
6. Skips catalog data that has already been seeded.

The seed process is **idempotent**, so using `--reload` does not repeatedly duplicate the learning catalog.

---

## Seeded Learning Catalog

The application initially contains:

- Python Programming
- FastAPI Development
- Django Web Development
- JavaScript
- React Development
- PostgreSQL
- Generative AI

Each course contains:

- 8 lessons
- 10 MCQs
- 5 practice exercises

### Initial Database Content

| Content | Count |
|---|---:|
| Courses | 7 |
| Lessons | 56 |
| MCQs | 70 |
| Practice Exercises | 35 |

---

## Demo Login

```text
Email: student@example.com
Password: Student@123
```

---

## Frontend Setup

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open:

http://localhost:5173

---

## Dynamic UI

The frontend is fully database-driven.

- Dashboard counts come from backend APIs and the database.
- Courses come from the `courses` table.
- Course details and lessons come from `courses` and `lessons`.
- MCQs come from `questions`.
- Practice Lab content comes from `practice_questions`.
- Assessment submissions create `attempts`.
- Progress is calculated from learner attempts.

---

## API Documentation

Start the backend and open Swagger:

http://127.0.0.1:8000/docs

### Main API Routes

```text
POST  /auth/register
POST  /auth/login
POST  /auth/logout
GET   /auth/me

GET   /courses
GET   /courses/{id}

GET   /mcq?course_id=1
POST  /mcq/submit

GET   /practice?course_id=1

GET   /progress
```

---

## Upgrading From an Earlier Version

The database schema contains new tables and columns.

For a clean classroom setup, delete the old database once:

```text
backend/recitation.db
```

Then restart FastAPI:

```powershell
cd backend
uvicorn main:app --reload
```

FastAPI will automatically recreate the database, create the tables, and seed the initial learning catalog.

---

## Playwright Testing

Keep both the backend and frontend running.

From the frontend directory:

```powershell
cd frontend
npx playwright install
npm test
```

Playwright tests include:

```text
tests/
├── auth.spec.ts
├── courses.spec.ts
└── mcq.spec.ts
```

---

## UI Features

- Collapsible Material UI sidebar
- Expanded and minimized icon-only sidebar modes
- Active route highlighting
- Logged-in user information
- Logout functionality
- Dynamic dashboard statistics
- One-question-at-a-time MCQ interface
- Database-backed courses and lessons
- Practice Lab
- Progress tracking

Dashboard statistics are clickable:

```text
Courses / Lessons → Courses
MCQs              → MCQ
Attempts          → Progress
```

---

## Authentication

The application uses JWT cookie-based authentication.

The frontend communicates with:

```text
http://localhost:8000
```

Cookies are included in API requests so authenticated FastAPI endpoints can identify the logged-in learner.

---

## Project Structure

```text
recitation/
│
├── backend/
│   ├── routers/
│   │   ├── auth.py
│   │   ├── courses.py
│   │   ├── mcq.py
│   │   ├── practice.py
│   │   └── progress.py
│   │
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── security.py
│   ├── seed.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── main.jsx
│   │
│   ├── tests/
│   │   ├── auth.spec.ts
│   │   ├── courses.spec.ts
│   │   └── mcq.spec.ts
│   │
│   ├── package.json
│   ├── playwright.config.ts
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Technology Stack

**Frontend:** React, Vite, Material UI  
**Backend:** FastAPI, Python  
**ORM:** SQLAlchemy  
**Database:** SQLite  
**Authentication:** JWT + HTTP-only Cookie  
**API Documentation:** OpenAPI / Swagger  
**Testing:** Playwright