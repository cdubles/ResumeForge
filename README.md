# ResumeForge

Tailor your resume to any job description without inventing experience.

ResumeForge takes a DOCX resume and a job posting, runs them through a multi-step LLM pipeline, and returns a tailored resume. The core design goal is trust: a dedicated verification step compares the tailored output against the original and fails the job if it finds anything fabricated, such as invented companies, inflated titles, or skills that were never in the source.

It also doubles as a lightweight application tracker, so every tailored resume is tied to a company, a role, and where that application stands.

> **Status: in active development.** The data layer, jobs API, and React UI are built. The LLM pipeline is next. See [Roadmap](#roadmap) and [MILESTONES.md](MILESTONES.md) for the full plan.

## How it will work

The pipeline runs six steps in sequence, and logs the output of each one to the job record so every result can be traced back to how it was produced.

1. **Parse resume:** extract sections and bullets from the DOCX with python-docx.
2. **Analyze the job:** pull required skills, preferred qualifications, and keywords from the posting.
3. **Match and map:** decide which resume items are directly relevant, which can be reframed, and which to drop.
4. **Tailor content:** rewrite bullets and the summary using only facts from the original resume.
5. **Verify:** a separate LLM pass checks the tailored version against the original for fabrications. If it flags anything, the job fails instead of producing an inaccurate resume.
6. **Generate DOCX:** write a clean, formatted resume ready to download.

## What works today

- **Jobs API (FastAPI):** create, list, and fetch tailoring jobs, and update each job's application status (`saved`, `applied`, `interviewing`, `offered`, `denied`).
- **Data model (PostgreSQL + SQLAlchemy + Alembic):** users, user profiles with JSONB classified data, and tailoring jobs with a pipeline status, file paths, and a JSONB pipeline log.
- **Validation (Pydantic):** typed request and response schemas for every endpoint.
- **React frontend (Vite + React Router):** a dashboard of applications with status tracking, a page to submit a company, role, and job description, a profile page, and a job status page.

The dashboard currently renders sample data while the frontend and API are being wired together.

## Tech stack

| Layer | Tools |
|---|---|
| Backend | Python, FastAPI, SQLAlchemy, Alembic, Pydantic |
| AI | LangChain, Google Gemini |
| Database | PostgreSQL (Docker for local dev) |
| Frontend | React, Vite, React Router |
| Documents | python-docx |

## API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/api/jobs` | List tailoring jobs |
| `POST` | `/api/jobs` | Create a job from a company, role, and job description |
| `GET` | `/api/jobs/{id}` | Get one job, including pipeline status |
| `PATCH` | `/api/jobs/{id}/application-status` | Update where the application stands |

Interactive docs are available at `http://localhost:8000/docs` when the backend is running.

## Roadmap

- [x] Project setup, monorepo structure, environment config
- [x] Database schema, migrations, ORM models, and Pydantic schemas
- [x] Jobs API with application status tracking
- [x] React layout, routing, and core pages
- [ ] Profile classification endpoint (freeform background to structured profile via LLM)
- [ ] DOCX upload and parsing
- [ ] Six-step tailoring pipeline with hallucination verification
- [ ] Connect the dashboard to live API data
- [ ] Test suite (parser, prompts with mocked LLM calls, API integration)
- [ ] Deployment with HTTPS

## Running locally

### Prerequisites

- Python 3.11+
- Node.js 18+
- Docker (for PostgreSQL)

### 1. Clone the repository

```bash
git clone https://github.com/cdubles/ResumeForge.git
cd ResumeForge
```

### 2. Start PostgreSQL

```bash
docker run --name resumeforge-db -e POSTGRES_PASSWORD=devpass -e POSTGRES_DB=resumeforge -p 5432:5432 -d postgres:16
```

### 3. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env            # then fill in DATABASE_URL and GOOGLE_API_KEY
alembic upgrade head
uvicorn app.main:app --reload   # http://localhost:8000
```

### 4. Frontend

```bash
cd frontend
npm install
npm run dev                     # http://localhost:5173
```

## Project structure

```
backend/
  app/
    main.py          FastAPI entry point
    db.py            Session factory and get_db dependency
    models/          SQLAlchemy models
    schemas/         Pydantic schemas
    routers/         API routes
    pipeline/        LLM pipeline (in progress)
  alembic/           Database migrations
frontend/
  src/
    pages/           Dashboard, upload, profile, status
    components/      Layout and navbar
    services/api.js  API client
```

## Author

Built by [Cody Schafer](https://codyschafer.dev).
