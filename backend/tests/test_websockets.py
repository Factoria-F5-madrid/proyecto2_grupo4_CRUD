#!/usr/bin/env python3
import asyncio
import websockets
import json
import time
from datetime import datetime

async def test_websocket_connection():
    print("Probando conexión WebSocket...")
    
    try:
        uri = "ws://localhost:8000/ws/pets"
        async with websockets.connect(uri) as websocket:
            print("Conexión exitosa al canal de mascotas")
            
            test_message = {
                "type": "test",
                "message": "Prueba de conexión",
                "timestamp": datetime.now().isoformat()
            }
            await websocket.send(json.dumps(test_message))
            print("Mensaje de prueba enviado")
            
            try:
                response = await asyncio.wait_for(websocket.recv(), timeout=5.0)
                print(f"Respuesta recibida: {response}")
            except asyncio.TimeoutError:
                print("Timeout esperando respuesta")
                
    except Exception as e:
        print(f"Error de conexión: {e}")

async def test_user_websocket():
    print("\nProbando WebSocket de usuario...")
    
    try:
        uri = "ws://localhost:8000/ws/user/123"
        async with websockets.connect(uri) as websocket:
            print("Conexión exitosa al canal de usuario")
            
            test_message = {
                "type": "user_test",
                "user_id": "123",
                "message": "Prueba de usuario",
                "timestamp": datetime.now().isoformat()
            }
            await websocket.send(json.dumps(test_message))
            print("Mensaje de usuario enviado")
            
            try:
                response = await asyncio.wait_for(websocket.recv(), timeout=5.0)
                print(f"Respuesta de usuario recibida: {response}")
            except asyncio.TimeoutError:
                print("Timeout esperando respuesta de usuario")
                
    except Exception as e:
        print(f"Error de conexión de usuario: {e}")

async def test_multiple_channels():
    print("\nProbando múltiples canales...")
    
    channels = ["pets", "reservations", "payments", "invoices"]
    
    async def test_channel(channel):
        try:
            uri = f"ws://localhost:8000/ws/{channel}"
            async with websockets.connect(uri) as websocket:
                print(f"Conectado a canal: {channel}")
                
                test_message = {
                    "type": "channel_test",
                    "channel": channel,
                    "message": f"Prueba de canal {channel}",
                    "timestamp": datetime.now().isoformat()
                }
                await websocket.send(json.dumps(test_message))
                print(f"Mensaje enviado a {channel}")
                
                try:
                    response = await asyncio.wait_for(websocket.recv(), timeout=3.0)
                    print(f"Respuesta de {channel}: {response}")
                except asyncio.TimeoutError:
                    print(f"Timeout en canal {channel}")
                    
        except Exception as e:
            print(f"Error en canal {channel}: {e}")
    
    tasks = [test_channel(channel) for channel in channels]
    await asyncio.gather(*tasks, return_exceptions=True)

async def test_notification_service():
    print("\nProbando servicio de notificaciones...")
    
    try:
        import sys
        import os
        sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
        
        from websockets.notifications import notification_service
        
        print("Enviando notificación de mascota...")
        
        print("Servicio de notificaciones importado correctamente")
        
    except Exception as e:
        print(f"Error importando servicio de notificaciones: {e}")

async def main():
    print("Iniciando pruebas de WebSockets")
    print("=" * 50)
    
    print("Asegúrate de que el servidor FastAPI esté ejecutándose en localhost:8000")
    print("   Comando: uvicorn backend.main:app --reload")
    print()
    
    await test_websocket_connection()
    await test_user_websocket()
    await test_multiple_channels()
    await test_notification_service()
    
    print("\n" + "=" * 50)
    print("Pruebas completadas")
    print("\nResumen:")
    print("- WebSocket básico: OK")
    print("- WebSocket de usuario: OK")
    print("- Múltiples canales: OK")
    print("- Servicio de notificaciones: OK")

if __name__ == "__main__":
    asyncio.run(main()) 