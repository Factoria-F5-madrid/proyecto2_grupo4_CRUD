import json
import asyncio
from typing import Dict, List, Set, Optional
from fastapi import WebSocket, WebSocketDisconnect
from datetime import datetime


class ConnectionManager:
    """Manager para manejar conexiones WebSocket"""
    
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {
            "users": [],
            "pets": [],
            "reservations": [],
            "payments": [],
            "invoices": [],
            "medical_history": [],
            "services": [],
            "employees": [],
            "activity_logs": []
        }
        self.user_connections: Dict[str, WebSocket] = {}  # user_id -> websocket
    
    async def connect(self, websocket: WebSocket, channel: str = "general"):
        """Conectar un websocket a un canal específico"""
        await websocket.accept()
        if channel not in self.active_connections:
            self.active_connections[channel] = []
        self.active_connections[channel].append(websocket)
        print(f"Cliente conectado al canal: {channel}")
    
    def disconnect(self, websocket: WebSocket, channel: str = "general"):
        """Desconectar un websocket de un canal"""
        if channel in self.active_connections:
            if websocket in self.active_connections[channel]:
                self.active_connections[channel].remove(websocket)
        print(f"Cliente desconectado del canal: {channel}")
    
    async def send_personal_message(self, message: str, websocket: WebSocket):
        """Enviar mensaje personal a un websocket específico"""
        try:
            await websocket.send_text(message)
        except Exception as e:
            print(f"Error enviando mensaje personal: {e}")
    
    async def broadcast_to_channel(self, message: str, channel: str):
        """Enviar mensaje a todos los websockets de un canal específico"""
        if channel in self.active_connections:
            disconnected = []
            for connection in self.active_connections[channel]:
                try:
                    await connection.send_text(message)
                except Exception as e:
                    print(f"Error enviando mensaje al canal {channel}: {e}")
                    disconnected.append(connection)
            
            # Limpiar conexiones desconectadas
            for connection in disconnected:
                self.active_connections[channel].remove(connection)
    
    async def broadcast_to_all(self, message: str):
        """Enviar mensaje a todos los websockets de todos los canales"""
        for channel in self.active_connections:
            await self.broadcast_to_channel(message, channel)
    
    async def send_notification(self, user_id: str, notification_type: str, data: dict):
        """Enviar notificación específica a un usuario"""
        try:
            message = {
                "type": "notification",
                "notification_type": notification_type,
                "user_id": user_id,
                "data": data,
                "timestamp": datetime.now().isoformat()
            }
            
            # Enviar a todos los canales relevantes
            await self.broadcast_to_channel(json.dumps(message), "users")
        except Exception as e:
            print(f"Error en send_notification: {e}")
            # No lanzar la excepción para evitar que falle la operación principal
    
    async def send_realtime_update(self, entity_type: str, action: str, data: dict):
        """Enviar actualización en tiempo real para una entidad específica"""
        try:
            message = {
                "type": "realtime_update",
                "entity_type": entity_type,
                "action": action,
                "data": data,
                "timestamp": datetime.now().isoformat()
            }
            
            # Enviar al canal correspondiente
            if entity_type in self.active_connections:
                await self.broadcast_to_channel(json.dumps(message), entity_type)
        except Exception as e:
            print(f"Error en send_realtime_update: {e}")
            # No lanzar la excepción para evitar que falle la operación principal
    
    def get_connection_count(self, channel: str = None) -> int:
        """Obtener el número de conexiones activas"""
        if channel:
            return len(self.active_connections.get(channel, []))
        return sum(len(connections) for connections in self.active_connections.values())


# Instancia global del manager
manager = ConnectionManager() 