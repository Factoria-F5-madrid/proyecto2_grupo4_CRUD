from sqlalchemy import Enum
import enum

class ServiceTypeEnum(enum.Enum):
    GUARDERIA = "Guarderia"
    TRANSPORTE = "Transporte"
    COMIDA = "Comida"
    OTROS = "Otros"

SqlServiceTypeEnum = Enum(ServiceTypeEnum, name="service_type_enum")
