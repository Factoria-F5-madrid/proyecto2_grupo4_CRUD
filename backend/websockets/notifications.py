from typing import Dict, Any, Optional
from .manager import manager
import json
from datetime import datetime


class NotificationService:
    """Servicio para manejar notificaciones en tiempo real"""
    
    @staticmethod
    async def send_user_notification(user_id: str, notification_type: str, data: dict):
        """Enviar notificación a un usuario específico"""
        await manager.send_notification(user_id, notification_type, data)
    
    @staticmethod
    async def send_pet_update(action: str, pet_data: dict):
        """Enviar actualización de mascota en tiempo real"""
        await manager.send_realtime_update("pets", action, pet_data)
    
    @staticmethod
    async def send_reservation_update(action: str, reservation_data: dict):
        """Enviar actualización de reserva en tiempo real"""
        await manager.send_realtime_update("reservations", action, reservation_data)
    
    @staticmethod
    async def send_payment_update(action: str, payment_data: dict):
        """Enviar actualización de pago en tiempo real"""
        await manager.send_realtime_update("payments", action, payment_data)
    
    @staticmethod
    async def send_invoice_update(action: str, invoice_data: dict):
        """Enviar actualización de factura en tiempo real"""
        await manager.send_realtime_update("invoices", action, invoice_data)
    
    @staticmethod
    async def send_medical_history_update(action: str, medical_data: dict):
        """Enviar actualización de historial médico en tiempo real"""
        await manager.send_realtime_update("medical_history", action, medical_data)
    
    @staticmethod
    async def send_service_update(action: str, service_data: dict):
        """Enviar actualización de servicio en tiempo real"""
        await manager.send_realtime_update("services", action, service_data)
    
    @staticmethod
    async def send_employee_update(action: str, employee_data: dict):
        """Enviar actualización de empleado en tiempo real"""
        await manager.send_realtime_update("employees", action, employee_data)
    
    @staticmethod
    async def send_activity_log_update(action: str, activity_data: dict):
        """Enviar actualización de log de actividad en tiempo real"""
        await manager.send_realtime_update("activity_logs", action, activity_data)
    
    @staticmethod
    async def send_system_notification(message: str, notification_type: str = "info"):
        """Enviar notificación del sistema a todos los usuarios"""
        notification_data = {
            "message": message,
            "type": notification_type,
            "timestamp": datetime.now().isoformat()
        }
        await manager.broadcast_to_channel(
            json.dumps({
                "type": "system_notification",
                "data": notification_data
            }), 
            "users"
        )
    
    @staticmethod
    async def send_error_notification(user_id: str, error_message: str):
        """Enviar notificación de error a un usuario específico"""
        await manager.send_notification(user_id, "error", {
            "message": error_message,
            "timestamp": datetime.now().isoformat()
        })
    
    @staticmethod
    async def send_success_notification(user_id: str, success_message: str):
        """Enviar notificación de éxito a un usuario específico"""
        await manager.send_notification(user_id, "success", {
            "message": success_message,
            "timestamp": datetime.now().isoformat()
        })


# Instancia global del servicio de notificaciones
notification_service = NotificationService() 