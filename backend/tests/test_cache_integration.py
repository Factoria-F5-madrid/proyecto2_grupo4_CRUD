
import asyncio
import json
from backend.utils.simple_cache import cache
from backend.controllers.user_controllers import get_all_users_controller
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.models.user_models import User
from backend.db.database import AsyncSessionLocal

async def test_cache_with_real_controller():
    print("Probando caché con controlador real...")
    
    await cache.get_redis()
    
    async with AsyncSessionLocal() as db:
        print("\nPrimera llamada (debería ser cache miss)...")
        
        users1 = await get_all_users_controller(db)
        print(f"   Usuarios obtenidos: {len(users1)}")
        
        cached_data = await cache.get("users:all")
        if cached_data:
            print(f"    Datos en caché: {len(cached_data)} usuarios")
        else:
            print("    No hay datos en caché")
        
        print("\nSegunda llamada (debería ser cache hit)...")
        
        users2 = await get_all_users_controller(db)
        print(f"   Usuarios obtenidos: {len(users2)}")
        
        if users1 == users2:
            print("    Resultados son iguales")
        else:
            print("   Resultados son diferentes")
        
        print("\nVerificando en Redis directamente...")
        
        import redis.asyncio as redis
        r = redis.from_url("redis://localhost:6379", decode_responses=True)
        
        keys = await r.keys("users:*")
        print(f"    Claves en Redis: {keys}")
        
        if keys:
            for key in keys:
                value = await r.get(key)
                print(f"    {key}: {len(value)} caracteres")
        
        await r.aclose()
        
        print("\n Test de integración completado!")

if __name__ == "__main__":
    asyncio.run(test_cache_with_real_controller()) 