from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from backend.models.enums import ReservationStatusEnum

class ReservationBase(BaseModel):
    user_id: int
    service_id: int
    checkin_date: datetime
    checkout_date: datetime
    status: Optional[ReservationStatusEnum] = ReservationStatusEnum.PENDING
    internal_notes: Optional[str] = None

class ReservationCreate(ReservationBase):
    pass

class ReservationUpdate(BaseModel):
    user_id: Optional[int] = None
    service_id: Optional[int] = None
    checkin_date: Optional[datetime] = None
    checkout_date: Optional[datetime] = None
    status: Optional[ReservationStatusEnum] = None
    internal_notes: Optional[str] = None

class ReservationOut(ReservationBase):
    reservation_id: int
    created_at: datetime

    class Config:
        from_attributes = True