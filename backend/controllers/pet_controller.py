from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.exceptions.custom_exceptions import NotFoundException
from backend.utils.cache_decorators import cache_response, invalidate_cache
from backend.websockets.notifications import notification_service

from backend.models.pet_models import Pet
from backend.models.user_models import User
from backend.schema.pet_schema import PetCreate, PetUpdate, PetOut

from backend.logger.logger import logger

@invalidate_cache("pets")
async def create_pet_controller(pet_data: PetCreate, db: AsyncSession):
    logger.debug(f"Attempting to create pet for user ID {pet_data.user_id}")
    user_result = await db.execute(select(User).where(User.user_id == pet_data.user_id))
    user = user_result.scalar_one_or_none()
    if not user:
        logger.warning(f"User with ID {pet_data.user_id} not found")
        raise NotFoundException("User not found")
    
    try:
        new_pet = Pet(**pet_data.dict())
        db.add(new_pet)
        await db.commit()
        await db.refresh(new_pet)
        logger.info(f"Pet created with ID {new_pet.pet_id}")
        
        # Enviar notificación en tiempo real
        pet_dict = {
            "pet_id": new_pet.pet_id,
            "name": new_pet.name,
            "species": new_pet.species.value if new_pet.species else None,
            "breed": new_pet.breed,
            "birth_date": new_pet.birth_date.isoformat() if new_pet.birth_date else None,
            "allergies": new_pet.allergies,
            "special_needs": new_pet.special_needs,
            "img_url": new_pet.img_url,
            "user_id": new_pet.user_id
        }
        await notification_service.send_pet_update("created", pet_dict)
        await notification_service.send_user_notification(
            str(new_pet.user_id), 
            "pet_created", 
            {"pet_name": new_pet.name, "pet_id": new_pet.pet_id}
        )
        
        return new_pet
    except Exception as e:
        logger.error(f"Error creating pet: {str(e)}")
        await db.rollback()
        raise e

@cache_response("pets:all", ttl=600)  # 10 minutos para listas
async def get_all_pets_controller(db: AsyncSession):
    logger.debug("Fetching all pets from the database")
    result = await db.execute(select(Pet))
    pets = result.scalars().all()
    logger.info(f"Fetched {len(pets)} pets")
    return pets

@cache_response("pets:by_id", ttl=900)  # 15 minutos para mascotas individuales
async def get_pet_by_id_controller(pet_id: int, db: AsyncSession):
    logger.debug(f"Fetching pet with ID {pet_id}")
    result = await db.execute(select(Pet).where(Pet.pet_id == pet_id))
    pet = result.scalar_one_or_none()
    if pet is None:
        logger.warning(f"Pet with ID {pet_id} not found")
        raise NotFoundException("User not found")
    logger.info(f"Pet found: ID {pet_id}")    
    return pet

@cache_response("pets:by_user", ttl=600)  # 10 minutos para mascotas por usuario
async def get_pets_by_user_controller(user_id: int, db: AsyncSession):
    logger.debug(f"Fetching pets for user ID {user_id}")
    result = await db.execute(select(Pet).where(Pet.user_id == user_id))
    pets = result.scalars().all()
    logger.info(f"Found {len(pets)} pets for user ID {user_id}")
    return pets

@invalidate_cache("pets")
async def update_pet_controller(pet_id: int, pet_data: PetUpdate, db: AsyncSession):
    logger.debug(f"Attempting to update pet with ID {pet_id}")
    result = await db.execute(select(Pet).where(Pet.pet_id == pet_id))
    pet = result.scalar_one_or_none()
    if not pet:
        logger.warning(f"Pet with ID {pet_id} not found")
        raise NotFoundException("User not found")
    
   
    if pet_data.user_id is not None:
        logger.debug(f"Validating user ID {pet_data.user_id} for pet update")
        user_result = await db.execute(select(User).where(User.user_id == pet_data.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            logger.warning(f"User with ID {pet_data.user_id} not found")
            raise NotFoundException("User not found")
    
  
    for field, value in pet_data.dict(exclude_unset=True).items():
        setattr(pet, field, value)
    
    await db.commit()
    await db.refresh(pet)
    logger.info(f"Pet with ID {pet_id} updated successfully")
    
    # Enviar notificación en tiempo real
    pet_dict = {
        "pet_id": pet.pet_id,
        "name": pet.name,
        "species": pet.species.value if pet.species else None,  # Convertir enum a string
        "breed": pet.breed,
        "birth_date": pet.birth_date.isoformat() if pet.birth_date else None,  # Convertir fecha a string
        "allergies": pet.allergies,
        "special_needs": pet.special_needs,
        "img_url": pet.img_url,
        "user_id": pet.user_id
    }
    await notification_service.send_pet_update("updated", pet_dict)
    await notification_service.send_user_notification(
        str(pet.user_id), 
        "pet_updated", 
        {"pet_name": pet.name, "pet_id": pet.pet_id}
    )
    
    return pet

@invalidate_cache("pets")
async def delete_pet_controller(pet_id: int, db: AsyncSession):
    logger.debug(f"Attempting to delete pet with ID {pet_id}")
    result = await db.execute(select(Pet).where(Pet.pet_id == pet_id))
    pet = result.scalar_one_or_none()
    if not pet:
        logger.warning(f"Pet with ID {pet_id} not found")
        raise NotFoundException("User not found")
    
    # Guardar información antes de eliminar para la notificación
    pet_info = {
        "pet_id": pet.pet_id,
        "name": pet.name,
        "user_id": pet.user_id
    }
    
    await db.delete(pet)
    await db.commit()
    logger.info(f"Pet with ID {pet_id} deleted successfully")
    
    # Enviar notificación en tiempo real
    await notification_service.send_pet_update("deleted", pet_info)
    await notification_service.send_user_notification(
        str(pet_info["user_id"]), 
        "pet_deleted", 
        {"pet_name": pet_info["name"], "pet_id": pet_info["pet_id"]}
    )
    
    return {"detail": "Pet deleted successfully"} 