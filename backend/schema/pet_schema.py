from typing import Optional, Union
from pydantic import BaseModel, validator
from datetime import date
from backend.models.enums import PetTypeEnum

class PetBase(BaseModel):
    name: str
    species: Union[PetTypeEnum, str]
    breed: str
    birth_date: date
    allergies: Optional[str] = None
    special_needs: Optional[str] = None
    img_url: Optional[str] = None  
    user_id: int

    @validator('species', pre=True)
    def validate_species(cls, v):
        if isinstance(v, str):
            # Mapear valores del frontend a los valores del enum
            species_mapping = {
                "Canino": PetTypeEnum.CANINO,
                "Felino": PetTypeEnum.FELINO,
                "Reptil": PetTypeEnum.REPTIL,
                "Anfibio": PetTypeEnum.ANFIBIO,
                "Ave": PetTypeEnum.AVE,
                "Pez": PetTypeEnum.PEZ,
                "Roedor": PetTypeEnum.ROEDOR,
                "Otro": PetTypeEnum.OTRO
            }
            return species_mapping.get(v, v)
        return v

class PetCreate(PetBase):
    pass

class PetUpdate(BaseModel):
    name: Optional[str] = None
    species: Optional[Union[PetTypeEnum, str]] = None
    breed: Optional[str] = None
    birth_date: Optional[date] = None
    allergies: Optional[str] = None
    special_needs: Optional[str] = None
    img_url: Optional[str] = None
    user_id: Optional[int] = None

    @validator('species', pre=True)
    def validate_species(cls, v):
        if isinstance(v, str):
            # Mapear valores del frontend a los valores del enum
            species_mapping = {
                "Canino": PetTypeEnum.CANINO,
                "Felino": PetTypeEnum.FELINO,
                "Reptil": PetTypeEnum.REPTIL,
                "Anfibio": PetTypeEnum.ANFIBIO,
                "Ave": PetTypeEnum.AVE,
                "Pez": PetTypeEnum.PEZ,
                "Roedor": PetTypeEnum.ROEDOR,
                "Otro": PetTypeEnum.OTRO
            }
            return species_mapping.get(v, v)
        return v

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
                "img_url": "https://res.cloudinary.com/yederpt/image/upload/v1753339634/h3citaq7jde3vsmz8zkc.png",
                "user_id": 1
            }
        }