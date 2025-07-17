from sqlalchemy import Column, Integer, BigInteger, String, Text, TIMESTAMP, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class ActivityLogList(Base):
    __tablename__ = "activity_log_list"  # Si insistes en guiones, usa: "activity-log-list"

    id_activity = Column(Integer, primary_key=True, autoincrement=True) # crae clave primaria
    contact_type = Column(String(50), nullable=False)
    details = Column(String(255), nullable=True)
    momento = Column(TIMESTAMP(timezone=False), nullable=False, server_default=func.now())
    user_id = Column(Integer, ForeignKey("user.user_id"))
    reservation_id = Column(Integer, ForeignKey("reservation.reservation_id"))