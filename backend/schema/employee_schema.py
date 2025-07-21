from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from backend.models.enums import EmployeeSpecialtyEnum

class EmployeeBase(BaseModel):
    first_name: str
    last_name: str
    specialty: EmployeeSpecialtyEnum
    is_active: bool = True

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    specialty: Optional[EmployeeSpecialtyEnum] = None
    is_active: Optional[bool] = None

class EmployeeOut(EmployeeBase):
    employee_id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "employee_id": 1,
                "first_name": "Juan",
                "last_name": "Pérez",
                "specialty": "Veterinario",
                "is_active": True,
                "created_at": "2025-07-20T14:30:00",
                "updated_at": "2025-07-20T15:00:00"
            }
        }
