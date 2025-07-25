#!/usr/bin/env python3
"""
Script simple para probar el caché
"""
import asyncio
import json
from backend.utils.cache import cache_service

async def test_cache():
    """Probar el caché básico"""
    print("🧪 Probando caché...")
    
    # Conectar a Redis
    await cache_service.connect()
    
    # Test 1: Set y Get
    print("\n1️⃣ Probando set/get...")
    test_data = {"users": [{"id": 1, "name": "Test User"}]}
    
    success = await cache_service.set("test:users", test_data, ttl=60)
    print(f"✅ Set cache: {success}")
    
    cached_data = await cache_service.get("test:users")
    print(f"✅ Get cache: {cached_data}")
    
    # Test 2: Generar clave
    print("\n2️⃣ Probando generación de claves...")
    key = cache_service.generate_key("users", user_id=1, filter="active")
    print(f"✅ Clave generada: {key}")
    
    # Test 3: Verificar en Redis directamente
    print("\n3️⃣ Verificando en Redis...")
    import redis.asyncio as redis
    r = redis.from_url("redis://localhost:6379", decode_responses=True)
    
    # Verificar que existe
    exists = await r.exists("test:users")
    print(f"✅ Existe en Redis: {exists}")
    
    # Obtener valor directamente
    value = await r.get("test:users")
    print(f"✅ Valor en Redis: {value[:100]}..." if value else "❌ No encontrado")
    
    # Limpiar
    await r.delete("test:users")
    await r.close()
    
    print("\n🎉 ¡Test completado!")

if __name__ == "__main__":
    asyncio.run(test_cache()) 