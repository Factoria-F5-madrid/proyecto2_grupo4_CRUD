from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from backend.schema.reservation_schema import ReservationCreate, ReservationOut, ReservationUpdate
from backend.controllers.reservation_controller import (
    create_reservation_controller,
    get_all_reservations_controller,
    get_reservation_by_id_controller,
    get_reservations_by_user_controller,
    get_reservations_by_service_controller,
    update_reservation_controller,
    delete_reservation_controller,
)
from backend.db.database import get_db
from backend.utils.auth_jwt import get_current_user
from backend.models.enums import UserRole

router = APIRouter()

@router.post("/", response_model=ReservationOut)
async def create_reservation(
    reservation_data: ReservationCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Crear una nueva reserva. El usuario solo puede crear reservas para sí mismo.
    """
    from backend.logger.logger import logger
    
    logger.info(f"Creando reserva para usuario: {current_user['email']} con user_id: {current_user['user_id']}")
    
    # Verificar que el usuario esté creando la reserva para sí mismo
    if reservation_data.user_id != current_user["user_id"]:
        logger.warning(f"Usuario {current_user['email']} intentó crear reserva para user_id {reservation_data.user_id}")
        raise HTTPException(status_code=403, detail="You can only create reservations for yourself")
    
    return await create_reservation_controller(reservation_data, db)

@router.get("/", response_model=List[ReservationOut])
async def get_all_reservations(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Obtiene reservas según el rol del usuario:
    - Admin/Employee: Todas las reservas
    - User: Solo sus propias reservas
    """
    from backend.logger.logger import logger
    
    logger.info(f"Endpoint /reservations/ llamado por usuario: {current_user['email']} con rol: {current_user['role']}")
    
    user_role = UserRole(current_user["role"])
    
    if user_role in [UserRole.ADMIN, UserRole.EMPLOYEE]:
        # Admin y Employee ven todas las reservas
        logger.info("Usuario es Admin/Employee - devolviendo todas las reservas")
        return await get_all_reservations_controller(db)
    else:
        # Usuario regular solo ve sus reservas
        user_id = current_user["user_id"]
        logger.info(f"Usuario regular - buscando reservas para user_id: {user_id}")
        reservations = await get_reservations_by_user_controller(user_id, db)
        logger.info(f"Reservas encontradas para usuario {user_id}: {len(reservations)}")
        return reservations

@router.get("/{reservation_id}", response_model=ReservationOut)
async def get_reservation_by_id(reservation_id: int, db: AsyncSession = Depends(get_db)):
    reservation = await get_reservation_by_id_controller(reservation_id, db)
    if reservation is None:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return reservation

@router.get("/user/{user_id}", response_model=List[ReservationOut])
async def get_reservations_by_user(user_id: int, db: AsyncSession = Depends(get_db)):
    return await get_reservations_by_user_controller(user_id, db)

@router.get("/service/{service_id}", response_model=List[ReservationOut])
async def get_reservations_by_service(service_id: int, db: AsyncSession = Depends(get_db)):
    return await get_reservations_by_service_controller(service_id, db)

@router.put("/{reservation_id}", response_model=ReservationOut)
async def update_reservation(reservation_id: int, reservation_data: ReservationUpdate, db: AsyncSession = Depends(get_db)):
    updated_reservation = await update_reservation_controller(reservation_id, reservation_data, db)
    if updated_reservation is None:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return updated_reservation

@router.delete("/{reservation_id}")
async def delete_reservation(reservation_id: int, db: AsyncSession = Depends(get_db)):
    result = await delete_reservation_controller(reservation_id, db)
    if not result:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return {"detail": f"Reservation with ID {reservation_id} deleted successfully"}