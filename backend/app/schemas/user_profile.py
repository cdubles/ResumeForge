from datetime import datetime
from uuid import UUID
from typing import Any
from pydantic import BaseModel


class UserProfileCreate(BaseModel):
    raw_input: str


class UserProfileRead(BaseModel):
    id: UUID
    user_id: UUID
    raw_input: str
    classified_data: dict[str, Any] | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
