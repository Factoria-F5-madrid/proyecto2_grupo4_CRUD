from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class AssignmentBase(BaseModel):
    service_id: int
    employee_id: int
    assignment_date: datetime

class AssignmentCreate(AssignmentBase):
    pass

class AssignmentUpdate(BaseModel):
    service_id: Optional[int] = None
    employee_id: Optional[int] = None
    assignment_date: Optional[datetime] = None

class AssignmentOut(AssignmentBase):
    assignment_id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "assignment_id": 1,
                "service_id": 1,
                "employee_id": 1,
                "assignment_date": "2025-07-21T14:30:00",
                "created_at": "2025-07-20T14:30:00",
                "updated_at": "2025-07-20T15:00:00"
            }
        }