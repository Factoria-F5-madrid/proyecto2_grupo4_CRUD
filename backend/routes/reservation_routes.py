from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from backend.schema.reservation_schema import ReservationCreate, ReservationUpdate, ReservationOut
from backend.models.reservation_models import Reservation
from backend.db.database import get_db

router = APIRouter()

@router.post("/", response_model=ReservationOut, status_code=status.HTTP_201_CREATED)
async def create_new_reservation(
    reservation: ReservationCreate, 
    db: AsyncSession = Depends(AsyncSession)
):
    new_reservation = await create_reservation(db, reservation)
    return new_reservation
