import pandas as pd
import io
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import inspect, join
from datetime import datetime

from backend.logger.logger import logger

class CSVExportService:
    
    @staticmethod
    async def export_model_to_csv(
        db: AsyncSession, 
        model_class, 
        filename: str = None,
        filters: Dict = None
    ) -> bytes:
        """
        Export any model to CSV format
        
        Args:
            db: Database session
            model_class: SQLAlchemy model class
            filename: Optional filename
            filters: Optional query filters
        
        Returns:
            bytes: CSV file content
        """
        try:
            query = select(model_class)
            
            if filters:
                for field, value in filters.items():
                    if hasattr(model_class, field):
                        query = query.where(getattr(model_class, field) == value)
            
            result = await db.execute(query)
            records = result.scalars().all()
            
            data = []
            for record in records:
                record_dict = {}
                for column in inspect(model_class).columns:
                    value = getattr(record, column.name)
                    if isinstance(value, datetime):
                        value = value.isoformat()
                    record_dict[column.name] = value
                data.append(record_dict)
            
            df = pd.DataFrame(data)
            csv_buffer = io.StringIO()
            df.to_csv(csv_buffer, index=False, encoding='utf-8')
            
            logger.info(f"CSV exported successfully: {len(records)} records")
            return csv_buffer.getvalue().encode('utf-8')
            
        except Exception as e:
            logger.error(f"Error exporting CSV: {str(e)}")
            raise
    
    @staticmethod
    async def export_users_with_pets_csv(db: AsyncSession, filters: Dict = None) -> bytes:
        """Export users with their pets information"""
        try:
            from backend.models.user_models import User
            from backend.models.pet_models import Pet
            
            query = select(User, Pet).join(Pet, User.user_id == Pet.user_id, isouter=True)
            
            if filters:
                for field, value in filters.items():
                    if hasattr(User, field):
                        query = query.where(getattr(User, field) == value)
            
            result = await db.execute(query)
            records = result.all()
            
            data = []
            for user, pet in records:
                record_dict = {
                    'user_id': user.user_id,
                    'user_first_name': user.first_name,
                    'user_last_name': user.last_name,
                    'user_email': user.email,
                    'user_phone': user.phone_number,
                    'pet_id': pet.pet_id if pet else None,
                    'pet_name': pet.name if pet else None,
                    'pet_species': pet.species if pet else None,
                    'pet_breed': pet.breed if pet else None
                }
                data.append(record_dict)
            
            df = pd.DataFrame(data)
            csv_buffer = io.StringIO()
            df.to_csv(csv_buffer, index=False, encoding='utf-8')
            
            logger.info(f"Users with pets CSV exported successfully: {len(records)} records")
            return csv_buffer.getvalue().encode('utf-8')
            
        except Exception as e:
            logger.error(f"Error exporting users with pets CSV: {str(e)}")
            raise
    
    @staticmethod
    async def export_reservations_with_details_csv(db: AsyncSession, filters: Dict = None) -> bytes:
        """Export reservations with user and service details"""
        try:
            from backend.models.reservation_models import Reservation
            from backend.models.user_models import User
            from backend.models.service_models import Service
            
            query = select(Reservation, User, Service).join(
                User, Reservation.user_id == User.user_id
            ).join(
                Service, Reservation.service_id == Service.service_id
            )
            
            if filters:
                for field, value in filters.items():
                    if hasattr(Reservation, field):
                        query = query.where(getattr(Reservation, field) == value)
            
            result = await db.execute(query)
            records = result.all()
            
            data = []
            for reservation, user, service in records:
                record_dict = {
                    'reservation_id': reservation.reservation_id,
                    'user_name': f"{user.first_name} {user.last_name}",
                    'user_email': user.email,
                    'service_type': service.service_type,
                    'service_price': service.base_price,
                    'checkin_date': reservation.checkin_date.isoformat() if reservation.checkin_date else None,
                    'checkout_date': reservation.checkout_date.isoformat() if reservation.checkout_date else None,
                    'status': reservation.status
                }
                data.append(record_dict)
            
            df = pd.DataFrame(data)
            csv_buffer = io.StringIO()
            df.to_csv(csv_buffer, index=False, encoding='utf-8')
            
            logger.info(f"Reservations with details CSV exported successfully: {len(records)} records")
            return csv_buffer.getvalue().encode('utf-8')
            
        except Exception as e:
            logger.error(f"Error exporting reservations with details CSV: {str(e)}")
            raise
    
    @staticmethod
    async def export_invoices_with_payments_csv(db: AsyncSession, filters: Dict = None) -> bytes:
        """Export invoices with payment information"""
        try:
            from backend.models.invoice_models import Invoice
            from backend.models.payment_models import Payment
            
            query = select(Invoice, Payment).join(Payment, Invoice.invoice_id == Payment.invoice_id, isouter=True)
            
            if filters:
                for field, value in filters.items():
                    if hasattr(Invoice, field):
                        query = query.where(getattr(Invoice, field) == value)
            
            result = await db.execute(query)
            records = result.all()
            
            data = []
            for invoice, payment in records:
                record_dict = {
                    'invoice_id': invoice.invoice_id,
                    'fiscal_number': invoice.fiscal_number,
                    'base_price': invoice.base_price if hasattr(invoice, 'base_price') else None,
                    'additional_price': invoice.additional_price,
                    'vat': invoice.vat,
                    'total_amount': payment.amount if payment else None,
                    'payment_method': payment.payment_method if payment else None,
                    'payment_status': payment.payment_status if payment else None,
                    'completed': invoice.completed
                }
                data.append(record_dict)
            
            df = pd.DataFrame(data)
            csv_buffer = io.StringIO()
            df.to_csv(csv_buffer, index=False, encoding='utf-8')
            
            logger.info(f"Invoices with payments CSV exported successfully: {len(records)} records")
            return csv_buffer.getvalue().encode('utf-8')
            
        except Exception as e:
            logger.error(f"Error exporting invoices with payments CSV: {str(e)}")
            raise
    
    @staticmethod
    async def export_users_to_csv(db: AsyncSession, filters: Dict = None) -> bytes:
        from backend.models.user_models import User
        return await CSVExportService.export_model_to_csv(db, User, "users.csv", filters)
    
    @staticmethod
    async def export_pets_to_csv(db: AsyncSession, filters: Dict = None) -> bytes:
        from backend.models.pet_models import Pet
        return await CSVExportService.export_model_to_csv(db, Pet, "pets.csv", filters)
    
    @staticmethod
    async def export_reservations_to_csv(db: AsyncSession, filters: Dict = None) -> bytes:
        from backend.models.reservation_models import Reservation
        return await CSVExportService.export_model_to_csv(db, Reservation, "reservations.csv", filters)
    
    @staticmethod
    async def export_services_to_csv(db: AsyncSession, filters: Dict = None) -> bytes:
        from backend.models.service_models import Service
        return await CSVExportService.export_model_to_csv(db, Service, "services.csv", filters)
    
    @staticmethod
    async def export_employees_to_csv(db: AsyncSession, filters: Dict = None) -> bytes:
        from backend.models.employee_models import Employee
        return await CSVExportService.export_model_to_csv(db, Employee, "employees.csv", filters)
    
    @staticmethod
    async def export_invoices_to_csv(db: AsyncSession, filters: Dict = None) -> bytes:
        from backend.models.invoice_models import Invoice
        return await CSVExportService.export_model_to_csv(db, Invoice, "invoices.csv", filters)
    
    @staticmethod
    async def export_payments_to_csv(db: AsyncSession, filters: Dict = None) -> bytes:
        from backend.models.payment_models import Payment
        return await CSVExportService.export_model_to_csv(db, Payment, "payments.csv", filters) 