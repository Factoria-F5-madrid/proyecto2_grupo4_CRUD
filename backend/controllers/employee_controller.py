from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import join
from backend.exceptions.custom_exceptions import NotFoundException, BadRequestException

from backend.models.employee_models import Employee
from backend.models.user_models import User
from backend.schema.employee_schema import EmployeeCreate, EmployeeUpdate

from backend.logger.logger import logger

async def create_employee_controller(employee_data: EmployeeCreate, db: AsyncSession):
    logger.info(f"Creating employee with data: {employee_data.dict()}")
    new_employee = Employee(**employee_data.dict())
    db.add(new_employee)
    await db.commit()
    await db.refresh(new_employee)
    logger.info(f"Employee created with ID: {new_employee.employee_id}")
    return new_employee

async def get_all_employees_controller(db: AsyncSession):
    logger.info("Fetching all employees with user data")
    
    # Primero obtener todos los usuarios con rol 'employee'
    user_query = select(User).where(User.role == 'employee')
    user_result = await db.execute(user_query)
    users = user_result.scalars().all()
    
    # Luego obtener todos los registros de Employee para hacer un mapeo
    employee_query = select(Employee)
    employee_result = await db.execute(employee_query)
    employees = employee_result.scalars().all()
    
    # Crear un diccionario para mapear employee_id -> employee_data
    employee_map = {emp.employee_id: emp for emp in employees}
    
    # Combinar los datos de User y Employee
    result = []
    for user in users:
        employee_data = employee_map.get(user.user_id)
        
        employee_dict = {
            'employee_id': user.user_id,  # Usar user_id como employee_id
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'phone_number': user.phone_number,
            'address': user.address,
            'specialty': employee_data.specialty.value if employee_data and employee_data.specialty else 'No asignado',
            'is_active': employee_data.is_active if employee_data else True,
            'created_at': user.registration_date,
            'updated_at': user.last_update
        }
        result.append(employee_dict)
    
    logger.info(f"Fetched {len(result)} employees with user data")
    return result

async def get_employee_by_id_controller(employee_id: int, db: AsyncSession):
    logger.info(f"Fetching employee with ID: {employee_id}")
    
    # Primero buscar el usuario con rol 'employee'
    user_query = select(User).where(
        User.user_id == employee_id,
        User.role == 'employee'
    )
    user_result = await db.execute(user_query)
    user = user_result.scalar_one_or_none()
    
    if user is None:
        logger.warning(f"Employee with ID {employee_id} not found")
        raise NotFoundException("Employee not found")
    
    # Luego buscar datos de Employee si existen
    employee_query = select(Employee).where(Employee.employee_id == employee_id)
    employee_result = await db.execute(employee_query)
    employee_data = employee_result.scalar_one_or_none()
    
    # Combinar los datos de User y Employee
    employee_dict = {
        'employee_id': user.user_id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'phone_number': user.phone_number,
        'address': user.address,
        'specialty': employee_data.specialty.value if employee_data and employee_data.specialty else 'No asignado',
        'is_active': employee_data.is_active if employee_data else True,
        'created_at': user.registration_date,
        'updated_at': user.last_update
    }
    
    logger.info(f"Found employee with ID: {employee_id}")    
    return employee_dict

async def update_employee_controller(employee_id: int, employee_data: EmployeeUpdate, db: AsyncSession):
    logger.info(f"Updating employee with ID: {employee_id}")
    result = await db.execute(select(Employee).where(Employee.employee_id == employee_id))
    employee = result.scalar_one_or_none()
    if not employee:
        logger.warning(f"Employee with ID {employee_id} not found for update")
        raise NotFoundException("Employee not found")

    for field, value in employee_data.dict(exclude_unset=True).items():
        setattr(employee, field, value)

    await db.commit()
    await db.refresh(employee)
    logger.info(f"Updated employee with ID: {employee_id}")
    return employee

async def delete_employee_controller(employee_id: int, db: AsyncSession):
    logger.info(f"Deleting employee with ID: {employee_id}")
    result = await db.execute(select(Employee).where(Employee.employee_id == employee_id))
    employee = result.scalar_one_or_none()
    if not employee:
        logger.warning(f"Employee with ID {employee_id} not found for deletion")
        raise NotFoundException("Employee not found")

    await db.delete(employee)
    await db.commit()
    logger.info(f"Deleted employee with ID: {employee_id}")
    return {"detail": f"Employee with ID {employee_id} deleted successfully"}
