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

class PetTypeEnum(enum.Enum):
    CANINO = "Canino"
    FELINO = "Felino"
    REPTIL = "Reptil"
    ANFIBIO = "Anfibio"
    AVE = "Ave"
    PEZ = "Pez"
    ROEDOR = "Roedor"
    OTRO = "Otro"

class EmployeeSpecialtyEnum(enum.Enum):
    VETERINARIO = "Veterinario"
    CUIDADOR = "Cuidador"
    PELUQUERO = "Peluquero"
    RECEPCIONISTA = "Recepcionista"
    ADMINISTRATIVO = "Administrativo"
    OTRO = "Otro"

class ActivityTypeEnum(enum.Enum):
    ALIMENTACION = "Alimentación"
    PASEO = "Paseo"
    MEDICACION = "Medicación"
    PELUQUERIA = "Peluquería"
    JUEGO = "Juego"
    ENTRENAMIENTO = "Entrenamiento"
    LIMPIEZA = "Limpieza"
    OTRO = "Otro"    

SqlPetTypeEnum = Enum(PetTypeEnum, name="pet_type_enum")    
SqlServiceTypeEnum = Enum(ServiceTypeEnum, name="service_type_enum")
SqlReservationStatusEnum = Enum(ReservationStatusEnum, name="reservation_status_enum")
SqlEmployeeSpecialtyEnum = Enum(EmployeeSpecialtyEnum, name="employee_specialty_enum")
SqlActivityTypeEnum = Enum(ActivityTypeEnum, name="activity_type_enum")
