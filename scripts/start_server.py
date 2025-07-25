
"""
Script para iniciar el servidor FastAPI con WebSockets
"""

import uvicorn
import os
import sys

# Agregar el directorio raíz al path para que Python pueda encontrar el módulo backend
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def main():
    """Inicia el servidor FastAPI"""
    print("🚀 Iniciando servidor PetLand con WebSockets...")
    print("=" * 50)
    
    # Configuración del servidor
    host = "0.0.0.0"
    port = 8000
    reload = True
    
    print(f"📍 Servidor: http://{host}:{port}")
    print(f"📡 WebSockets: ws://{host}:{port}/ws/")
    print(f"📚 Documentación: http://{host}:{port}/docs")
    print()
    
    # Endpoints de WebSocket disponibles
    print("🔌 Endpoints de WebSocket disponibles:")
    print("   - ws://localhost:8000/ws/pets")
    print("   - ws://localhost:8000/ws/reservations")
    print("   - ws://localhost:8000/ws/payments")
    print("   - ws://localhost:8000/ws/invoices")
    print("   - ws://localhost:8000/ws/medical-history")
    print("   - ws://localhost:8000/ws/services")
    print("   - ws://localhost:8000/ws/employees")
    print("   - ws://localhost:8000/ws/activity-logs")
    print("   - ws://localhost:8000/ws/user/{user_id}")
    print()
    
    print("💡 Para probar los WebSockets:")
    print("   1. Ejecuta: python backend/tests/test_websockets.py")
    print("   2. Usa un cliente WebSocket como wscat")
    print("   3. Conecta desde el frontend")
    print()
    
    try:
        # Iniciar servidor
        uvicorn.run(
            "backend.main:app",
            host=host,
            port=port,
            reload=reload,
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido por el usuario")
    except Exception as e:
        print(f"❌ Error iniciando servidor: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main() 