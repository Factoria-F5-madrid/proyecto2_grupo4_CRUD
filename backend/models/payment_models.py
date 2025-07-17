from sqlalchemy import Column, Integer, DECIMAL, Boolean, TIMESTAMP, func
from .base_models import Base
from .enums import SqlPaymentMethodEnum, SqlPaymentStatusEnum



class Payment(Base):
    __tablename__ = "Payment"

    payment_id = Column(Integer, primary_key=True, nullable=False)
    amount = Column(DECIMAL(10, 2), nullable=False)
    method = Column(SqlPaymentMethodEnum, nullable=False, server_default="IoT_Devices")
    payment_date = Column(TIMESTAMP(timezone=False), nullable=False, server_default=func.now())
    payment_status = Column(SqlPaymentStatusEnum, nullable=False, server_default="Pending")
    refund_return = Column(Boolean, nullable=False, server_default="false")
