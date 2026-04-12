from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from models import OrderStatus

# Inventory
class InventoryItemBase(BaseModel):
    name: str
    category: str
    quantity: float
    unit: str
    reorder_threshold: float
    cost_per_unit: float
    supplier_name: Optional[str] = None

class InventoryItemCreate(InventoryItemBase):
    pass

class InventoryItem(InventoryItemBase):
    id: int
    updated_at: datetime
    class Config:
        from_attributes = True

# Order Items
class OrderItemBase(BaseModel):
    item_name: str
    qty: int
    price: float

class OrderItemCreate(OrderItemBase):
    pass

class OrderItem(OrderItemBase):
    id: int
    order_id: int
    class Config:
        from_attributes = True

# Orders
class OrderBase(BaseModel):
    table_number: Optional[int] = None
    status: OrderStatus = OrderStatus.RECEIVED

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class Order(OrderBase):
    id: int
    total: float
    created_at: datetime
    items: List[OrderItem]
    class Config:
        from_attributes = True

# Staff
class StaffBase(BaseModel):
    name: str
    role: str
    phone: Optional[str] = None
    is_active: bool = True

class StaffCreate(StaffBase):
    pass

class Staff(StaffBase):
    id: int
    class Config:
        from_attributes = True

# Shift
class ShiftBase(BaseModel):
    staff_id: int
    start_time: datetime
    end_time: datetime

class ShiftCreate(ShiftBase):
    date: datetime

class Shift(ShiftBase):
    id: int
    date: datetime
    class Config:
        from_attributes = True
