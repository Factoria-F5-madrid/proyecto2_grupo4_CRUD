from sqlalchemy import Enum

ServiceTypeEnum = Enum(
    'Guarderia', 'Transporte', 'Comida', 'Otros',
    name='service_type_enum'
)