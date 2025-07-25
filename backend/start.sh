#!/bin/bash
# Script de inicio para producción

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones de base de datos
alembic upgrade head

# Iniciar la aplicación
uvicorn backend.main:app --host 0.0.0.0 --port $PORT 