from pydantic import BaseModel
from typing import Optional
from datetime import time
from backend.models.enums import ServiceTypeEnum  

class ServiceBase(BaseModel):
    lodging: bool
    service_type: ServiceTypeEnum
    other_service: Optional[str] = None
    notes: Optional[str] = None
    base_price: float
    duration: Optional[time] = None

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseModel):
    lodging: Optional[bool]
    service_type: Optional[ServiceTypeEnum]
    other_service: Optional[str]
    notes: Optional[str]
    base_price: Optional[float]
    duration: Optional[time]

from datetime import datetime

class ServiceOut(ServiceBase):
    service_id: int
    created_at: datetime

    class Config:
         model_config = {"from_attributes": True}
