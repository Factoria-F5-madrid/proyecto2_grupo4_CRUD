from typing import Optional
from pydantic import BaseModel
from datetime import date
from models.enums import PetTypeEnum

class PetSchema(BaseModel):
    pet_id: Optional[int]
    name: str
    species: PetTypeEnum
    breed: str
    birth_date: date
    allergies: Optional[str] = None
    special_needs: Optional[str] = None
    client_id: int

    class Config:
        orm_mode = True
        # esto es para que se muestre en el swagger
        schema_extra = {
            "example": {
                "name": "Firulais",
                "species": "Canino",
                "breed": "Labrador",
                "birth_date": "2020-05-20",
                "allergies": "Ninguna",
                "special_needs": "Ninguna",
                "client_id": 1
            }
        }

#  creamos un schema de respuesta
class Response(BaseModel):
    code: str
    status: str
    message: str
    result: Optional[PetSchema]
