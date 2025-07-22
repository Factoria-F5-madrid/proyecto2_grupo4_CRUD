from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.exceptions.custom_exceptions import NotFoundException,BadRequestException


from backend.models.reservation_models import Reservation
from backend.models.user_models import User
from backend.models.service_models import Service
from backend.schema.reservation_schema import ReservationCreate, ReservationUpdate, ReservationOut


from backend.logger.logger import logger

async def create_reservation_controller(reservation_data: ReservationCreate, db: AsyncSession):
    logger.debug(f"Fetching service with ID {reservation_data.service_id}")
    user_result = await db.execute(select(User).where(User.user_id == reservation_data.user_id))
    user = user_result.scalar_one_or_none()
    if not user:
        logger.warning(f"Service with ID {service_id} not found")
        raise NotFoundException("User not found")
    
  
    service_result = await db.execute(select(Service).where(Service.service_id == reservation_data.service_id))
    service = service_result.scalar_one_or_none()
    if not service:
        logger.warning(f"Service with ID {reservation_data.service_id} not found")
        raise NotFoundException("User not found")
    
  
    if reservation_data.checkin_date >= reservation_data.checkout_date:
        logger.warning("Invalid reservation dates: check-in is not before check-out")
        raise BadRequestException(detail="Check-in date must be before check-out date")
    
   
    new_reservation = Reservation(**reservation_data.dict())
    db.add(new_reservation)
    await db.commit()
    await db.refresh(new_reservation)

    logger.info(f"Reservation {new_reservation.reservation_id} created successfully for user_id={reservation_data.user_id}")
    return new_reservation

async def get_all_reservations_controller(db: AsyncSession):
    logger.debug("Fetching all reservations")
    result = await db.execute(select(Reservation))
    reservations = result.scalars().all()
    logger.info(f"Fetched {len(reservations)} reservations")
    return reservations

async def get_reservation_by_id_controller(reservation_id: int, db: AsyncSession):
    logger.debug(f"Fetching reservation by ID: {reservation_id}")
    result = await db.execute(select(Reservation).where(Reservation.reservation_id == reservation_id))
    reservation = result.scalar_one_or_none()
    if reservation is None:
        logger.warning(f"Reservation with ID {reservation_id} not found")
        raise NotFoundException("Reservation not found")
    logger.info(f"Reservation with ID {reservation_id} found")
    return reservation

async def get_reservations_by_user_controller(user_id: int, db: AsyncSession):
    logger.debug(f"Fetching reservations for user ID: {user_id}")
    result = await db.execute(select(Reservation).where(Reservation.user_id == user_id))
    logger.info(f"Found {len(reservations)} reservations for user ID {user_id}")
    return result.scalars().all()

async def get_reservations_by_service_controller(service_id: int, db: AsyncSession):
    logger.debug(f"Fetching reservations for service ID: {service_id}")
    result = await db.execute(select(Reservation).where(Reservation.service_id == service_id))
    reservations = result.scalars().all()
    logger.info(f"Found {len(reservations)} reservations for service ID {service_id}")
    return reservations

async def update_reservation_controller(reservation_id: int, reservation_data: ReservationUpdate, db: AsyncSession):
    logger.debug(f"Updating reservation ID: {reservation_id} with data: {reservation_data}")
    result = await db.execute(select(Reservation).where(Reservation.reservation_id == reservation_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        logger.warning(f"Reservation with ID {reservation_id} not found")
        raise NotFoundException("Reservation not found")
    
  
    if reservation_data.user_id is not None:
        user_result = await db.execute(select(User).where(User.user_id == reservation_data.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            logger.warning(f"User with ID {reservation_data.user_id} not found")
            raise NotFoundException("Reservation not found")
    

    if reservation_data.service_id is not None:
        service_result = await db.execute(select(Service).where(Service.service_id == reservation_data.service_id))
        service = service_result.scalar_one_or_none()
        if not service:
            logger.warning(f"Service with ID {reservation_data.service_id} not found")
            raise NotFoundException("Reservation not found")
    
   
    if reservation_data.checkin_date is not None and reservation_data.checkout_date is not None:
        if reservation_data.checkin_date >= reservation_data.checkout_date:
            logger.warning("Invalid reservation dates: check-in is not before check-out")
            raise BadRequestException(detail="Check-in date must be before check-out date")
    
   
    for field, value in reservation_data.dict(exclude_unset=True).items():
        setattr(reservation, field, value)
    
    await db.commit()
    await db.refresh(reservation)
    logger.info(f"Reservation with ID {reservation_id} updated successfully")
    return reservation

async def delete_reservation_controller(reservation_id: int, db: AsyncSession):
    logger.debug(f"Deleting reservation with ID: {reservation_id}")
    result = await db.execute(select(Reservation).where(Reservation.reservation_id == reservation_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        logger.warning(f"Reservation with ID {reservation_id} not found")
        raise NotFoundException("Reservation not found")
    
    await db.delete(reservation)
    await db.commit()
    logger.info(f"Reservation with ID {reservation_id} deleted successfully")
    return {"detail": "Reservation deleted successfully"}