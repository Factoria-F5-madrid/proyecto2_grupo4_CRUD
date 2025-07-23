from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    first_name: str
    last_name: str
    phone_number: int
    email: str
    address: str

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[int] = None
    email: Optional[str] = None
    address: Optional[str] = None

class UserOut(UserBase):
    user_id: int
    registration_date: Optional[datetime] = None
    last_update: Optional[datetime] = None
    updated_by: Optional[str] = None
    update_date: Optional[datetime] = None

    class Config:
        from_attributes = True