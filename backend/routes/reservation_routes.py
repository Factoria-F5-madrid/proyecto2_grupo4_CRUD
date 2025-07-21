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

router = APIRouter()

@router.post("/", response_model=ReservationOut)
async def create_reservation(reservation_data: ReservationCreate, db: AsyncSession = Depends(get_db)):
    return await create_reservation_controller(reservation_data, db)

@router.get("/", response_model=List[ReservationOut])
async def get_all_reservations(db: AsyncSession = Depends(get_db)):
    return await get_all_reservations_controller(db)

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