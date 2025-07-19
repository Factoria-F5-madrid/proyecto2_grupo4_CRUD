from sqlalchemy import Enum
import enum

class ServiceTypeEnum(enum.Enum):
    GUARDERIA = "Guarderia"
    TRANSPORTE = "Transporte"
    COMIDA = "Comida"
    OTROS = "Otros"

class ReservationStatusEnum(enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    COMPLETED = "completed"

SqlServiceTypeEnum = Enum(ServiceTypeEnum, name="service_type_enum")
SqlReservationStatusEnum = Enum(ReservationStatusEnum, name="reservation_status_enum")
