from sqlalchemy import Enum
import enum

ServiceTypeEnum = Enum(
    'Guarderia', 'Transporte', 'Comida', 'Otros',
    name='service_type_enum'
)

class PaymentMethodEnum(enum.Enum):
    CASH = "Cash"
    CARD = "Card"
    BANK_TRANSFER = "Bank_Transfer"
    IOT_DEVICES = "IoT_Devices"

class PaymentStatusEnum(enum.Enum):
    PENDING = "Pending"
    APPROVED = "Approved"
    REJECTED = "Rejected"
    CANCELLED = "Cancelled"

class IncludedServiceEnum(enum.Enum):
    CUIDADO = "Cuidado"
    ADIESTRAMIENTO = "Adiestramiento"
    PELUQUERIA = "Peluquería"
    RECEPCION = "Recepción"
    ALIMENTACION = "Alimentacion especial"
    NUTRICION = "Nutrición estandar"
    CRIAS = "Cuidado de crias"
    ADIESTRAMIENTO_AVANZADO = "Adiestramiento avanzado"
    NOCTURNO = "Cuidado nocturno"
    PSICOLOGIA = "Psicología animal"
    EVENTOS = "Celebracion eventos"   


class MedicalHistoryTypeEnum(enum.Enum):
    VACCINATION = "Vacunación"
    SURGERY = "Cirugía"
    ILLNESS = "Enfermedad"
    CHECKUP = "Revisión"
    OTHER = "Otro"

SqlMedicalHistoryTypeEnum = Enum(MedicalHistoryTypeEnum, name="medical_history_type_enum")     
SqlPaymentMethodEnum = Enum(PaymentMethodEnum, name="payment_method_enum")
SqlPaymentStatusEnum = Enum(PaymentStatusEnum, name="payment_status_enum")  
SqlIncludedServiceEnum = Enum(IncludedServiceEnum, name="included_service_enum")  

PetTypeEnum = Enum(
    'Canino', 'Felino', 'Reptil', 'Anfibio', 'Ave', 'Pez', 'Roedor', 'Otro',
    name='pet_type_enum'
)

