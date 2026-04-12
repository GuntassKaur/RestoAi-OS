from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from database import Base

class OrderStatus(str, enum.Enum):
    RECEIVED = "received"
    PREPARING = "preparing"
    READY = "ready"
    SERVED = "served"

class InventoryItem(Base):
    __tablename__ = "inventory_items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    category = Column(String, nullable=False)
    quantity = Column(Float, nullable=False, default=0.0)
    unit = Column(String, nullable=False)
    reorder_threshold = Column(Float, nullable=False, default=10.0)
    cost_per_unit = Column(Float, nullable=False, default=0.0)
    supplier_name = Column(String, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Staff(Base):
    __tablename__ = "staff"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    
    shifts = relationship("Shift", back_populates="staff")

class Shift(Base):
    __tablename__ = "shifts"
    id = Column(Integer, primary_key=True, index=True)
    staff_id = Column(Integer, ForeignKey("staff.id"))
    date = Column(DateTime, default=datetime.utcnow)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    
    staff = relationship("Staff", back_populates="shifts")

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    table_number = Column(Integer, nullable=True)
    status = Column(Enum(OrderStatus), default=OrderStatus.RECEIVED)
    total = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    item_name = Column(String, nullable=False)
    qty = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)

    order = relationship("Order", back_populates="items")
