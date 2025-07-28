from pydantic import BaseModel, validator
from datetime import datetime
from typing import Optional, Union
from backend.models.enums import ReservationStatusEnum

class ReservationBase(BaseModel):
    user_id: int
    service_id: int
    checkin_date: datetime
    checkout_date: datetime
    status: Optional[ReservationStatusEnum] = ReservationStatusEnum.PENDING
    internal_notes: Optional[str] = None

    @validator('checkin_date', 'checkout_date', pre=True)
    def parse_dates(cls, v):
        if isinstance(v, str):
            try:
                return datetime.fromisoformat(v.replace('Z', '+00:00'))
            except ValueError:
                try:
                    return datetime.fromisoformat(v)
                except ValueError:
                    raise ValueError(f"Invalid date format: {v}")
        return v

class ReservationCreate(ReservationBase):
    pass

class ReservationUpdate(BaseModel):
    user_id: Optional[int] = None
    service_id: Optional[int] = None
    checkin_date: Optional[datetime] = None
    checkout_date: Optional[datetime] = None
    status: Optional[Union[ReservationStatusEnum, str]] = None
    internal_notes: Optional[str] = None

    @validator('checkin_date', 'checkout_date', pre=True)
    def parse_dates(cls, v):
        if v is None:
            return v
        if isinstance(v, str):
            try:
                return datetime.fromisoformat(v.replace('Z', '+00:00'))
            except ValueError:
                try:
                    return datetime.fromisoformat(v)
                except ValueError:
                    raise ValueError(f"Invalid date format: {v}")
        return v

    @validator('status', pre=True)
    def validate_status(cls, v):
        if v is None:
            return v
        if isinstance(v, str):
            try:
                return ReservationStatusEnum(v)
            except ValueError:
                raise ValueError(f"Invalid status: {v}. Must be one of: {[e.value for e in ReservationStatusEnum]}")
        return v

class ReservationOut(ReservationBase):
    reservation_id: int
    created_at: datetime

    class Config:
        from_attributes = True