# ResumeForge

A web application that automatically tailors resumes to job descriptions using an LLM-powered pipeline. Upload a DOCX resume, paste a job description, and receive a tailored resume with hallucination safeguards ensuring no fabricated experience is added.

## Tech Stack

- **Backend**: FastAPI, SQLAlchemy, Alembic, LangChain + Google Gemini
- **Frontend**: React, Vite, React Router, Axios
- **Database**: PostgreSQL
- **Document Processing**: python-docx

## Prerequisites

- Python 3.11+
- Node.js 18+
- Docker (for PostgreSQL)

## Setup

### 1. Clone and navigate to the repository

```bash
git clone <repository-url>
cd ResumeForge
```

### 2. Start PostgreSQL (Docker)

```bash
docker run --name resumeforge-db -e POSTGRES_PASSWORD=devpass -e POSTGRES_DB=resumeforge -p 5432:5432 -d postgres:16
```

### 3. Backend setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # Linux/Mac
source venv/Scripts/activate    # Windows (Git Bash)
venv\Scripts\activate           # Windows (CMD)

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your GOOGLE_API_KEY

# Run database migrations
alembic upgrade head
```

### 4. Frontend setup

```bash
cd frontend

# Install dependencies
npm install
```

## Running the Application

### Backend

```bash
cd backend
source venv/Scripts/activate    # or appropriate activation command
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

### Frontend

```bash
cd frontend
npm run dev
```

The app will be available at http://localhost:5173

## Docker Commands

```bash
docker stop resumeforge-db      # Stop PostgreSQL
docker start resumeforge-db     # Start PostgreSQL
docker rm resumeforge-db        # Remove container (deletes data)
```
