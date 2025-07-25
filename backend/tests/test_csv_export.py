"""
Test script for CSV export functionality
"""

import requests
import json
import os
from datetime import datetime

BASE_URL = "http://localhost:8000"
EXPORT_DIR = "exports"

def create_export_directory():
    if not os.path.exists(EXPORT_DIR):
        os.makedirs(EXPORT_DIR)
        print(f"Directory '{EXPORT_DIR}' created")

def export_users():
    print("Exporting users...")
    
    response = requests.get(f"{BASE_URL}/export/users/csv")
    if response.status_code == 200:
        filename = f"{EXPORT_DIR}/usuarios_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"Users exported to: {filename}")
    else:
        print(f"Error exporting users: {response.status_code}")

def export_pets():
    print("Exporting pets...")
    
    response = requests.get(f"{BASE_URL}/export/pets/csv")
    if response.status_code == 200:
        filename = f"{EXPORT_DIR}/mascotas_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"Pets exported to: {filename}")
    else:
        print(f"Error exporting pets: {response.status_code}")

def export_reservations():
    print("Exporting reservations...")
    
    response = requests.get(f"{BASE_URL}/export/reservations/csv")
    if response.status_code == 200:
        filename = f"{EXPORT_DIR}/reservas_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"Reservations exported to: {filename}")
    else:
        print(f"Error exporting reservations: {response.status_code}")

def export_services():
    print("Exporting services...")
    
    response = requests.get(f"{BASE_URL}/export/services/csv")
    if response.status_code == 200:
        filename = f"{EXPORT_DIR}/servicios_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"Services exported to: {filename}")
    else:
        print(f"Error exporting services: {response.status_code}")

def export_employees():
    print("Exporting employees...")
    
    response = requests.get(f"{BASE_URL}/export/employees/csv")
    if response.status_code == 200:
        filename = f"{EXPORT_DIR}/empleados_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"Employees exported to: {filename}")
    else:
        print(f"Error exporting employees: {response.status_code}")

def export_invoices():
    print("Exporting invoices...")
    
    response = requests.get(f"{BASE_URL}/export/invoices/csv")
    if response.status_code == 200:
        filename = f"{EXPORT_DIR}/facturas_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"Invoices exported to: {filename}")
    else:
        print(f"Error exporting invoices: {response.status_code}")

def export_payments():
    print("Exporting payments...")
    
    response = requests.get(f"{BASE_URL}/export/payments/csv")
    if response.status_code == 200:
        filename = f"{EXPORT_DIR}/pagos_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"Payments exported to: {filename}")
    else:
        print(f"Error exporting payments: {response.status_code}")

def test_generic_export():
    print("Testing generic export...")
    
    entities = ["users", "pets", "reservations", "services", "employees", "invoices", "payments"]
    
    for entity in entities:
        print(f"  Exporting {entity}...")
        response = requests.get(f"{BASE_URL}/export/all/csv?entity={entity}")
        if response.status_code == 200:
            filename = f"{EXPORT_DIR}/{entity}_generico_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
            with open(filename, "wb") as f:
                f.write(response.content)
            print(f"    {entity} exported successfully")
        else:
            print(f"    Error exporting {entity}: {response.status_code}")

def test_filters():
    print("Testing filters...")
    
    print("  Testing pets filter by user...")
    response = requests.get(f"{BASE_URL}/export/pets/csv?user_id=1")
    if response.status_code == 200:
        filename = f"{EXPORT_DIR}/mascotas_usuario_1_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"    Pets for user 1 exported successfully")
    else:
        print(f"    Error exporting filtered pets: {response.status_code}")

def check_server_status():
    try:
        response = requests.get(f"{BASE_URL}/")
        if response.status_code == 200:
            print("Server is running")
            return True
        else:
            print(f"Server responded with code: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("Cannot connect to server. Make sure it's running on http://localhost:8000")
        return False

def main():
    print("Starting CSV export tests")
    print("=" * 50)
    
    if not check_server_status():
        return
    
    create_export_directory()
    
    export_users()
    export_pets()
    export_reservations()
    export_services()
    export_employees()
    export_invoices()
    export_payments()
    
    test_generic_export()
    test_filters()
    
    print("\n" + "=" * 50)
    print("Tests completed")
    print(f"CSV files saved in directory: {EXPORT_DIR}")

if __name__ == "__main__":
    main() 