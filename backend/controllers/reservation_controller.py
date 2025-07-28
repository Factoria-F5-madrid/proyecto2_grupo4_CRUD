from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from backend.exceptions.custom_exceptions import NotFoundException,BadRequestException
from backend.websockets.notifications import notification_service

from backend.models.reservation_models import Reservation
from backend.models.user_models import User
from backend.models.service_models import Service
from backend.models.assignment_models import Assignment
from backend.models.employee_models import Employee
from backend.schema.reservation_schema import ReservationCreate, ReservationUpdate, ReservationOut

from backend.logger.logger import logger

async def create_reservation_controller(reservation_data: ReservationCreate, db: AsyncSession):
    logger.debug(f"Fetching user with ID {reservation_data.user_id}")
    user_result = await db.execute(select(User).where(User.user_id == reservation_data.user_id))
    user = user_result.scalar_one_or_none()
    if not user:
        logger.warning(f"User with ID {reservation_data.user_id} not found")
        raise NotFoundException("User not found")
    
    logger.debug(f"Fetching service with type {reservation_data.service_type.value}")
    service_result = await db.execute(select(Service).where(Service.service_type == reservation_data.service_type))
    services = service_result.scalars().all()
    if not services:
        logger.warning(f"Service with type {reservation_data.service_type.value} not found")
        raise NotFoundException("Service not found")
    
    # Tomar el primer servicio encontrado (puede haber múltiples con el mismo tipo)
    service = services[0]
    logger.info(f"Using service_id {service.service_id} for service_type {reservation_data.service_type.value}")
    
    logger.debug(f"Validating reservation dates")
    if reservation_data.checkin_date >= reservation_data.checkout_date:
        logger.warning("Invalid reservation dates: check-in is not before check-out")
        raise BadRequestException(detail="Check-in date must be before check-out date")
    
    # Crear la reserva con el service_id obtenido del servicio
    reservation_dict = reservation_data.dict()
    reservation_dict['service_id'] = service.service_id
    del reservation_dict['service_type']  # Remover service_type ya que el modelo usa service_id
    
    new_reservation = Reservation(**reservation_dict)
    db.add(new_reservation)
    await db.commit()
    await db.refresh(new_reservation)

    logger.info(f"Reservation {new_reservation.reservation_id} created successfully for user_id={reservation_data.user_id}")
    
    # Enviar notificación en tiempo real
    reservation_dict = {
        "reservation_id": new_reservation.reservation_id,
        "user_id": new_reservation.user_id,
        "service_id": new_reservation.service_id,
        "checkin_date": new_reservation.checkin_date.isoformat(),
        "checkout_date": new_reservation.checkout_date.isoformat(),
        "status": new_reservation.status
    }
    await notification_service.send_reservation_update("created", reservation_dict)
    await notification_service.send_user_notification(
        str(new_reservation.user_id), 
        "reservation_created", 
        {"reservation_id": new_reservation.reservation_id}
    )
    
    return new_reservation

async def get_all_reservations_controller(db: AsyncSession):
    logger.debug("Fetching all reservations with employee assignments")
    
    # Query para obtener reservas con información del empleado asignado
    query = select(Reservation).options(
        selectinload(Reservation.service).selectinload(Service.assignments).selectinload(Assignment.employee)
    )
    
    result = await db.execute(query)
    reservations = result.scalars().all()
    
    # Procesar cada reserva para agregar información del empleado
    reservations_with_employee = []
    for reservation in reservations:
        reservation_dict = {
            "reservation_id": reservation.reservation_id,
            "user_id": reservation.user_id,
            "service_id": reservation.service_id,
            "checkin_date": reservation.checkin_date,
            "checkout_date": reservation.checkout_date,
            "status": reservation.status,
            "internal_notes": reservation.internal_notes,
            "created_at": reservation.created_at,
            "assigned_employee": None
        }
        
        # Buscar el empleado asignado para este servicio
        if reservation.service and reservation.service.assignments:
            # Tomar el empleado de la primera asignación (asumiendo una asignación por servicio)
            assignment = reservation.service.assignments[0] if reservation.service.assignments else None
            if assignment and assignment.employee:
                reservation_dict["assigned_employee"] = {
                    "employee_id": assignment.employee.employee_id,
                    "first_name": assignment.employee.first_name,
                    "last_name": assignment.employee.last_name,
                    "specialty": assignment.employee.specialty.value if assignment.employee.specialty else None
                }
        
        reservations_with_employee.append(reservation_dict)
    
    logger.info(f"Fetched {len(reservations_with_employee)} reservations with employee info")
    return reservations_with_employee

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
    reservations = result.scalars().all()
    logger.info(f"Found {len(reservations)} reservations for user ID {user_id}")
    return reservations

async def get_reservations_by_service_controller(service_id: int, db: AsyncSession):
    logger.debug(f"Fetching reservations for service ID: {service_id}")
    result = await db.execute(select(Reservation).where(Reservation.service_id == service_id))
    reservations = result.scalars().all()
    logger.info(f"Found {len(reservations)} reservations for service ID {service_id}")
    return reservations

async def update_reservation_controller(reservation_id: int, reservation_data: ReservationUpdate, db: AsyncSession):
    logger.debug(f"Updating reservation ID: {reservation_id} with data: {reservation_data}")
    
    try:
        result = await db.execute(select(Reservation).where(Reservation.reservation_id == reservation_id))
        reservation = result.scalar_one_or_none()
        if not reservation:
            logger.warning(f"Reservation with ID {reservation_id} not found")
            raise NotFoundException("Reservation not found")
        
        # Solo validar campos que se están actualizando
        update_data = reservation_data.dict(exclude_unset=True)
        logger.debug(f"Update data: {update_data}")
        
        # Validar usuario solo si se está actualizando
        if 'user_id' in update_data and update_data['user_id'] is not None:
            user_result = await db.execute(select(User).where(User.user_id == update_data['user_id']))
            user = user_result.scalar_one_or_none()
            if not user:
                logger.warning(f"User with ID {update_data['user_id']} not found")
                raise NotFoundException("User not found")
        
        # Validar servicio solo si se está actualizando
        if 'service_id' in update_data and update_data['service_id'] is not None:
            service_result = await db.execute(select(Service).where(Service.service_id == update_data['service_id']))
            service = service_result.scalar_one_or_none()
            if not service:
                logger.warning(f"Service with ID {update_data['service_id']} not found")
                raise NotFoundException("Service not found")
        
        # Validar fechas solo si ambas se están actualizando
        if 'checkin_date' in update_data and 'checkout_date' in update_data:
            if update_data['checkin_date'] is not None and update_data['checkout_date'] is not None:
                if update_data['checkin_date'] >= update_data['checkout_date']:
                    logger.warning("Invalid reservation dates: check-in is not before check-out")
                    raise BadRequestException(detail="Check-in date must be before check-out date")
        
        # Actualizar solo los campos que se envían
        for field, value in update_data.items():
            logger.debug(f"Setting {field} = {value} (type: {type(value)})")
            setattr(reservation, field, value)
        
        await db.commit()
        await db.refresh(reservation)
        logger.info(f"Reservation with ID {reservation_id} updated successfully")
        
        # Enviar notificación en tiempo real
        reservation_dict = {
            "reservation_id": reservation.reservation_id,
            "user_id": reservation.user_id,
            "service_id": reservation.service_id,
            "checkin_date": reservation.checkin_date.isoformat(),
            "checkout_date": reservation.checkout_date.isoformat(),
            "status": reservation.status
        }
        await notification_service.send_reservation_update("updated", reservation_dict)
        await notification_service.send_user_notification(
            str(reservation.user_id), 
            "reservation_updated", 
            {"reservation_id": reservation.reservation_id}
        )
        
        return reservation
        
    except Exception as e:
        logger.error(f"Error updating reservation {reservation_id}: {str(e)}")
        await db.rollback()
        raise e

async def delete_reservation_controller(reservation_id: int, db: AsyncSession):
    logger.debug(f"Deleting reservation with ID: {reservation_id}")
    result = await db.execute(select(Reservation).where(Reservation.reservation_id == reservation_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        logger.warning(f"Reservation with ID {reservation_id} not found")
        raise NotFoundException("Reservation not found")
    
    # Guardar información antes de eliminar para la notificación
    reservation_info = {
        "reservation_id": reservation.reservation_id,
        "user_id": reservation.user_id,
        "service_id": reservation.service_id
    }
    
    await db.delete(reservation)
    await db.commit()
    logger.info(f"Reservation with ID {reservation_id} deleted successfully")
    
    # Enviar notificación en tiempo real
    await notification_service.send_reservation_update("deleted", reservation_info)
    await notification_service.send_user_notification(
        str(reservation_info["user_id"]), 
        "reservation_deleted", 
        {"reservation_id": reservation_info["reservation_id"]}
    )
    
    return {"detail": "Reservation deleted successfully"}