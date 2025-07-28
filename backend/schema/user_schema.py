from pydantic import BaseModel
from typing import Optional, Literal
from datetime import datetime

class UserBase(BaseModel):
    first_name: str
    last_name: str
    phone_number: int
    email: str
    address: str
    role: Literal["admin", "user", "employee"] = "user"
   

class UserCreate(UserBase):
    password: str
  

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[int] = None
    email: Optional[str] = None
    address: Optional[str] = None
    password: Optional[str] = None 
    role: Optional[Literal["admin", "user", "employee"]] = None

class UserOut(UserBase):
    user_id: int
    registration_date: Optional[datetime] = None
    last_update: Optional[datetime] = None
    update_date: Optional[datetime] = None
    updated_by: Optional[str] = None
    

    class Config:
        from_attributes = True