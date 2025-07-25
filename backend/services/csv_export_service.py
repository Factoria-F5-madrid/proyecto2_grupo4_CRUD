import pandas as pd
import io
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import Dict, Any, Optional
from datetime import datetime

from backend.models.user_models import User
from backend.models.pet_models import Pet
from backend.models.reservation_models import Reservation
from backend.models.service_models import Service
from backend.models.employee_models import Employee
from backend.models.invoice_models import Invoice
from backend.models.payment_models import Payment
from backend.logger.logger import logger


class CSVExportService:
    """Servicio para exportar datos a formato CSV"""
    
    @staticmethod
    async def export_users_to_csv(db: AsyncSession, filters: Dict[str, Any] = None) -> bytes:
        """Exportar usuarios a CSV"""
        try:
            query = select(User)
            
            if filters:
                if "user_id" in filters:
                    query = query.where(User.user_id == filters["user_id"])
                if "email" in filters:
                    query = query.where(User.email == filters["email"])
            
            result = await db.execute(query)
            users = result.scalars().all()
            
            # Convertir a DataFrame
            data = []
            for user in users:
                data.append({
                    "user_id": user.user_id,
                    "name": user.name,
                    "email": user.email,
                    "phone": user.phone,
                    "address": user.address,
                    "created_at": user.created_at.isoformat() if user.created_at else None,
                    "updated_at": user.updated_at.isoformat() if user.updated_at else None
                })
            
            df = pd.DataFrame(data)
            output = io.BytesIO()
            df.to_csv(output, index=False, encoding='utf-8')
            return output.getvalue()
            
        except Exception as e:
            logger.error(f"Error exporting users to CSV: {str(e)}")
            raise
    
    @staticmethod
    async def export_pets_to_csv(db: AsyncSession, filters: Dict[str, Any] = None) -> bytes:
        """Exportar mascotas a CSV"""
        try:
            query = select(Pet)
            
            if filters:
                if "pet_id" in filters:
                    query = query.where(Pet.pet_id == filters["pet_id"])
                if "user_id" in filters:
                    query = query.where(Pet.user_id == filters["user_id"])
            
            result = await db.execute(query)
            pets = result.scalars().all()
            
            # Convertir a DataFrame
            data = []
            for pet in pets:
                data.append({
                    "pet_id": pet.pet_id,
                    "name": pet.name,
                    "species": pet.species,
                    "breed": pet.breed,
                    "birth_date": pet.birth_date.isoformat() if pet.birth_date else None,
                    "user_id": pet.user_id,
                    "created_at": pet.created_at.isoformat() if pet.created_at else None,
                    "updated_at": pet.updated_at.isoformat() if pet.updated_at else None
                })
            
            df = pd.DataFrame(data)
            output = io.BytesIO()
            df.to_csv(output, index=False, encoding='utf-8')
            return output.getvalue()
            
        except Exception as e:
            logger.error(f"Error exporting pets to CSV: {str(e)}")
            raise
    
    @staticmethod
    async def export_reservations_to_csv(db: AsyncSession, filters: Dict[str, Any] = None) -> bytes:
        """Exportar reservas a CSV"""
        try:
            query = select(Reservation)
            
            if filters:
                if "reservation_id" in filters:
                    query = query.where(Reservation.reservation_id == filters["reservation_id"])
                if "user_id" in filters:
                    query = query.where(Reservation.user_id == filters["user_id"])
                if "status" in filters:
                    query = query.where(Reservation.status == filters["status"])
            
            result = await db.execute(query)
            reservations = result.scalars().all()
            
            # Convertir a DataFrame
            data = []
            for reservation in reservations:
                data.append({
                    "reservation_id": reservation.reservation_id,
                    "user_id": reservation.user_id,
                    "service_id": reservation.service_id,
                    "checkin_date": reservation.checkin_date.isoformat() if reservation.checkin_date else None,
                    "checkout_date": reservation.checkout_date.isoformat() if reservation.checkout_date else None,
                    "status": reservation.status,
                    "notes": reservation.notes,
                    "created_at": reservation.created_at.isoformat() if reservation.created_at else None,
                    "updated_at": reservation.updated_at.isoformat() if reservation.updated_at else None
                })
            
            df = pd.DataFrame(data)
            output = io.BytesIO()
            df.to_csv(output, index=False, encoding='utf-8')
            return output.getvalue()
            
        except Exception as e:
            logger.error(f"Error exporting reservations to CSV: {str(e)}")
            raise
    
    @staticmethod
    async def export_services_to_csv(db: AsyncSession, filters: Dict[str, Any] = None) -> bytes:
        """Exportar servicios a CSV"""
        try:
            query = select(Service)
            
            if filters:
                if "service_id" in filters:
                    query = query.where(Service.service_id == filters["service_id"])
                if "service_type" in filters:
                    query = query.where(Service.service_type == filters["service_type"])
            
            result = await db.execute(query)
            services = result.scalars().all()
            
            # Convertir a DataFrame
            data = []
            for service in services:
                data.append({
                    "service_id": service.service_id,
                    "name": service.name,
                    "description": service.description,
                    "price": service.price,
                    "service_type": service.service_type,
                    "duration": service.duration,
                    "created_at": service.created_at.isoformat() if service.created_at else None,
                    "updated_at": service.updated_at.isoformat() if service.updated_at else None
                })
            
            df = pd.DataFrame(data)
            output = io.BytesIO()
            df.to_csv(output, index=False, encoding='utf-8')
            return output.getvalue()
            
        except Exception as e:
            logger.error(f"Error exporting services to CSV: {str(e)}")
            raise
    
    @staticmethod
    async def export_employees_to_csv(db: AsyncSession, filters: Dict[str, Any] = None) -> bytes:
        """Exportar empleados a CSV"""
        try:
            query = select(Employee)
            
            if filters:
                if "employee_id" in filters:
                    query = query.where(Employee.employee_id == filters["employee_id"])
                if "position" in filters:
                    query = query.where(Employee.position == filters["position"])
            
            result = await db.execute(query)
            employees = result.scalars().all()
            
            # Convertir a DataFrame
            data = []
            for employee in employees:
                data.append({
                    "employee_id": employee.employee_id,
                    "name": employee.name,
                    "email": employee.email,
                    "phone": employee.phone,
                    "position": employee.position,
                    "hire_date": employee.hire_date.isoformat() if employee.hire_date else None,
                    "salary": employee.salary,
                    "created_at": employee.created_at.isoformat() if employee.created_at else None,
                    "updated_at": employee.updated_at.isoformat() if employee.updated_at else None
                })
            
            df = pd.DataFrame(data)
            output = io.BytesIO()
            df.to_csv(output, index=False, encoding='utf-8')
            return output.getvalue()
            
        except Exception as e:
            logger.error(f"Error exporting employees to CSV: {str(e)}")
            raise
    
    @staticmethod
    async def export_invoices_to_csv(db: AsyncSession, filters: Dict[str, Any] = None) -> bytes:
        """Exportar facturas a CSV"""
        try:
            query = select(Invoice)
            
            if filters:
                if "invoice_id" in filters:
                    query = query.where(Invoice.invoice_id == filters["invoice_id"])
                if "user_id" in filters:
                    query = query.where(Invoice.user_id == filters["user_id"])
            
            result = await db.execute(query)
            invoices = result.scalars().all()
            
            # Convertir a DataFrame
            data = []
            for invoice in invoices:
                data.append({
                    "invoice_id": invoice.invoice_id,
                    "user_id": invoice.user_id,
                    "total_amount": invoice.total_amount,
                    "status": invoice.status,
                    "issue_date": invoice.issue_date.isoformat() if invoice.issue_date else None,
                    "due_date": invoice.due_date.isoformat() if invoice.due_date else None,
                    "created_at": invoice.created_at.isoformat() if invoice.created_at else None,
                    "updated_at": invoice.updated_at.isoformat() if invoice.updated_at else None
                })
            
            df = pd.DataFrame(data)
            output = io.BytesIO()
            df.to_csv(output, index=False, encoding='utf-8')
            return output.getvalue()
            
        except Exception as e:
            logger.error(f"Error exporting invoices to CSV: {str(e)}")
            raise
    
    @staticmethod
    async def export_payments_to_csv(db: AsyncSession, filters: Dict[str, Any] = None) -> bytes:
        """Exportar pagos a CSV"""
        try:
            query = select(Payment)
            
            if filters:
                if "payment_id" in filters:
                    query = query.where(Payment.payment_id == filters["payment_id"])
                if "invoice_id" in filters:
                    query = query.where(Payment.invoice_id == filters["invoice_id"])
            
            result = await db.execute(query)
            payments = result.scalars().all()
            
            # Convertir a DataFrame
            data = []
            for payment in payments:
                data.append({
                    "payment_id": payment.payment_id,
                    "invoice_id": payment.invoice_id,
                    "amount": payment.amount,
                    "payment_method": payment.payment_method,
                    "payment_date": payment.payment_date.isoformat() if payment.payment_date else None,
                    "status": payment.status,
                    "created_at": payment.created_at.isoformat() if payment.created_at else None,
                    "updated_at": payment.updated_at.isoformat() if payment.updated_at else None
                })
            
            df = pd.DataFrame(data)
            output = io.BytesIO()
            df.to_csv(output, index=False, encoding='utf-8')
            return output.getvalue()
            
        except Exception as e:
            logger.error(f"Error exporting payments to CSV: {str(e)}")
            raise
    
    @staticmethod
    async def export_users_with_pets_to_csv(db: AsyncSession, filters: Dict[str, Any] = None) -> bytes:
        """Exportar usuarios con sus mascotas a CSV"""
        try:
            query = select(User, Pet).join(Pet, User.user_id == Pet.user_id, isouter=True)
            
            if filters and "user_id" in filters:
                query = query.where(User.user_id == filters["user_id"])
            
            result = await db.execute(query)
            rows = result.all()
            
            # Convertir a DataFrame
            data = []
            for user, pet in rows:
                data.append({
                    "user_id": user.user_id,
                    "user_name": user.name,
                    "user_email": user.email,
                    "pet_id": pet.pet_id if pet else None,
                    "pet_name": pet.name if pet else None,
                    "pet_species": pet.species if pet else None,
                    "pet_breed": pet.breed if pet else None,
                    "pet_birth_date": pet.birth_date.isoformat() if pet and pet.birth_date else None
                })
            
            df = pd.DataFrame(data)
            output = io.BytesIO()
            df.to_csv(output, index=False, encoding='utf-8')
            return output.getvalue()
            
        except Exception as e:
            logger.error(f"Error exporting users with pets to CSV: {str(e)}")
            raise
    
    @staticmethod
    async def export_reservations_with_details_to_csv(db: AsyncSession, filters: Dict[str, Any] = None) -> bytes:
        """Exportar reservas con detalles a CSV"""
        try:
            query = select(Reservation, User, Service).join(
                User, Reservation.user_id == User.user_id
            ).join(
                Service, Reservation.service_id == Service.service_id
            )
            
            if filters:
                if "reservation_id" in filters:
                    query = query.where(Reservation.reservation_id == filters["reservation_id"])
                if "status" in filters:
                    query = query.where(Reservation.status == filters["status"])
            
            result = await db.execute(query)
            rows = result.all()
            
            # Convertir a DataFrame
            data = []
            for reservation, user, service in rows:
                data.append({
                    "reservation_id": reservation.reservation_id,
                    "user_name": user.name,
                    "user_email": user.email,
                    "service_name": service.name,
                    "service_type": service.service_type,
                    "checkin_date": reservation.checkin_date.isoformat() if reservation.checkin_date else None,
                    "checkout_date": reservation.checkout_date.isoformat() if reservation.checkout_date else None,
                    "status": reservation.status,
                    "notes": reservation.notes
                })
            
            df = pd.DataFrame(data)
            output = io.BytesIO()
            df.to_csv(output, index=False, encoding='utf-8')
            return output.getvalue()
            
        except Exception as e:
            logger.error(f"Error exporting reservations with details to CSV: {str(e)}")
            raise
    
    @staticmethod
    async def export_invoices_with_payments_to_csv(db: AsyncSession, filters: Dict[str, Any] = None) -> bytes:
        """Exportar facturas con pagos a CSV"""
        try:
            query = select(Invoice, User, Payment).join(
                User, Invoice.user_id == User.user_id
            ).join(
                Payment, Invoice.invoice_id == Payment.invoice_id, isouter=True
            )
            
            if filters and "invoice_id" in filters:
                query = query.where(Invoice.invoice_id == filters["invoice_id"])
            
            result = await db.execute(query)
            rows = result.all()
            
            # Convertir a DataFrame
            data = []
            for invoice, user, payment in rows:
                data.append({
                    "invoice_id": invoice.invoice_id,
                    "user_name": user.name,
                    "user_email": user.email,
                    "total_amount": invoice.total_amount,
                    "invoice_status": invoice.status,
                    "payment_id": payment.payment_id if payment else None,
                    "payment_amount": payment.amount if payment else None,
                    "payment_method": payment.payment_method if payment else None,
                    "payment_status": payment.status if payment else None
                })
            
            df = pd.DataFrame(data)
            output = io.BytesIO()
            df.to_csv(output, index=False, encoding='utf-8')
            return output.getvalue()
            
        except Exception as e:
            logger.error(f"Error exporting invoices with payments to CSV: {str(e)}")
            raise
    
    @staticmethod
    async def export_all_data_to_csv(db: AsyncSession, entity: str) -> bytes:
        """Exportar todos los datos de una entidad específica a CSV"""
        try:
            if entity == "users":
                return await CSVExportService.export_users_to_csv(db)
            elif entity == "pets":
                return await CSVExportService.export_pets_to_csv(db)
            elif entity == "reservations":
                return await CSVExportService.export_reservations_to_csv(db)
            elif entity == "services":
                return await CSVExportService.export_services_to_csv(db)
            elif entity == "employees":
                return await CSVExportService.export_employees_to_csv(db)
            elif entity == "invoices":
                return await CSVExportService.export_invoices_to_csv(db)
            elif entity == "payments":
                return await CSVExportService.export_payments_to_csv(db)
            else:
                raise ValueError(f"Entidad no válida: {entity}")
                
        except Exception as e:
            logger.error(f"Error exporting {entity} to CSV: {str(e)}")
            raise 