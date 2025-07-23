from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.user_routes import router as users_router
from backend.routes.service_routes import router as service_router 
from backend.routes.reservation_routes import router as reservations_router
from backend.routes.pet_routes import router as pets_router
from backend.routes.employee_routes import router as employee_router
from backend.routes.activity_log_routes import router as activity_log_router
from backend.routes.medical_history_routes import router as medical_history_router
from backend.routes.assignment_routes import router as assignment_router
from backend.routes.payment_routes import router as payment_router
from backend.routes.invoice_routes import router as invoice_router
from backend.routes.export_routes import router as export_router



from backend.db.database import AsyncSessionLocal

from backend.models.user_models import User
from backend.models.service_models import Service
from backend.models.reservation_models import Reservation
from backend.models.pet_models import Pet
from backend.models.employee_models import Employee
from backend.models.activity_log_models import ActivityLog
from backend.models.medical_history_models import MedicalHistory
from backend.models.assignment_models import Assignment
from backend.models.payment_models import Payment
from backend.models.invoice_models import Invoice


from backend.exceptions.handlers import register_exception_handlers

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)
register_exception_handlers(app)

@app.get("/")
def read_root():
    return {"message": "¡Funciona!"}

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


app.include_router(users_router, prefix="/users", tags=["Users"])
app.include_router(service_router, prefix="/services", tags=["Services"])
app.include_router(reservations_router, prefix="/reservations", tags=["Reservations"])
app.include_router(pets_router, prefix="/pets", tags=["Pets"])
app.include_router(employee_router, prefix="/employees", tags=["Employees"])
app.include_router(activity_log_router, prefix="/activitylogs", tags=["Activity Logs"])
app.include_router(medical_history_router, prefix="/medicalhistory", tags=["Medical History"])
app.include_router(assignment_router, prefix="/assignment", tags=["Assignment"])
app.include_router(payment_router, prefix="/payment", tags=["Payment"])
app.include_router(invoice_router, prefix="/invoice", tags=["Invoice"])
app.include_router(export_router, prefix="/export", tags=["Export"])

