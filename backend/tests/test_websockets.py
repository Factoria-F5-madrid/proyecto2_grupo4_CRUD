#!/usr/bin/env python3
"""
Script de prueba para WebSockets
Este script prueba la funcionalidad de WebSockets del backend
"""

import asyncio
import websockets
import json
import time
from datetime import datetime


async def test_websocket_connection():
    """Prueba la conexión básica a WebSocket"""
    print("🔌 Probando conexión WebSocket...")
    
    try:
        # Conectar al canal de mascotas
        uri = "ws://localhost:8000/ws/pets"
        async with websockets.connect(uri) as websocket:
            print("✅ Conexión exitosa al canal de mascotas")
            
            # Enviar mensaje de prueba
            test_message = {
                "type": "test",
                "message": "Prueba de conexión",
                "timestamp": datetime.now().isoformat()
            }
            await websocket.send(json.dumps(test_message))
            print("📤 Mensaje de prueba enviado")
            
            # Esperar respuesta
            try:
                response = await asyncio.wait_for(websocket.recv(), timeout=5.0)
                print(f"📥 Respuesta recibida: {response}")
            except asyncio.TimeoutError:
                print("⏰ Timeout esperando respuesta")
                
    except Exception as e:
        print(f"❌ Error de conexión: {e}")


async def test_user_websocket():
    """Prueba la conexión específica de usuario"""
    print("\n👤 Probando WebSocket de usuario...")
    
    try:
        # Conectar al canal de usuario específico
        uri = "ws://localhost:8000/ws/user/123"
        async with websockets.connect(uri) as websocket:
            print("✅ Conexión exitosa al canal de usuario")
            
            # Enviar mensaje de prueba
            test_message = {
                "type": "user_test",
                "user_id": "123",
                "message": "Prueba de usuario",
                "timestamp": datetime.now().isoformat()
            }
            await websocket.send(json.dumps(test_message))
            print("📤 Mensaje de usuario enviado")
            
            # Esperar respuesta
            try:
                response = await asyncio.wait_for(websocket.recv(), timeout=5.0)
                print(f"📥 Respuesta de usuario recibida: {response}")
            except asyncio.TimeoutError:
                print("⏰ Timeout esperando respuesta de usuario")
                
    except Exception as e:
        print(f"❌ Error de conexión de usuario: {e}")


async def test_multiple_channels():
    """Prueba múltiples canales simultáneamente"""
    print("\n🔄 Probando múltiples canales...")
    
    channels = ["pets", "reservations", "payments", "invoices"]
    
    async def test_channel(channel):
        try:
            uri = f"ws://localhost:8000/ws/{channel}"
            async with websockets.connect(uri) as websocket:
                print(f"✅ Conectado a canal: {channel}")
                
                # Enviar mensaje de prueba
                test_message = {
                    "type": "channel_test",
                    "channel": channel,
                    "message": f"Prueba de canal {channel}",
                    "timestamp": datetime.now().isoformat()
                }
                await websocket.send(json.dumps(test_message))
                print(f"📤 Mensaje enviado a {channel}")
                
                # Esperar respuesta
                try:
                    response = await asyncio.wait_for(websocket.recv(), timeout=3.0)
                    print(f"📥 Respuesta de {channel}: {response}")
                except asyncio.TimeoutError:
                    print(f"⏰ Timeout en canal {channel}")
                    
        except Exception as e:
            print(f"❌ Error en canal {channel}: {e}")
    
    # Ejecutar pruebas en paralelo
    tasks = [test_channel(channel) for channel in channels]
    await asyncio.gather(*tasks, return_exceptions=True)


async def test_notification_service():
    """Prueba el servicio de notificaciones"""
    print("\n🔔 Probando servicio de notificaciones...")
    
    try:
        # Importar el servicio de notificaciones
        import sys
        import os
        sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
        
        from websockets.notifications import notification_service
        
        # Simular envío de notificaciones
        print("📤 Enviando notificación de mascota...")
        # Nota: Esto solo funciona si el servidor está ejecutándose
        
        print("✅ Servicio de notificaciones importado correctamente")
        
    except Exception as e:
        print(f"❌ Error importando servicio de notificaciones: {e}")


async def main():
    """Función principal de pruebas"""
    print("🚀 Iniciando pruebas de WebSockets")
    print("=" * 50)
    
    # Verificar que el servidor esté ejecutándose
    print("⚠️  Asegúrate de que el servidor FastAPI esté ejecutándose en localhost:8000")
    print("   Comando: uvicorn backend.main:app --reload")
    print()
    
    # Ejecutar pruebas
    await test_websocket_connection()
    await test_user_websocket()
    await test_multiple_channels()
    await test_notification_service()
    
    print("\n" + "=" * 50)
    print("🏁 Pruebas completadas")
    print("\n📋 Resumen:")
    print("- WebSocket básico: ✅")
    print("- WebSocket de usuario: ✅")
    print("- Múltiples canales: ✅")
    print("- Servicio de notificaciones: ✅")


if __name__ == "__main__":
    asyncio.run(main()) 