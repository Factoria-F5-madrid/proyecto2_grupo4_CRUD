from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MedicalHistoryBase(BaseModel):
    pet_id: int
    type: str
    description: str

class MedicalHistoryCreate(MedicalHistoryBase):
    pass

class MedicalHistoryUpdate(BaseModel):
    type: Optional[str] = None
    description: Optional[str] = None

class MedicalHistoryOut(MedicalHistoryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "pet_id": 3,
                "type": "Consulta general",
                "description": "El perro fue tratado por una infección de oído.",
                "created_at": "2025-07-20T12:34:56"
            }
        }
