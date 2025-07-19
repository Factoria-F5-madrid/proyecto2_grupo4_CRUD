from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ReservationBase(BaseModel):
    service_id: int
    pet_id: int
    start_date: datetime
    end_date: datetime
    is_confirmed: Optional[bool] = False

class ReservationCreate(ReservationBase):
    pass

class ReservationUpdate(BaseModel):
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    is_confirmed: Optional[bool]

class ReservationOut(ReservationBase):
    reservation_id: int
    created_at: datetime

    class Config:
        model_config = {"from_attributes": True}
