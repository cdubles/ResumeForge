import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.tailoring_job import ApplicationStatus, TailoringJob
from app.schemas.tailoring_job import ApplicationStatusUpdate, TailoringJobCreate, TailoringJobRead

router = APIRouter(prefix="/api/jobs", tags=["jobs"])

# Placeholder user ID until auth is implemented
PLACEHOLDER_USER_ID = uuid.UUID("00000000-0000-0000-0000-000000000001")


@router.get("", response_model=list[TailoringJobRead])
def list_jobs(db: Session = Depends(get_db)):
    return db.query(TailoringJob).filter(TailoringJob.user_id == PLACEHOLDER_USER_ID).order_by(TailoringJob.created_at.desc()).all()


@router.post("", response_model=TailoringJobRead, status_code=201)
def create_job(body: TailoringJobCreate, db: Session = Depends(get_db)):
    job = TailoringJob(
        user_id=PLACEHOLDER_USER_ID,
        job_description=body.job_description,
        company_name=body.company_name,
        job_role=body.job_role,
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


@router.get("/{job_id}", response_model=TailoringJobRead)
def get_job(job_id: uuid.UUID, db: Session = Depends(get_db)):
    job = db.query(TailoringJob).filter(TailoringJob.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.patch("/{job_id}/application-status", response_model=TailoringJobRead)
def update_application_status(job_id: uuid.UUID, body: ApplicationStatusUpdate, db: Session = Depends(get_db)):
    job = db.query(TailoringJob).filter(TailoringJob.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    job.application_status = body.application_status
    db.commit()
    db.refresh(job)
    return job
