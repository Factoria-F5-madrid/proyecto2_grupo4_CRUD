import pytest
import asyncio
from unittest.mock import AsyncMock, patch
from backend.utils.cache import CacheService
from backend.utils.cache_decorators import cache_response, invalidate_cache
from backend.controllers.user_controllers import get_all_users_controller
from backend.logger.logger import logger

class TestCacheService:
    
    @pytest.fixture
    async def cache_service(self):
        service = CacheService()
        await service.connect()
        yield service
        await service.disconnect()
    
    @pytest.mark.asyncio
    async def test_cache_set_get(self, cache_service):
        key = "test:key"
        value = {"data": "test_value"}
        
        success = await cache_service.set(key, value, ttl=60)
        assert success is True
        
        cached_value = await cache_service.get(key)
        assert cached_value == value
    
    @pytest.mark.asyncio
    async def test_cache_miss(self, cache_service):
        key = "nonexistent:key"
        cached_value = await cache_service.get(key)
        assert cached_value is None
    
    @pytest.mark.asyncio
    async def test_cache_delete(self, cache_service):
        key = "test:delete"
        value = {"data": "to_delete"}
        
        await cache_service.set(key, value)
        
        cached_value = await cache_service.get(key)
        assert cached_value == value
        
        success = await cache_service.delete(key)
        assert success is True
        
        cached_value = await cache_service.get(key)
        assert cached_value is None
    
    @pytest.mark.asyncio
    async def test_generate_key(self, cache_service):
        key = cache_service.generate_key("users", user_id=1, filter="active")
        assert key == "users:filter:active:user_id:1"

class TestCacheDecorators:
    
    @pytest.mark.asyncio
    async def test_cache_response_decorator(self):
        with patch('backend.utils.cache_decorators.cache_service') as mock_cache:
            mock_cache.get.return_value = None
            mock_cache.set.return_value = True
            
            @cache_response("test:function", ttl=300)
            async def test_function(param1: str, param2: int = 0):
                return {"result": f"{param1}_{param2}"}
            
            result = await test_function("hello", 42)
            
            mock_cache.set.assert_called_once()
            assert result == {"result": "hello_42"}
    
    @pytest.mark.asyncio
    async def test_cache_hit(self):
        cached_data = {"cached": "data"}
        
        with patch('backend.utils.cache_decorators.cache_service') as mock_cache:
            mock_cache.get.return_value = cached_data
            
            @cache_response("test:function", ttl=300)
            async def test_function():
                return {"should_not_be_called": True}
            
            result = await test_function()
            
            assert result == cached_data
            mock_cache.set.assert_not_called()
    
    @pytest.mark.asyncio
    async def test_invalidate_cache_decorator(self):
        with patch('backend.utils.cache_decorators.cache_service') as mock_cache:
            mock_cache.delete_pattern.return_value = True
            
            @invalidate_cache("users")
            async def test_function():
                return {"success": True}
            
            result = await test_function()
            
            mock_cache.delete_pattern.assert_called_once_with("users:*")
            assert result == {"success": True}

class TestCacheIntegration:
    
    @pytest.mark.asyncio
    async def test_user_controller_cache(self):
        mock_db = AsyncMock()
        mock_result = AsyncMock()
        mock_users = [
            {"user_id": 1, "name": "User 1"},
            {"user_id": 2, "name": "User 2"}
        ]
        mock_result.scalars.return_value.all.return_value = mock_users
        mock_db.execute.return_value = mock_result
        
        with patch('backend.utils.cache_decorators.cache_service') as mock_cache:
            mock_cache.get.return_value = None
            mock_cache.set.return_value = True
            
            result1 = await get_all_users_controller(mock_db)
            
            mock_cache.set.assert_called_once()
            assert result1 == mock_users
            
            mock_cache.get.return_value = mock_users
            
            result2 = await get_all_users_controller(mock_db)
            
            assert result2 == mock_users
            assert mock_db.execute.call_count == 1

def test_cache_performance():
    async def performance_test():
        cache_service = CacheService()
        
        start_time = asyncio.get_event_loop().time()
        
        for i in range(100):
            await cache_service.set(f"key_{i}", {"data": f"value_{i}"})
            await cache_service.get(f"key_{i}")
        
        end_time = asyncio.get_event_loop().time()
        duration = end_time - start_time
        
        assert duration < 1.0
        logger.info(f"Performance test completed in {duration:.3f} seconds")
    
    asyncio.run(performance_test())

if __name__ == "__main__":
    pytest.main([__file__, "-v"]) 