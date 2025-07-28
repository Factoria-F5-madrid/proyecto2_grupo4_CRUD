from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import time,datetime
from backend.models.enums import ServiceTypeEnum  

class ServiceBase(BaseModel):
    lodging: bool
    service_type: ServiceTypeEnum
    other_service: Optional[str] = None
    notes: Optional[str] = None
    base_price: float
    duration: Optional[time] = None
    image_url: Optional[str] = None

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseModel):
    lodging: Optional[bool]
    service_type: Optional[ServiceTypeEnum]
    other_service: Optional[str]
    notes: Optional[str]
    base_price: Optional[float]
    duration: Optional[time]
    image_url: Optional[str]

class ServiceOut(ServiceBase):
    service_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
