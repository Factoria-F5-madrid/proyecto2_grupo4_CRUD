import asyncio
from unittest.mock import AsyncMock, patch
from backend.utils.cache_decorators import cache_response, invalidate_cache
from backend.utils.cache import cache_service

mock_db = AsyncMock()

async def test_cache_decorators():
    print("Probando decoradores de caché...")
    
    await cache_service.connect()
    
    print("\n1. Probando @cache_response...")
    
    @cache_response("test:function", ttl=300)
    async def test_cached_function(param1: str, param2: int = 0):
        print(f"    Función ejecutada con: {param1}, {param2}")
        return {"result": f"{param1}_{param2}", "from_db": True}
    
    print("   Primera llamada...")
    result1 = await test_cached_function("hello", 42)
    print(f"   Resultado: {result1}")
    
    print("   Segunda llamada...")
    result2 = await test_cached_function("hello", 42)
    print(f"   Resultado: {result2}")
    
    assert result1 == result2
    print("   Resultados son iguales")
    
    print("\n2. Probando @invalidate_cache...")
    
    @invalidate_cache("test")
    async def test_invalidate_function():
        print("    Función de invalidación ejecutada")
        return {"success": True}
    
    result = await test_invalidate_function()
    print(f"   Resultado: {result}")
    
    cached_data = await cache_service.get("test:function:param1:hello:param2:42")
    print(f"   Caché después de invalidación: {cached_data is None}")
    
    print("\nTest de decoradores completado!")

async def test_real_controller():
    print("\nProbando controlador real...")
    
    @cache_response("users:all", ttl=600)
    async def get_all_users_controller(db):
        print("    Consultando base de datos...")
        users = [
            {"user_id": 1, "name": "User 1"},
            {"user_id": 2, "name": "User 2"}
        ]
        return users
    
    print("   Primera llamada a get_all_users...")
    users1 = await get_all_users_controller(mock_db)
    print(f"   Usuarios obtenidos: {len(users1)}")
    
    print("   Segunda llamada a get_all_users...")
    users2 = await get_all_users_controller(mock_db)
    print(f"   Usuarios obtenidos: {len(users2)}")
    
    assert users1 == users2
    print("   Resultados son iguales")
    
    print("\nTest de controlador completado!")

if __name__ == "__main__":
    asyncio.run(test_cache_decorators())
    asyncio.run(test_real_controller()) 