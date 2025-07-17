from sqlalchemy import Enum

ServiceTypeEnum = Enum(
    'Guarderia', 'Transporte', 'Comida', 'Otros',
    name='service_type_enum'
)

PetTypeEnum = Enum(
    'Canino', 'Felino', 'Reptil', 'Anfibio', 'Ave', 'Pez', 'Roedor', 'Otro',
    name='pet_type_enum'
)

