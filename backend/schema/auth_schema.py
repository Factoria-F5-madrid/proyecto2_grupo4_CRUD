from pydantic import BaseModel

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