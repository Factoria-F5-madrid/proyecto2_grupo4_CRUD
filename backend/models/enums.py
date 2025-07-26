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

class PaymentMethodEnum(enum.Enum):
    TARJETA_CREDITO = "Tarjeta de Crédito"
    TARJETA_DEBITO = "Tarjeta de Débito"
    EFECTIVO = "Efectivo"
    TRANSFERENCIA = "Transferencia"
    BIZUM = "Bizum"
    PAYPAL = "PayPal"

class PaymentStatusEnum(enum.Enum):
    PENDIENTE = "Pendiente"
    COMPLETADO = "Completado"
    FALLIDO = "Fallido"
    CANCELADO = "Cancelado"
    REEMBOLSADO = "Reembolsado"

class IncludedServicesEnum(enum.Enum):
    BASICO = "Básico"
    PREMIUM = "Premium"
    COMPLETO = "Completo"
    PERSONALIZADO = "Personalizado"    

SqlPetTypeEnum = Enum(PetTypeEnum, name="pet_type_enum")    
SqlServiceTypeEnum = Enum(ServiceTypeEnum, name="service_type_enum")
SqlReservationStatusEnum = Enum(ReservationStatusEnum, name="reservation_status_enum")
SqlEmployeeSpecialtyEnum = Enum(EmployeeSpecialtyEnum, name="employee_specialty_enum")
SqlActivityTypeEnum = Enum(ActivityTypeEnum, name="activity_type_enum")
SqlPaymentMethodEnum = Enum(PaymentMethodEnum, name="payment_method_enum")
SqlPaymentStatusEnum = Enum(PaymentStatusEnum, name="payment_status_enum")
SqlIncludedServicesEnum = Enum(IncludedServicesEnum, name="included_services_enum")

from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    EMPLOYEE = "employee"
    USER = "user"

class Permission(str, Enum):
    # Permisos de usuarios
    CREATE_USER = "create_user"
    READ_USER = "read_user"
    UPDATE_USER = "update_user"
    DELETE_USER = "delete_user"
    
    # Permisos de empleados
    CREATE_EMPLOYEE = "create_employee"
    READ_EMPLOYEE = "read_employee"
    UPDATE_EMPLOYEE = "update_employee"
    DELETE_EMPLOYEE = "delete_employee"
    
    # Permisos de mascotas
    CREATE_PET = "create_pet"
    READ_PET = "read_pet"
    UPDATE_PET = "update_pet"
    DELETE_PET = "delete_pet"
    
    # Permisos de reservas
    CREATE_RESERVATION = "create_reservation"
    READ_RESERVATION = "read_reservation"
    UPDATE_RESERVATION = "update_reservation"
    DELETE_RESERVATION = "delete_reservation"
    
    # Permisos de servicios
    CREATE_SERVICE = "create_service"
    READ_SERVICE = "read_service"
    UPDATE_SERVICE = "update_service"
    DELETE_SERVICE = "delete_service"
    
    # Permisos de historial médico
    CREATE_MEDICAL_HISTORY = "create_medical_history"
    READ_MEDICAL_HISTORY = "read_medical_history"
    UPDATE_MEDICAL_HISTORY = "update_medical_history"
    DELETE_MEDICAL_HISTORY = "delete_medical_history"
    
    # Permisos de facturas
    CREATE_INVOICE = "create_invoice"
    READ_INVOICE = "read_invoice"
    UPDATE_INVOICE = "update_invoice"
    DELETE_INVOICE = "delete_invoice"
    
    # Permisos de pagos
    CREATE_PAYMENT = "create_payment"
    READ_PAYMENT = "read_payment"
    UPDATE_PAYMENT = "update_payment"
    DELETE_PAYMENT = "delete_payment"
    
    # Permisos de exportación
    EXPORT_DATA = "export_data"
    
    # Permisos de sistema
    MANAGE_ROLES = "manage_roles"
    VIEW_LOGS = "view_logs"
    SYSTEM_CONFIG = "system_config"

# Mapeo de roles a permisos
ROLE_PERMISSIONS = {
    UserRole.ADMIN: [
        # Usuarios
        Permission.CREATE_USER, Permission.READ_USER, Permission.UPDATE_USER, Permission.DELETE_USER,
        # Empleados
        Permission.CREATE_EMPLOYEE, Permission.READ_EMPLOYEE, Permission.UPDATE_EMPLOYEE, Permission.DELETE_EMPLOYEE,
        # Mascotas
        Permission.CREATE_PET, Permission.READ_PET, Permission.UPDATE_PET, Permission.DELETE_PET,
        # Reservas
        Permission.CREATE_RESERVATION, Permission.READ_RESERVATION, Permission.UPDATE_RESERVATION, Permission.DELETE_RESERVATION,
        # Servicios
        Permission.CREATE_SERVICE, Permission.READ_SERVICE, Permission.UPDATE_SERVICE, Permission.DELETE_SERVICE,
        # Historial médico
        Permission.CREATE_MEDICAL_HISTORY, Permission.READ_MEDICAL_HISTORY, Permission.UPDATE_MEDICAL_HISTORY, Permission.DELETE_MEDICAL_HISTORY,
        # Facturas
        Permission.CREATE_INVOICE, Permission.READ_INVOICE, Permission.UPDATE_INVOICE, Permission.DELETE_INVOICE,
        # Pagos
        Permission.CREATE_PAYMENT, Permission.READ_PAYMENT, Permission.UPDATE_PAYMENT, Permission.DELETE_PAYMENT,
        # Exportación
        Permission.EXPORT_DATA,
        # Sistema
        Permission.MANAGE_ROLES, Permission.VIEW_LOGS, Permission.SYSTEM_CONFIG
    ],
    
    UserRole.EMPLOYEE: [
        # Mascotas (solo lectura de todas, CRUD de las asignadas)
        Permission.READ_PET, Permission.CREATE_PET, Permission.UPDATE_PET,
        # Reservas
        Permission.CREATE_RESERVATION, Permission.READ_RESERVATION, Permission.UPDATE_RESERVATION,
        # Servicios
        Permission.READ_SERVICE, Permission.UPDATE_SERVICE,
        # Historial médico
        Permission.CREATE_MEDICAL_HISTORY, Permission.READ_MEDICAL_HISTORY, Permission.UPDATE_MEDICAL_HISTORY,
        # Facturas
        Permission.CREATE_INVOICE, Permission.READ_INVOICE, Permission.UPDATE_INVOICE,
        # Pagos
        Permission.CREATE_PAYMENT, Permission.READ_PAYMENT, Permission.UPDATE_PAYMENT,
        # Exportación limitada
        Permission.EXPORT_DATA
    ],
    
    UserRole.USER: [
        # Solo sus propias mascotas
        Permission.READ_PET, Permission.CREATE_PET, Permission.UPDATE_PET,
        # Solo sus reservas
        Permission.CREATE_RESERVATION, Permission.READ_RESERVATION, Permission.UPDATE_RESERVATION,
        # Solo ver servicios
        Permission.READ_SERVICE,
        # Solo ver su historial médico
        Permission.READ_MEDICAL_HISTORY,
        # Solo sus facturas
        Permission.READ_INVOICE,
        # Solo sus pagos
        Permission.READ_PAYMENT, Permission.CREATE_PAYMENT
    ]
}