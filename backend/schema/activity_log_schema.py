from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from backend.models.enums import ActivityTypeEnum

class ActivityLogBase(BaseModel):
    employee_id: int
    pet_id: int
    activity_type: ActivityTypeEnum
    description: str
    start_time: datetime
    end_time: Optional[datetime] = None
    notes: Optional[str] = None

class ActivityLogCreate(ActivityLogBase):
    pass

class ActivityLogUpdate(BaseModel):
    activity_type: Optional[ActivityTypeEnum] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    notes: Optional[str] = None

class ActivityLogOut(ActivityLogBase):
    activity_id: int
    created_at: datetime

    model_config = {
        "from_attributes": True,
        "json_schema_extra": {
            "example": {
                "activity_id": 1,
                "employee_id": 1,
                "pet_id": 2,
                "activity_type": "Paseo",
                "description": "Paseo matutino en el parque central.",
                "start_time": "2025-07-20T08:30:00Z",
                "end_time": "2025-07-20T09:00:00Z",
                "notes": "El perro disfrutó mucho el paseo y socializó con otros perros.",
                "created_at": "2025-07-20T08:30:00Z"
            }
        }
    }
