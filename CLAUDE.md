# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ResumeForge is a web application that automatically tailors resumes to job descriptions using an LLM-powered six-step pipeline. Users upload a DOCX resume, paste a job description, and receive a tailored resume with hallucination safeguards ensuring no fabricated experience is added.

## Development Commands

### Backend (FastAPI)
```bash
cd backend
uvicorn app.main:app --reload    # Start dev server (runs on port 8000)
```

### Frontend (React + Vite)
```bash
cd frontend
npm run dev      # Start Vite dev server
npm run build    # Production build to dist/
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

### Monorepo Structure
- `/backend` - FastAPI Python backend
- `/frontend` - React + Vite frontend

### Backend Organization (`/backend/app/`)
- `main.py` - FastAPI entry point
- `models/` - SQLAlchemy ORM models (Users, UserProfiles, TailoringJobs)
- `schemas/` - Pydantic request/response validation
- `pipeline/` - Six-step LLM processing pipeline
- `auth/` - Authentication module

### Frontend Organization (`/frontend/src/`)
- `pages/` - Route-level components
- `components/` - Reusable UI components
- `services/` - API client (axios)
- `hooks/` - Custom React hooks

### Six-Step LLM Pipeline
The core intelligence runs in sequence, with each step logged to `pipeline_log` JSONB:
1. **Parse Resume** - Extract DOCX content via python-docx
2. **Analyze Job Requirements** - Extract skills/keywords from job description
3. **Match and Map** - Compare resume to job requirements
4. **Tailor Content** - Rewrite resume sections for relevance
5. **Verify and Validate** - Hallucination safeguard comparing original vs tailored
6. **Generate DOCX** - Output tailored resume

Step 5 is critical: if any fabricated content is detected, the job fails rather than producing an inaccurate resume.

### Key API Endpoints (Planned)
- `GET /health` - Health check (implemented)
- `POST /api/profiles` - Submit freeform text for LLM classification
- `GET /api/profiles/{id}` - Retrieve classified profile
- `POST /api/jobs` - Upload DOCX + job description
- `GET /api/jobs/{id}` - Poll job status

### Database Schema (PostgreSQL)
- `Users` - id (UUID), timestamps
- `UserProfiles` - user_id FK, raw_input, classified_data (JSONB)
- `TailoringJobs` - user_id FK, status enum, job_description, file paths, pipeline_log (JSONB)

### File Storage
- `/backend/uploads/` - User-uploaded DOCX files (UUID filenames)
- `/backend/outputs/` - Generated tailored DOCX files (UUID filenames)

## Environment Variables

See `/backend/.env.example`:
- `GOOGLE_API_KEY` - Gemini API access
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET_KEY` - Token signing
- `ENV` - development or production

## Development Notes

- Frontend polls job status every 3 seconds until terminal state (complete/failed)
- LLM calls use LangChain with Google Gemini
- DOCX processing relies on python-docx for both parsing and generation
- Status transitions: pending → processing → complete/failed
- See `MILESTONES.md` for the full development roadmap and checklist
