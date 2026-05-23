from datetime import datetime
from uuid import UUID
from typing import Any
from pydantic import BaseModel

from app.models.tailoring_job import ApplicationStatus, JobStatus


class TailoringJobCreate(BaseModel):
    job_description: str
    company_name: str | None = None
    job_role: str | None = None


class TailoringJobRead(BaseModel):
    id: UUID
    user_id: UUID
    status: JobStatus
    application_status: ApplicationStatus
    company_name: str | None
    job_role: str | None
    job_description: str
    original_resume_path: str | None
    tailored_resume_path: str | None
    pipeline_log: dict[str, Any] | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class TailoringJobStatusUpdate(BaseModel):
    status: JobStatus


class ApplicationStatusUpdate(BaseModel):
    application_status: ApplicationStatus
