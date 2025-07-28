import json
import asyncio
from typing import Dict, List, Set, Optional
from fastapi import WebSocket, WebSocketDisconnect
from datetime import datetime


class ConnectionManager:
 
    
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
        
        await websocket.accept()
        if channel not in self.active_connections:
            self.active_connections[channel] = []
        self.active_connections[channel].append(websocket)
        print(f"Cliente conectado al canal: {channel}")
    
    def disconnect(self, websocket: WebSocket, channel: str = "general"):
       
        if channel in self.active_connections:
            if websocket in self.active_connections[channel]:
                self.active_connections[channel].remove(websocket)
        print(f"Cliente desconectado del canal: {channel}")
    
    async def send_personal_message(self, message: str, websocket: WebSocket):
       
        try:
            await websocket.send_text(message)
        except Exception as e:
            print(f"Error enviando mensaje personal: {e}")
    
    async def broadcast_to_channel(self, message: str, channel: str):
       
        if channel in self.active_connections:
            disconnected = []
            for connection in self.active_connections[channel]:
                try:
                    await connection.send_text(message)
                except Exception as e:
                    print(f"Error enviando mensaje al canal {channel}: {e}")
                    disconnected.append(connection)
            
      
            for connection in disconnected:
                self.active_connections[channel].remove(connection)
    
    async def broadcast_to_all(self, message: str):
       
        for channel in self.active_connections:
            await self.broadcast_to_channel(message, channel)
    
    async def send_notification(self, user_id: str, notification_type: str, data: dict):
       
        message = {
            "type": "notification",
            "notification_type": notification_type,
            "user_id": user_id,
            "data": data,
            "timestamp": datetime.now().isoformat()
        }
        
        
        await self.broadcast_to_channel(json.dumps(message), "users")
    
    async def send_realtime_update(self, entity_type: str, action: str, data: dict):
      
        message = {
            "type": "realtime_update",
            "entity_type": entity_type,
            "action": action,
            "data": data,
            "timestamp": datetime.now().isoformat()
        }
        
      
        if entity_type in self.active_connections:
            await self.broadcast_to_channel(json.dumps(message), entity_type)
    
    def get_connection_count(self, channel: str = None) -> int:
      
        if channel:
            return len(self.active_connections.get(channel, []))
        return sum(len(connections) for connections in self.active_connections.values())



manager = ConnectionManager() 