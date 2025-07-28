import pytest
import asyncio
from unittest.mock import AsyncMock, patch
from backend.utils.cache import CacheService
from backend.utils.cache_decorators import cache_response, invalidate_cache
from backend.controllers.user_controllers import get_all_users_controller
from backend.logger.logger import logger

class TestCacheService:
    """Tests para el servicio de caché"""
    
    @pytest.fixture
    async def cache_service(self):
        """Fixture para crear instancia de caché"""
        service = CacheService()
        await service.connect()
        yield service
        await service.disconnect()
    
    @pytest.mark.asyncio
    async def test_cache_set_get(self, cache_service):
        """Test básico de set y get"""
        key = "test:key"
        value = {"data": "test_value"}
        
        # Set cache
        success = await cache_service.set(key, value, ttl=60)
        assert success is True
        
        # Get cache
        cached_value = await cache_service.get(key)
        assert cached_value == value
    
    @pytest.mark.asyncio
    async def test_cache_miss(self, cache_service):
        """Test cuando no existe la clave"""
        key = "nonexistent:key"
        cached_value = await cache_service.get(key)
        assert cached_value is None
    
    @pytest.mark.asyncio
    async def test_cache_delete(self, cache_service):
        """Test de eliminación de caché"""
        key = "test:delete"
        value = {"data": "to_delete"}
        
        # Set cache
        await cache_service.set(key, value)
        
        # Verify exists
        cached_value = await cache_service.get(key)
        assert cached_value == value
        
        # Delete cache
        success = await cache_service.delete(key)
        assert success is True
        
        # Verify deleted
        cached_value = await cache_service.get(key)
        assert cached_value is None
    
    @pytest.mark.asyncio
    async def test_generate_key(self, cache_service):
        """Test de generación de claves"""
        key = cache_service.generate_key("users", user_id=1, filter="active")
        assert key == "users:filter:active:user_id:1"

class TestCacheDecorators:
    """Tests para los decoradores de caché"""
    
    @pytest.mark.asyncio
    async def test_cache_response_decorator(self):
        """Test del decorador cache_response"""
        
        # Mock del servicio de caché
        with patch('backend.utils.cache_decorators.cache_service') as mock_cache:
            mock_cache.get.return_value = None  # Cache miss
            mock_cache.set.return_value = True
            
            # Función de prueba
            @cache_response("test:function", ttl=300)
            async def test_function(param1: str, param2: int = 0):
                return {"result": f"{param1}_{param2}"}
            
            # Llamar función
            result = await test_function("hello", 42)
            
            # Verificar que se llamó set
            mock_cache.set.assert_called_once()
            assert result == {"result": "hello_42"}
    
    @pytest.mark.asyncio
    async def test_cache_hit(self):
        """Test cuando hay cache hit"""
        
        cached_data = {"cached": "data"}
        
        with patch('backend.utils.cache_decorators.cache_service') as mock_cache:
            mock_cache.get.return_value = cached_data  # Cache hit
            
            @cache_response("test:function", ttl=300)
            async def test_function():
                return {"should_not_be_called": True}
            
            # Llamar función
            result = await test_function()
            
            # Verificar que se devolvió el caché
            assert result == cached_data
            # Verificar que NO se llamó la función original
            mock_cache.set.assert_not_called()
    
    @pytest.mark.asyncio
    async def test_invalidate_cache_decorator(self):
        """Test del decorador invalidate_cache"""
        
        with patch('backend.utils.cache_decorators.cache_service') as mock_cache:
            mock_cache.delete_pattern.return_value = True
            
            @invalidate_cache("users")
            async def test_function():
                return {"success": True}
            
            # Llamar función
            result = await test_function()
            
            # Verificar que se invalidó el caché
            mock_cache.delete_pattern.assert_called_once_with("users:*")
            assert result == {"success": True}

class TestCacheIntegration:
    """Tests de integración del caché con controladores"""
    
    @pytest.mark.asyncio
    async def test_user_controller_cache(self):
        """Test de caché en controlador de usuarios"""
        
        # Mock de la base de datos
        mock_db = AsyncMock()
        mock_result = AsyncMock()
        mock_users = [
            {"user_id": 1, "name": "User 1"},
            {"user_id": 2, "name": "User 2"}
        ]
        mock_result.scalars.return_value.all.return_value = mock_users
        mock_db.execute.return_value = mock_result
        
        with patch('backend.utils.cache_decorators.cache_service') as mock_cache:
            # Primera llamada - cache miss
            mock_cache.get.return_value = None
            mock_cache.set.return_value = True
            
            result1 = await get_all_users_controller(mock_db)
            
            # Verificar que se guardó en caché
            mock_cache.set.assert_called_once()
            assert result1 == mock_users
            
            # Segunda llamada - cache hit
            mock_cache.get.return_value = mock_users
            
            result2 = await get_all_users_controller(mock_db)
            
            # Verificar que se devolvió del caché
            assert result2 == mock_users
            # Verificar que NO se ejecutó la consulta a BD
            assert mock_db.execute.call_count == 1

def test_cache_performance():
    """Test de rendimiento del caché"""
    
    async def performance_test():
        cache_service = CacheService()
        
        # Simular múltiples lecturas
        start_time = asyncio.get_event_loop().time()
        
        for i in range(100):
            await cache_service.set(f"key_{i}", {"data": f"value_{i}"})
            await cache_service.get(f"key_{i}")
        
        end_time = asyncio.get_event_loop().time()
        duration = end_time - start_time
        
        # Verificar que es rápido (< 1 segundo para 100 operaciones)
        assert duration < 1.0
        logger.info(f"Performance test completed in {duration:.3f} seconds")
    
    # Ejecutar test de rendimiento
    asyncio.run(performance_test())

if __name__ == "__main__":
    # Ejecutar tests
    pytest.main([__file__, "-v"]) 