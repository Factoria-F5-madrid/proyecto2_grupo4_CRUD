from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException

from backend.models.reservation_models import Reservation
from backend.models.user_models import User
from backend.models.service_models import Service
from backend.schema.reservation_schema import ReservationCreate, ReservationUpdate, ReservationOut

async def create_reservation_controller(reservation_data: ReservationCreate, db: AsyncSession):
   
    user_result = await db.execute(select(User).where(User.user_id == reservation_data.user_id))
    user = user_result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
  
    service_result = await db.execute(select(Service).where(Service.service_id == reservation_data.service_id))
    service = service_result.scalar_one_or_none()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
  
    if reservation_data.checkin_date >= reservation_data.checkout_date:
        raise HTTPException(status_code=400, detail="Check-in date must be before check-out date")
    
   
    new_reservation = Reservation(**reservation_data.dict())
    db.add(new_reservation)
    await db.commit()
    await db.refresh(new_reservation)
    return new_reservation

async def get_all_reservations_controller(db: AsyncSession):
    result = await db.execute(select(Reservation))
    return result.scalars().all()

async def get_reservation_by_id_controller(reservation_id: int, db: AsyncSession):
    result = await db.execute(select(Reservation).where(Reservation.reservation_id == reservation_id))
    reservation = result.scalar_one_or_none()
    if reservation is None:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return reservation

async def get_reservations_by_user_controller(user_id: int, db: AsyncSession):
    result = await db.execute(select(Reservation).where(Reservation.user_id == user_id))
    return result.scalars().all()

async def get_reservations_by_service_controller(service_id: int, db: AsyncSession):
    result = await db.execute(select(Reservation).where(Reservation.service_id == service_id))
    return result.scalars().all()

async def update_reservation_controller(reservation_id: int, reservation_data: ReservationUpdate, db: AsyncSession):
    result = await db.execute(select(Reservation).where(Reservation.reservation_id == reservation_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    
  
    if reservation_data.user_id is not None:
        user_result = await db.execute(select(User).where(User.user_id == reservation_data.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
    

    if reservation_data.service_id is not None:
        service_result = await db.execute(select(Service).where(Service.service_id == reservation_data.service_id))
        service = service_result.scalar_one_or_none()
        if not service:
            raise HTTPException(status_code=404, detail="Service not found")
    
   
    if reservation_data.checkin_date is not None and reservation_data.checkout_date is not None:
        if reservation_data.checkin_date >= reservation_data.checkout_date:
            raise HTTPException(status_code=400, detail="Check-in date must be before check-out date")
    
   
    for field, value in reservation_data.dict(exclude_unset=True).items():
        setattr(reservation, field, value)
    
    await db.commit()
    await db.refresh(reservation)
    return reservation

async def delete_reservation_controller(reservation_id: int, db: AsyncSession):
    result = await db.execute(select(Reservation).where(Reservation.reservation_id == reservation_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    
    await db.delete(reservation)
    await db.commit()
    return {"detail": "Reservation deleted successfully"}