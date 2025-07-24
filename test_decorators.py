#!/usr/bin/env python3
"""
Test específico para decoradores de caché
"""
import asyncio
from unittest.mock import AsyncMock, patch
from backend.utils.cache_decorators import cache_response, invalidate_cache
from backend.utils.cache import cache_service

# Mock de la base de datos
mock_db = AsyncMock()

async def test_cache_decorators():
    """Test de los decoradores de caché"""
    print("🧪 Probando decoradores de caché...")
    
    # Conectar a Redis
    await cache_service.connect()
    
    # Test 1: Decorador cache_response
    print("\n1️⃣ Probando @cache_response...")
    
    @cache_response("test:function", ttl=300)
    async def test_cached_function(param1: str, param2: int = 0):
        print(f"    🔄 Función ejecutada con: {param1}, {param2}")
        return {"result": f"{param1}_{param2}", "from_db": True}
    
    # Primera llamada - debería ejecutar la función
    print("   📞 Primera llamada...")
    result1 = await test_cached_function("hello", 42)
    print(f"   ✅ Resultado: {result1}")
    
    # Segunda llamada - debería usar caché
    print("   📞 Segunda llamada...")
    result2 = await test_cached_function("hello", 42)
    print(f"   ✅ Resultado: {result2}")
    
    # Verificar que son iguales
    assert result1 == result2
    print("   ✅ Resultados son iguales")
    
    # Test 2: Decorador invalidate_cache
    print("\n2️⃣ Probando @invalidate_cache...")
    
    @invalidate_cache("test")
    async def test_invalidate_function():
        print("    🔄 Función de invalidación ejecutada")
        return {"success": True}
    
    # Ejecutar función de invalidación
    result = await test_invalidate_function()
    print(f"   ✅ Resultado: {result}")
    
    # Verificar que se invalidó el caché anterior
    cached_data = await cache_service.get("test:function:param1:hello:param2:42")
    print(f"   ✅ Caché después de invalidación: {cached_data is None}")
    
    print("\n🎉 ¡Test de decoradores completado!")

async def test_real_controller():
    """Test con un controlador real"""
    print("\n🔧 Probando controlador real...")
    
    # Simular el controlador de usuarios
    @cache_response("users:all", ttl=600)
    async def get_all_users_controller(db):
        print("    🔄 Consultando base de datos...")
        # Simular datos de usuarios
        users = [
            {"user_id": 1, "name": "User 1"},
            {"user_id": 2, "name": "User 2"}
        ]
        return users
    
    # Primera llamada
    print("   📞 Primera llamada a get_all_users...")
    users1 = await get_all_users_controller(mock_db)
    print(f"   ✅ Usuarios obtenidos: {len(users1)}")
    
    # Segunda llamada (debería usar caché)
    print("   📞 Segunda llamada a get_all_users...")
    users2 = await get_all_users_controller(mock_db)
    print(f"   ✅ Usuarios obtenidos: {len(users2)}")
    
    # Verificar que son iguales
    assert users1 == users2
    print("   ✅ Resultados son iguales")
    
    print("\n🎉 ¡Test de controlador completado!")

if __name__ == "__main__":
    asyncio.run(test_cache_decorators())
    asyncio.run(test_real_controller()) 