from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ReservationBase(BaseModel):
    user_id: int
    service_id: int
    start_date: datetime
    end_date: datetime
    is_confirmed: Optional[bool] = False

class ReservationCreate(ReservationBase):
    pass

class ReservationUpdate(BaseModel):
    user_id: Optional[int] = None
    service_id: Optional[int] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    is_confirmed: Optional[bool] = None

class ReservationOut(ReservationBase):
    reservation_id: int
    created_at: datetime

    class Config:
        from_attributes = True 