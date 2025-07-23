from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Optional

from backend.services.csv_export_service import CSVExportService
from backend.exceptions.custom_exceptions import BadRequestException, NotFoundException
from backend.logger.logger import logger

class ExportController:
    
    @staticmethod
    async def export_users_csv_controller(
        db: AsyncSession, 
        filters: Optional[Dict] = None
    ) -> bytes:
        try:
            logger.info("Starting users CSV export")
            csv_content = await CSVExportService.export_users_to_csv(db, filters)
            logger.info("Users CSV export completed successfully")
            return csv_content
        except Exception as e:
            logger.error(f"Error in users export controller: {str(e)}")
            raise BadRequestException("Error exporting users")
    
    @staticmethod
    async def export_pets_csv_controller(
        db: AsyncSession, 
        filters: Optional[Dict] = None
    ) -> bytes:
        try:
            logger.info("Starting pets CSV export")
            csv_content = await CSVExportService.export_pets_to_csv(db, filters)
            logger.info("Pets CSV export completed successfully")
            return csv_content
        except Exception as e:
            logger.error(f"Error in pets export controller: {str(e)}")
            raise BadRequestException("Error exporting pets")
    
    @staticmethod
    async def export_reservations_csv_controller(
        db: AsyncSession, 
        filters: Optional[Dict] = None
    ) -> bytes:
        try:
            logger.info("Starting reservations CSV export")
            csv_content = await CSVExportService.export_reservations_to_csv(db, filters)
            logger.info("Reservations CSV export completed successfully")
            return csv_content
        except Exception as e:
            logger.error(f"Error in reservations export controller: {str(e)}")
            raise BadRequestException("Error exporting reservations")
    
    @staticmethod
    async def export_services_csv_controller(
        db: AsyncSession, 
        filters: Optional[Dict] = None
    ) -> bytes:
        try:
            logger.info("Starting services CSV export")
            csv_content = await CSVExportService.export_services_to_csv(db, filters)
            logger.info("Services CSV export completed successfully")
            return csv_content
        except Exception as e:
            logger.error(f"Error in services export controller: {str(e)}")
            raise BadRequestException("Error exporting services")
    
    @staticmethod
    async def export_employees_csv_controller(
        db: AsyncSession, 
        filters: Optional[Dict] = None
    ) -> bytes:
        try:
            logger.info("Starting employees CSV export")
            csv_content = await CSVExportService.export_employees_to_csv(db, filters)
            logger.info("Employees CSV export completed successfully")
            return csv_content
        except Exception as e:
            logger.error(f"Error in employees export controller: {str(e)}")
            raise BadRequestException("Error exporting employees")
    
    @staticmethod
    async def export_invoices_csv_controller(
        db: AsyncSession, 
        filters: Optional[Dict] = None
    ) -> bytes:
        try:
            logger.info("Starting invoices CSV export")
            csv_content = await CSVExportService.export_invoices_to_csv(db, filters)
            logger.info("Invoices CSV export completed successfully")
            return csv_content
        except Exception as e:
            logger.error(f"Error in invoices export controller: {str(e)}")
            raise BadRequestException("Error exporting invoices")
    
    @staticmethod
    async def export_payments_csv_controller(
        db: AsyncSession, 
        filters: Optional[Dict] = None
    ) -> bytes:
        try:
            logger.info("Starting payments CSV export")
            csv_content = await CSVExportService.export_payments_to_csv(db, filters)
            logger.info("Payments CSV export completed successfully")
            return csv_content
        except Exception as e:
            logger.error(f"Error in payments export controller: {str(e)}")
            raise BadRequestException("Error exporting payments")
    
    @staticmethod
    async def export_users_with_pets_csv_controller(
        db: AsyncSession, 
        filters: Optional[Dict] = None
    ) -> bytes:
        try:
            logger.info("Starting users with pets CSV export")
            csv_content = await CSVExportService.export_users_with_pets_csv(db, filters)
            logger.info("Users with pets CSV export completed successfully")
            return csv_content
        except Exception as e:
            logger.error(f"Error in users with pets export controller: {str(e)}")
            raise BadRequestException("Error exporting users with pets")
    
    @staticmethod
    async def export_reservations_with_details_csv_controller(
        db: AsyncSession, 
        filters: Optional[Dict] = None
    ) -> bytes:
        try:
            logger.info("Starting reservations with details CSV export")
            csv_content = await CSVExportService.export_reservations_with_details_csv(db, filters)
            logger.info("Reservations with details CSV export completed successfully")
            return csv_content
        except Exception as e:
            logger.error(f"Error in reservations with details export controller: {str(e)}")
            raise BadRequestException("Error exporting reservations with details")
    
    @staticmethod
    async def export_invoices_with_payments_csv_controller(
        db: AsyncSession, 
        filters: Optional[Dict] = None
    ) -> bytes:
        try:
            logger.info("Starting invoices with payments CSV export")
            csv_content = await CSVExportService.export_invoices_with_payments_csv(db, filters)
            logger.info("Invoices with payments CSV export completed successfully")
            return csv_content
        except Exception as e:
            logger.error(f"Error in invoices with payments export controller: {str(e)}")
            raise BadRequestException("Error exporting invoices with payments") 