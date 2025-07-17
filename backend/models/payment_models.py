<<<<<<< HEAD
from sqlalchemy import Column, Integer, DECIMAL, Boolean, TIMESTAMP, func
from .base_models import Base
from .enums import SqlPaymentMethodEnum, SqlPaymentStatusEnum



class Payment(Base):
=======
from sqlalchemy import Column, Integer, String, DECIMAL, Boolean, TIMESTAMP, CheckConstraint, func
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

class payment(Base):
>>>>>>> 7474f79fc2d4baf13d2f3c980b59485b6392779c
    __tablename__ = "payment"

    payment_id = Column(Integer, primary_key=True, nullable=False)
    amount = Column(DECIMAL(10, 2), nullable=False)
<<<<<<< HEAD
    method = Column(SqlPaymentMethodEnum, nullable=False, server_default="IoT_Devices")
    payment_date = Column(TIMESTAMP(timezone=False), nullable=False, server_default=func.now())
    payment_status = Column(SqlPaymentStatusEnum, nullable=False, server_default="Pending")
    refund_return = Column(Boolean, nullable=False, server_default="false")
=======
    method = Column(String(255), nullable=False, default='IoT_Devices')
    payment_date = Column(TIMESTAMP(timezone=False), nullable=False, server_default=func.now())
    payment_status = Column(String(255), nullable=False, default='Pending')
    refund_return = Column(Boolean, nullable=False, default=False)

    __table_args__ = (
        CheckConstraint("method IN ('Cash', 'Card', 'Bank_Transfer', 'IoT_Devices')", name="chk_payment_method"),
        CheckConstraint("payment_status IN ('Pending', 'Approved', 'Rejected', 'Cancelled')", name="chk_payment_status"),
    )
>>>>>>> 7474f79fc2d4baf13d2f3c980b59485b6392779c
