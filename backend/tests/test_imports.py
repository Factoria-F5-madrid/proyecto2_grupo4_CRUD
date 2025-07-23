import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))

print("Testing imports...")

try:
    print("1. Testing database import...")
    from backend.db.database import get_db
    print("✅ Database import successful")
except Exception as e:
    print(f"❌ Database import failed: {e}")

try:
    print("2. Testing activity_log_models import...")
    from backend.models.activity_log_models import ActivityLog
    print("✅ ActivityLog model import successful")
except Exception as e:
    print(f"❌ ActivityLog model import failed: {e}")

try:
    print("3. Testing activity_log_schema import...")
    from backend.schema.activity_log_schema import ActivityLogCreate
    print("✅ ActivityLog schema import successful")
except Exception as e:
    print(f"❌ ActivityLog schema import failed: {e}")

try:
    print("4. Testing activity_log_controller import...")
    from backend.controllers.activity_log_controller import create_activitylog_controller
    print("✅ ActivityLog controller import successful")
except Exception as e:
    print(f"❌ ActivityLog controller import failed: {e}")

try:
    print("5. Testing activity_log_routes import...")
    from backend.routes.activity_log_routes import router
    print("✅ ActivityLog routes import successful")
except Exception as e:
    print(f"❌ ActivityLog routes import failed: {e}")

try:
    print("6. Testing main.py import...")
    from backend.main import app
    print("✅ Main app import successful")
except Exception as e:
    print(f"❌ Main app import failed: {e}")

print("\nAll imports tested!") 