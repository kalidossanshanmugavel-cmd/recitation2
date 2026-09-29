# Recitation - Fully Dynamic SQL Learning Application

## Architecture
React + Vite + Material UI -> FastAPI -> SQLAlchemy -> SQLite

All learning content displayed by React is retrieved through FastAPI from SQLite.

## Automatic Feed
You do NOT run seed.py manually.

From `backend`:
```powershell
pip install -r requirements.txt
uvicorn app.main:app --reload
```

At startup FastAPI:
1. creates `recitation.db` and missing tables;
2. calls `seed_database(db)`;
3. creates the demo learner if missing;
4. feeds missing courses, lessons, MCQs and practice exercises;
5. safely skips courses already seeded.

The seed is idempotent, so `--reload` does not repeatedly duplicate the catalog.

## Seeded Catalog
- Python Programming
- FastAPI Development
- Django Web Development
- JavaScript
- React Development
- PostgreSQL
- Generative AI

Each course has 8 database-backed lessons, 10 MCQs and 5 practice exercises.
Total initial learning catalog: 7 courses, 56 lessons, 70 MCQs, 35 practice exercises.

## Demo Login
Email: `student@example.com`
Password: `Student@123`

## Frontend
```powershell
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173`.

## Dynamic UI
- Dashboard counts come from APIs/database.
- Courses come from `courses`.
- Course details and lessons come from `courses` + `lessons`.
- MCQs come from `questions`.
- Practice Lab comes from `practice_questions`.
- Assessment submissions create `attempts`.
- Progress reads learner attempts.

## API
Swagger: `http://127.0.0.1:8000/docs`

Main routes:
- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/logout`
- GET `/auth/me`
- GET `/courses`
- GET `/courses/{id}`
- GET `/mcq?course_id=1`
- POST `/mcq/submit`
- GET `/practice?course_id=1`
- GET `/progress`

## Important when upgrading from the earlier ZIP
The schema now contains new tables/columns. For a clean classroom setup, delete the old
`backend/recitation.db` once before starting this version. FastAPI will recreate and feed it.

## Playwright
Keep backend and frontend running:
```powershell
cd frontend
npx playwright install
npm test
```

## UI update
- Replaced the top navigation with a collapsible MUI sidebar.
- Sidebar supports expanded and minimized icon-only modes.
- Active routes are highlighted.
- Dashboard stat numbers are clickable: Courses/Lessons -> Courses, MCQs -> MCQ, Attempts -> Progress.
- Frontend API uses http://localhost:8000 consistently for JWT cookie authentication.
