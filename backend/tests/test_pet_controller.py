import pytest
import asyncio
from unittest.mock import AsyncMock, MagicMock
from datetime import date

from backend.controllers.pet_controller import (
    create_pet_controller, 
    get_all_pets_controller,
    get_pet_by_id_controller,
    get_pets_by_user_controller,
    update_pet_controller,
    delete_pet_controller
)
from backend.schema.pet_schema import PetCreate, PetUpdate
from backend.models.pet_models import Pet
from backend.models.enums import PetTypeEnum
from fastapi import HTTPException

@pytest.mark.asyncio
async def test_create_pet_controller_success():
    pet_data = PetCreate(
        name="Firulais",
        species=PetTypeEnum.CANINO, 
        breed="Labrador",           
        birth_date=date(2020, 5, 20), 
        user_id=1,
    )

    mock_user = MagicMock()  
    mock_user.scalar_one_or_none = MagicMock(return_value=mock_user)  

    mock_db = AsyncMock()
    mock_db.execute = AsyncMock(return_value=mock_user)
    mock_db.commit = AsyncMock()
    mock_db.refresh = AsyncMock()

    pet = await create_pet_controller(pet_data, mock_db)

    assert isinstance(pet, Pet)
    assert pet.name == "Firulais"
    assert pet.species == PetTypeEnum.CANINO
    assert pet.breed == "Labrador"
    mock_db.add.assert_called_once()
    mock_db.commit.assert_awaited()
    mock_db.refresh.assert_awaited()

@pytest.mark.asyncio
async def test_create_pet_controller_user_not_found():
    pet_data = PetCreate(
        name="Firulais",
        species=PetTypeEnum.CANINO, 
        breed="Labrador",           
        birth_date=date(2020, 5, 20),
        user_id=999,  
    )

    mock_user = MagicMock()
    mock_user.scalar_one_or_none = MagicMock(return_value=None)

    mock_db = AsyncMock()
    mock_db.execute = AsyncMock(return_value=mock_user)

    with pytest.raises(HTTPException) as exc_info:
        await create_pet_controller(pet_data, mock_db)
    
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "User not found"

@pytest.mark.asyncio
async def test_get_all_pets_controller():
    mock_pet1 = MagicMock()
    mock_pet1.name = "Firulais"
    mock_pet1.species = PetTypeEnum.CANINO
    
    mock_pet2 = MagicMock()
    mock_pet2.name = "Mittens"
    mock_pet2.species = PetTypeEnum.FELINO
    
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_pet1, mock_pet2]
    
    mock_db = AsyncMock()
    mock_db.execute = AsyncMock(return_value=mock_result)
    
    pets = await get_all_pets_controller(mock_db)
    
    assert len(pets) == 2
    assert pets[0].name == "Firulais"
    assert pets[1].name == "Mittens"
    mock_db.execute.assert_awaited_once()

@pytest.mark.asyncio
async def test_get_pet_by_id_controller_success():
    mock_pet = MagicMock()
    mock_pet.pet_id = 1
    mock_pet.name = "Firulais"
    mock_pet.species = PetTypeEnum.CANINO
    
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_pet
    
    mock_db = AsyncMock()
    mock_db.execute = AsyncMock(return_value=mock_result)
    
    pet = await get_pet_by_id_controller(1, mock_db)
    
    assert pet.pet_id == 1
    assert pet.name == "Firulais"
    assert pet.species == PetTypeEnum.CANINO
    mock_db.execute.assert_awaited_once()

@pytest.mark.asyncio
async def test_get_pet_by_id_controller_not_found():
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    
    mock_db = AsyncMock()
    mock_db.execute = AsyncMock(return_value=mock_result)
    
    with pytest.raises(HTTPException) as exc_info:
        await get_pet_by_id_controller(999, mock_db)
    
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Pet not found"
    mock_db.execute.assert_awaited_once()

@pytest.mark.asyncio
async def test_get_pets_by_user_controller():
    mock_pet1 = MagicMock()
    mock_pet1.name = "Firulais"
    mock_pet1.user_id = 1
    
    mock_pet2 = MagicMock()
    mock_pet2.name = "Buddy"
    mock_pet2.user_id = 1
    
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_pet1, mock_pet2]
    
    mock_db = AsyncMock()
    mock_db.execute = AsyncMock(return_value=mock_result)
    
    pets = await get_pets_by_user_controller(1, mock_db)
    
    assert len(pets) == 2
    assert pets[0].name == "Firulais"
    assert pets[1].name == "Buddy"
    assert all(pet.user_id == 1 for pet in pets)
    mock_db.execute.assert_awaited_once()

@pytest.mark.asyncio
async def test_update_pet_controller_success():
    mock_pet = MagicMock()
    mock_pet.pet_id = 1
    mock_pet.name = "Firulais"
    mock_pet.species = PetTypeEnum.CANINO
    mock_pet.breed = "Labrador"
    
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_pet
    
    mock_db = AsyncMock()
    mock_db.execute = AsyncMock(return_value=mock_result)
    mock_db.commit = AsyncMock()
    mock_db.refresh = AsyncMock()
    
    pet_update_data = PetUpdate(
        name="Firulais Updated",
        breed="Golden Retriever"
    )
    
    updated_pet = await update_pet_controller(1, pet_update_data, mock_db)
    
    assert updated_pet.name == "Firulais Updated"
    assert updated_pet.breed == "Golden Retriever"
    assert updated_pet.species == PetTypeEnum.CANINO
    mock_db.commit.assert_awaited()
    mock_db.refresh.assert_awaited()

@pytest.mark.asyncio
async def test_update_pet_controller_not_found():
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    
    mock_db = AsyncMock()
    mock_db.execute = AsyncMock(return_value=mock_result)
    
    pet_update_data = PetUpdate(name="Firulais Updated")
    
    with pytest.raises(HTTPException) as exc_info:
        await update_pet_controller(999, pet_update_data, mock_db)
    
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Pet not found"

@pytest.mark.asyncio
async def test_update_pet_controller_user_not_found():
    mock_pet = MagicMock()
    mock_pet.pet_id = 1
    mock_pet.name = "Firulais"
    
    mock_user_result = MagicMock()
    mock_user_result.scalar_one_or_none.return_value = None
    
    mock_db = AsyncMock()
    mock_db.execute = AsyncMock()
    mock_db.execute.side_effect = [MagicMock(scalar_one_or_none=MagicMock(return_value=mock_pet)), 
                                  mock_user_result]
    
    pet_update_data = PetUpdate(user_id=999)
    
    with pytest.raises(HTTPException) as exc_info:
        await update_pet_controller(1, pet_update_data, mock_db)
    
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "User not found"

@pytest.mark.asyncio
async def test_delete_pet_controller_success():
    mock_pet = MagicMock()
    mock_pet.pet_id = 1
    mock_pet.name = "Firulais"
    
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_pet
    
    mock_db = AsyncMock()
    mock_db.execute = AsyncMock(return_value=mock_result)
    mock_db.delete = AsyncMock()
    mock_db.commit = AsyncMock()
    
    result = await delete_pet_controller(1, mock_db)
    
    assert result == {"detail": "Pet deleted successfully"}
    mock_db.delete.assert_awaited_once_with(mock_pet)
    mock_db.commit.assert_awaited()

@pytest.mark.asyncio
async def test_delete_pet_controller_not_found():
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    
    mock_db = AsyncMock()
    mock_db.execute = AsyncMock(return_value=mock_result)
    
    with pytest.raises(HTTPException) as exc_info:
        await delete_pet_controller(999, mock_db)
    
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Pet not found"
