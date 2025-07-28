from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status
from sqlalchemy.sql import func

from backend.models.user_models import User
from backend.schema.auth_schema import LoginRequest, RegisterRequest, TokenResponse
from backend.utils.auth import hash_password, verify_password
from backend.utils.auth_jwt import create_access_token
from backend.utils.authorization import get_user_permissions, get_available_routes
from backend.logger.logger import logger

async def login_user(login_data: LoginRequest, db: AsyncSession) -> TokenResponse:
   
    logger.info(f"Intento de login para email: {login_data.email}")
    
    
    result = await db.execute(select(User).where(User.email == login_data.email))
    user = result.scalar_one_or_none()
    
   
    if not user:
        logger.warning(f"Login fallido: usuario no encontrado - {login_data.email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
 
    if not verify_password(login_data.password, user.hashed_password):
        logger.warning(f"Login fallido: contraseña incorrecta - {login_data.email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    
    token_data = {
        "user_id": user.user_id,
        "email": user.email,
        "role": user.role
    }
    
    access_token = create_access_token(data=token_data)
    
   
    permissions = get_user_permissions(user.role)
    available_routes = get_available_routes(user.role)
    
    logger.info(f"Login exitoso para usuario: {user.email} con rol: {user.role}")
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user_id=user.user_id,
        email=user.email,
        role=user.role,
        permissions=permissions,
        available_routes=available_routes
    )

async def register_user(register_data: RegisterRequest, db: AsyncSession) -> TokenResponse:
   
    logger.info(f"Intento de registro para email: {register_data.email}")
    
   
    result = await db.execute(select(User).where(User.email == register_data.email))
    existing_user = result.scalar_one_or_none()
    
    if existing_user:
        logger.warning(f"Registro fallido: email ya existe - {register_data.email}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El email ya está registrado"
        )
    
   
    result = await db.execute(select(User).where(User.phone_number == register_data.phone_number))
    existing_phone = result.scalar_one_or_none()
    
    if existing_phone:
        logger.warning(f"Registro fallido: teléfono ya existe - {register_data.phone_number}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El número de teléfono ya está registrado"
        )
    

    hashed_password = hash_password(register_data.password)
    
   
    new_user = User(
        first_name=register_data.first_name,
        last_name=register_data.last_name,
        phone_number=register_data.phone_number,
        email=register_data.email,
        address=register_data.address,
        hashed_password=hashed_password,
        role="user",  
        updated_by="system",
        update_date=func.now()
    )
    
   
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    
    
    token_data = {
        "user_id": new_user.user_id,
        "email": new_user.email,
        "role": new_user.role
    }
    
    access_token = create_access_token(data=token_data)
    
   
    permissions = get_user_permissions(new_user.role)
    available_routes = get_available_routes(new_user.role)
    
    logger.info(f"Registro exitoso para usuario: {new_user.email} con rol: {new_user.role}")
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user_id=new_user.user_id,
        email=new_user.email,
        role=new_user.role,
        permissions=permissions,
        available_routes=available_routes
    ) 