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

SqlPaymentMethodEnum = Enum(PaymentMethodEnum, name="payment_method_enum")
SqlPaymentStatusEnum = Enum(PaymentStatusEnum, name="payment_status_enum")    