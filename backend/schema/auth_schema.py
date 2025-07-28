from pydantic import BaseModel
from typing import List, Optional
from backend.models.enums import UserRole

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    phone_number: int
    address: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    email: str
    role: str
    permissions: List[str]
    available_routes: dict

class UserInfoResponse(BaseModel):
    user_id: int
    email: str
    first_name: str
    last_name: str
    role: str
    permissions: List[str]
    available_routes: dict

class RoleUpdateRequest(BaseModel):
    role: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "role": "admin"
            }
        }