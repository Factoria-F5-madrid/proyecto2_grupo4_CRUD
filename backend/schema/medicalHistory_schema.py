from pydantic import BaseModel
from datetime import datetime

class MedicalHistoryBase(BaseModel):
    pet_id: int
    type: str
    description: str

class MedicalHistoryCreate(MedicalHistoryBase):
    pass

class MedicalHistoryResponse(MedicalHistoryBase):
    id: int
    date: datetime

    class Config:
        from_attributes = True