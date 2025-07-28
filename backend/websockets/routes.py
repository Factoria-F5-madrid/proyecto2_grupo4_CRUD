from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from .manager import manager
import json
from typing import Optional


router = APIRouter()


@router.websocket("/ws/{channel}")
async def websocket_endpoint(websocket: WebSocket, channel: str):
 
    await manager.connect(websocket, channel)
    try:
        while True:
       
            data = await websocket.receive_text()
            try:
                message = json.loads(data)
            
                print(f"Mensaje recibido en canal {channel}: {message}")
            except json.JSONDecodeError:
                print(f"Mensaje no válido recibido: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket, channel)


@router.websocket("/ws/user/{user_id}")
async def user_websocket_endpoint(websocket: WebSocket, user_id: str):

    await manager.connect(websocket, "users")
    manager.user_connections[user_id] = websocket
    
    try:
        while True:
            data = await websocket.receive_text()
            try:
                message = json.loads(data)
                print(f"Mensaje de usuario {user_id}: {message}")
            except json.JSONDecodeError:
                print(f"Mensaje no válido del usuario {user_id}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket, "users")
        if user_id in manager.user_connections:
            del manager.user_connections[user_id]


@router.websocket("/ws/pets")
async def pets_websocket_endpoint(websocket: WebSocket):
  
    await manager.connect(websocket, "pets")
    try:
        while True:
            data = await websocket.receive_text()
            try:
                message = json.loads(data)
                print(f"Actualización de mascotas: {message}")
            except json.JSONDecodeError:
                print(f"Mensaje no válido en canal mascotas: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket, "pets")


@router.websocket("/ws/reservations")
async def reservations_websocket_endpoint(websocket: WebSocket):
  
    await manager.connect(websocket, "reservations")
    try:
        while True:
            data = await websocket.receive_text()
            try:
                message = json.loads(data)
                print(f"Actualización de reservas: {message}")
            except json.JSONDecodeError:
                print(f"Mensaje no válido en canal reservas: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket, "reservations")


@router.websocket("/ws/payments")
async def payments_websocket_endpoint(websocket: WebSocket):
  
    await manager.connect(websocket, "payments")
    try:
        while True:
            data = await websocket.receive_text()
            try:
                message = json.loads(data)
                print(f"Actualización de pagos: {message}")
            except json.JSONDecodeError:
                print(f"Mensaje no válido en canal pagos: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket, "payments")


@router.websocket("/ws/invoices")
async def invoices_websocket_endpoint(websocket: WebSocket):

    await manager.connect(websocket, "invoices")
    try:
        while True:
            data = await websocket.receive_text()
            try:
                message = json.loads(data)
                print(f"Actualización de facturas: {message}")
            except json.JSONDecodeError:
                print(f"Mensaje no válido en canal facturas: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket, "invoices")


@router.websocket("/ws/medical-history")
async def medical_history_websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket, "medical_history")
    try:
        while True:
            data = await websocket.receive_text()
            try:
                message = json.loads(data)
                print(f"Actualización de historial médico: {message}")
            except json.JSONDecodeError:
                print(f"Mensaje no válido en canal historial médico: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket, "medical_history")


@router.websocket("/ws/services")
async def services_websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket, "services")
    try:
        while True:
            data = await websocket.receive_text()
            try:
                message = json.loads(data)
                print(f"Actualización de servicios: {message}")
            except json.JSONDecodeError:
                print(f"Mensaje no válido en canal servicios: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket, "services")


@router.websocket("/ws/employees")
async def employees_websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket, "employees")
    try:
        while True:
            data = await websocket.receive_text()
            try:
                message = json.loads(data)
                print(f"Actualización de empleados: {message}")
            except json.JSONDecodeError:
                print(f"Mensaje no válido en canal empleados: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket, "employees")


@router.websocket("/ws/activity-logs")
async def activity_logs_websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket, "activity_logs")
    try:
        while True:
            data = await websocket.receive_text()
            try:
                message = json.loads(data)
                print(f"Actualización de logs de actividad: {message}")
            except json.JSONDecodeError:
                print(f"Mensaje no válido en canal logs de actividad: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket, "activity_logs") 