from typing import Optional
from pydantic import BaseModel
from datetime import date
from backend.models.enums import PetTypeEnum

class PetBase(BaseModel):
    name: str
    species: PetTypeEnum
    breed: str
    birth_date: date
    allergies: Optional[str] = None
    special_needs: Optional[str] = None
    user_id: int  

class PetCreate(PetBase):
    pass

class PetUpdate(BaseModel):
    name: Optional[str] = None
    species: Optional[PetTypeEnum] = None
    breed: Optional[str] = None
    birth_date: Optional[date] = None
    allergies: Optional[str] = None
    special_needs: Optional[str] = None
    user_id: Optional[int] = None

class PetOut(PetBase):
    pet_id: int

    class Config:
        from_attributes = True
        schema_extra = {
            "example": {
                "pet_id": 1,
                "name": "Firulais",
                "species": "Canino",
                "breed": "Labrador",
                "birth_date": "2020-05-20",
                "allergies": "Ninguna",
                "special_needs": "Ninguna",
                "user_id": 1
            }
        }