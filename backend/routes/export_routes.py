from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, Dict, Any
import io

from backend.services.csv_export_service import CSVExportService
from backend.db.database import get_db
from backend.logger.logger import logger

router = APIRouter()

@router.get("/users/csv")
async def export_users_csv(
    db: AsyncSession = Depends(get_db),
    user_id: Optional[int] = Query(None, description="Filter by user ID"),
    email: Optional[str] = Query(None, description="Filter by email")
):
    try:
        filters = {}
        if user_id:
            filters["user_id"] = user_id
        if email:
            filters["email"] = email
            
        csv_content = await CSVExportService.export_users_to_csv(db, filters)
        
        return StreamingResponse(
            io.BytesIO(csv_content),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=users.csv"}
        )
    except Exception as e:
        logger.error(f"Error exporting users CSV: {str(e)}")
        raise HTTPException(status_code=500, detail="Error exporting users")

@router.get("/pets/csv")
async def export_pets_csv(
    db: AsyncSession = Depends(get_db),
    pet_id: Optional[int] = Query(None, description="Filter by pet ID"),
    user_id: Optional[int] = Query(None, description="Filter by user ID")
):
    try:
        filters = {}
        if pet_id:
            filters["pet_id"] = pet_id
        if user_id:
            filters["user_id"] = user_id
            
        csv_content = await CSVExportService.export_pets_to_csv(db, filters)
        
        return StreamingResponse(
            io.BytesIO(csv_content),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=pets.csv"}
        )
    except Exception as e:
        logger.error(f"Error exporting pets CSV: {str(e)}")
        raise HTTPException(status_code=500, detail="Error exporting pets")

@router.get("/reservations/csv")
async def export_reservations_csv(
    db: AsyncSession = Depends(get_db),
    reservation_id: Optional[int] = Query(None, description="Filter by reservation ID"),
    user_id: Optional[int] = Query(None, description="Filter by user ID"),
    status: Optional[str] = Query(None, description="Filter by status")
):
    try:
        filters = {}
        if reservation_id:
            filters["reservation_id"] = reservation_id
        if user_id:
            filters["user_id"] = user_id
        if status:
            filters["status"] = status
            
        csv_content = await CSVExportService.export_reservations_to_csv(db, filters)
        
        return StreamingResponse(
            io.BytesIO(csv_content),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=reservations.csv"}
        )
    except Exception as e:
        logger.error(f"Error exporting reservations CSV: {str(e)}")
        raise HTTPException(status_code=500, detail="Error exporting reservations")

@router.get("/services/csv")
async def export_services_csv(
    db: AsyncSession = Depends(get_db),
    service_id: Optional[int] = Query(None, description="Filter by service ID"),
    service_type: Optional[str] = Query(None, description="Filter by service type")
):
    try:
        filters = {}
        if service_id:
            filters["service_id"] = service_id
        if service_type:
            filters["service_type"] = service_type
            
        csv_content = await CSVExportService.export_services_to_csv(db, filters)
        
        return StreamingResponse(
            io.BytesIO(csv_content),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=services.csv"}
        )
    except Exception as e:
        logger.error(f"Error exporting services CSV: {str(e)}")
        raise HTTPException(status_code=500, detail="Error exporting services")

@router.get("/employees/csv")
async def export_employees_csv(
    db: AsyncSession = Depends(get_db),
    employee_id: Optional[int] = Query(None, description="Filter by employee ID"),
    position: Optional[str] = Query(None, description="Filter by position")
):
    try:
        filters = {}
        if employee_id:
            filters["employee_id"] = employee_id
        if position:
            filters["position"] = position
            
        csv_content = await CSVExportService.export_employees_to_csv(db, filters)
        
        return StreamingResponse(
            io.BytesIO(csv_content),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=employees.csv"}
        )
    except Exception as e:
        logger.error(f"Error exporting employees CSV: {str(e)}")
        raise HTTPException(status_code=500, detail="Error exporting employees")

@router.get("/invoices/csv")
async def export_invoices_csv(
    db: AsyncSession = Depends(get_db),
    invoice_id: Optional[int] = Query(None, description="Filter by invoice ID"),
    user_id: Optional[int] = Query(None, description="Filter by user ID")
):
    try:
        filters = {}
        if invoice_id:
            filters["invoice_id"] = invoice_id
        if user_id:
            filters["user_id"] = user_id
            
        csv_content = await CSVExportService.export_invoices_to_csv(db, filters)
        
        return StreamingResponse(
            io.BytesIO(csv_content),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=invoices.csv"}
        )
    except Exception as e:
        logger.error(f"Error exporting invoices CSV: {str(e)}")
        raise HTTPException(status_code=500, detail="Error exporting invoices")

@router.get("/payments/csv")
async def export_payments_csv(
    db: AsyncSession = Depends(get_db),
    payment_id: Optional[int] = Query(None, description="Filter by payment ID"),
    invoice_id: Optional[int] = Query(None, description="Filter by invoice ID")
):
    try:
        filters = {}
        if payment_id:
            filters["payment_id"] = payment_id
        if invoice_id:
            filters["invoice_id"] = invoice_id
            
        csv_content = await CSVExportService.export_payments_to_csv(db, filters)
        
        return StreamingResponse(
            io.BytesIO(csv_content),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=payments.csv"}
        )
    except Exception as e:
        logger.error(f"Error exporting payments CSV: {str(e)}")
        raise HTTPException(status_code=500, detail="Error exporting payments")

@router.get("/users-with-pets/csv")
async def export_users_with_pets_csv(
    db: AsyncSession = Depends(get_db),
    user_id: Optional[int] = Query(None, description="Filter by user ID")
):
    try:
        filters = {}
        if user_id:
            filters["user_id"] = user_id
            
        csv_content = await CSVExportService.export_users_with_pets_csv(db, filters)
        
        return StreamingResponse(
            io.BytesIO(csv_content),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=users_with_pets.csv"}
        )
    except Exception as e:
        logger.error(f"Error exporting users with pets CSV: {str(e)}")
        raise HTTPException(status_code=500, detail="Error exporting users with pets")

@router.get("/reservations-with-details/csv")
async def export_reservations_with_details_csv(
    db: AsyncSession = Depends(get_db),
    reservation_id: Optional[int] = Query(None, description="Filter by reservation ID"),
    status: Optional[str] = Query(None, description="Filter by status")
):
    try:
        filters = {}
        if reservation_id:
            filters["reservation_id"] = reservation_id
        if status:
            filters["status"] = status
            
        csv_content = await CSVExportService.export_reservations_with_details_csv(db, filters)
        
        return StreamingResponse(
            io.BytesIO(csv_content),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=reservations_with_details.csv"}
        )
    except Exception as e:
        logger.error(f"Error exporting reservations with details CSV: {str(e)}")
        raise HTTPException(status_code=500, detail="Error exporting reservations with details")

@router.get("/invoices-with-payments/csv")
async def export_invoices_with_payments_csv(
    db: AsyncSession = Depends(get_db),
    invoice_id: Optional[int] = Query(None, description="Filter by invoice ID")
):
    try:
        filters = {}
        if invoice_id:
            filters["invoice_id"] = invoice_id
            
        csv_content = await CSVExportService.export_invoices_with_payments_csv(db, filters)
        
        return StreamingResponse(
            io.BytesIO(csv_content),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=invoices_with_payments.csv"}
        )
    except Exception as e:
        logger.error(f"Error exporting invoices with payments CSV: {str(e)}")
        raise HTTPException(status_code=500, detail="Error exporting invoices with payments")

@router.get("/all/csv")
async def export_all_data_csv(
    db: AsyncSession = Depends(get_db),
    entity: str = Query(..., description="Entity to export: users, pets, reservations, services, employees, invoices, payments")
):
    try:
        export_functions = {
            "users": CSVExportService.export_users_to_csv,
            "pets": CSVExportService.export_pets_to_csv,
            "reservations": CSVExportService.export_reservations_to_csv,
            "services": CSVExportService.export_services_to_csv,
            "employees": CSVExportService.export_employees_to_csv,
            "invoices": CSVExportService.export_invoices_to_csv,
            "payments": CSVExportService.export_payments_to_csv
        }
        
        if entity not in export_functions:
            raise HTTPException(status_code=400, detail=f"Invalid entity '{entity}'")
            
        csv_content = await export_functions[entity](db)
        
        return StreamingResponse(
            io.BytesIO(csv_content),
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename={entity}.csv"}
        )
    except Exception as e:
        logger.error(f"Error exporting {entity} CSV: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error exporting {entity}") 