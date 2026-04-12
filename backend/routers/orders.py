from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/orders", tags=["orders"])

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()

@router.get("/", response_model=List[schemas.Order])
async def get_orders(
    status: Optional[models.OrderStatus] = None, 
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    from sqlalchemy.orm import joinedload
    query = select(models.Order).options(joinedload(models.Order.items)).order_by(models.Order.created_at.desc()).limit(limit)
    if status:
        query = query.filter(models.Order.status == status)
    result = await db.execute(query)
    return result.unique().scalars().all()

@router.post("/", response_model=schemas.Order)
async def create_order(order: schemas.OrderCreate, db: AsyncSession = Depends(get_db)):
    total = sum(item.price * item.qty for item in order.items)
    db_order = models.Order(table_number=order.table_number, total=total, status=order.status)
    db.add(db_order)
    await db.commit()
    await db.refresh(db_order)
    
    for item in order.items:
        db_item = models.OrderItem(order_id=db_order.id, **item.model_dump())
        db.add(db_item)
    
    await db.commit()
    await db.refresh(db_order)
    
    await manager.broadcast({"type": "NEW_ORDER", "order_id": db_order.id, "table": db_order.table_number})
    return db_order

@router.put("/{id}/status", response_model=schemas.Order)
async def update_status(id: int, status: models.OrderStatus, db: AsyncSession = Depends(get_db)):
    db_order = await db.get(models.Order, id)
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    db_order.status = status
    await db.commit()
    await db.refresh(db_order)
    await manager.broadcast({"type": "STATUS_UPDATE", "order_id": id, "status": status})
    return db_order

# WebSocket route (usually registered on the app, but user asked for it in orders router context)
# We handle registration in main.py but keep manager here
