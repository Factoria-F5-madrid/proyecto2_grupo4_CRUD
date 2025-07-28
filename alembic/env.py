import os
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from dotenv import load_dotenv

load_dotenv()

config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

ALEMBIC_DATABASE_URL = os.getenv("ALEMBIC_DATABASE_URL")
if not ALEMBIC_DATABASE_URL:
    raise RuntimeError("ALEMBIC_DATABASE_URL not found inside .env file")

config.set_main_option("sqlalchemy.url", ALEMBIC_DATABASE_URL) 


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

from backend.models.base_models import Base
target_metadata = Base.metadata


def run_migrations_offline():
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()