#!/bin/bash

# Script de utilidades para gestionar el servidor PetLand

SERVER_PORT=8000
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar ayuda
show_help() {
    echo -e "${BLUE}🐾 PetLand Server Utilities${NC}"
    echo ""
    echo "Uso: $0 [comando]"
    echo ""
    echo "Comandos disponibles:"
    echo "  start     - Iniciar el servidor"
    echo "  stop      - Detener el servidor"
    echo "  restart   - Reiniciar el servidor"
    echo "  status    - Verificar estado del servidor"
    echo "  logs      - Ver logs del servidor"
    echo "  clean     - Limpiar procesos y puertos"
    echo "  help      - Mostrar esta ayuda"
    echo ""
    echo "Ejemplos:"
    echo "  $0 start"
    echo "  $0 status"
    echo "  $0 stop"
}

# Función para verificar si el puerto está en uso
check_port() {
    if lsof -Pi :$SERVER_PORT -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Función para obtener PID del servidor
get_server_pid() {
    lsof -ti:$SERVER_PORT 2>/dev/null
}

# Función para iniciar el servidor
start_server() {
    echo -e "${GREEN}🚀 Iniciando servidor PetLand...${NC}"
    
    if check_port; then
        echo -e "${YELLOW}⚠️  Puerto $SERVER_PORT ya está en uso${NC}"
        echo -e "${BLUE}💡 Usa '$0 stop' para detener el servidor actual${NC}"
        return 1
    fi
    
    cd "$PROJECT_ROOT"
    python scripts/start_server.py &
    SERVER_PID=$!
    
    echo -e "${GREEN}✅ Servidor iniciado con PID: $SERVER_PID${NC}"
    echo -e "${BLUE}📍 URL: http://localhost:$SERVER_PORT${NC}"
    echo -e "${BLUE}📚 Docs: http://localhost:$SERVER_PORT/docs${NC}"
}

# Función para detener el servidor
stop_server() {
    echo -e "${YELLOW}🛑 Deteniendo servidor...${NC}"
    
    PIDS=$(get_server_pid)
    if [ -z "$PIDS" ]; then
        echo -e "${YELLOW}ℹ️  No hay servidor ejecutándose en puerto $SERVER_PORT${NC}"
        return 0
    fi
    
    for PID in $PIDS; do
        echo -e "${BLUE}🔄 Deteniendo proceso $PID...${NC}"
        kill -9 $PID 2>/dev/null
    done
    
    echo -e "${GREEN}✅ Servidor detenido${NC}"
}

# Función para reiniciar el servidor
restart_server() {
    echo -e "${BLUE}🔄 Reiniciando servidor...${NC}"
    stop_server
    sleep 2
    start_server
}

# Función para verificar estado
check_status() {
    if check_port; then
        PIDS=$(get_server_pid)
        echo -e "${GREEN}✅ Servidor ejecutándose${NC}"
        echo -e "${BLUE}📍 Puerto: $SERVER_PORT${NC}"
        echo -e "${BLUE}🆔 PIDs: $PIDS${NC}"
        echo -e "${BLUE}🌐 URL: http://localhost:$SERVER_PORT${NC}"
    else
        echo -e "${RED}❌ Servidor no está ejecutándose${NC}"
        echo -e "${BLUE}💡 Usa '$0 start' para iniciarlo${NC}"
    fi
}

# Función para ver logs
show_logs() {
    LOG_FILE="$PROJECT_ROOT/backend/logs/app.log"
    if [ -f "$LOG_FILE" ]; then
        echo -e "${BLUE}📝 Mostrando logs del servidor:${NC}"
        echo -e "${BLUE}📄 Archivo: $LOG_FILE${NC}"
        echo ""
        tail -f "$LOG_FILE"
    else
        echo -e "${YELLOW}⚠️  Archivo de logs no encontrado: $LOG_FILE${NC}"
    fi
}

# Función para limpiar procesos
clean_processes() {
    echo -e "${YELLOW}🧹 Limpiando procesos...${NC}"
    
    # Detener servidor si está ejecutándose
    if check_port; then
        stop_server
    fi
    
    # Limpiar procesos de Python relacionados
    PIDS=$(ps aux | grep -E "(uvicorn|start_server)" | grep -v grep | awk '{print $2}')
    if [ -n "$PIDS" ]; then
        echo -e "${BLUE}🔄 Deteniendo procesos de Python relacionados...${NC}"
        for PID in $PIDS; do
            kill -9 $PID 2>/dev/null
        done
    fi
    
    echo -e "${GREEN}✅ Limpieza completada${NC}"
}

# Función principal
main() {
    case "${1:-help}" in
        start)
            start_server
            ;;
        stop)
            stop_server
            ;;
        restart)
            restart_server
            ;;
        status)
            check_status
            ;;
        logs)
            show_logs
            ;;
        clean)
            clean_processes
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            echo -e "${RED}❌ Comando desconocido: $1${NC}"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Ejecutar función principal
main "$@" 