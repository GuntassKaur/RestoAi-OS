from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/inventory", tags=["inventory"])

@router.get("/", response_model=List[schemas.InventoryItem])
async def get_inventory(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.InventoryItem))
    return result.scalars().all()

@router.post("/", response_model=schemas.InventoryItem)
async def create_item(item: schemas.InventoryItemCreate, db: AsyncSession = Depends(get_db)):
    db_item = models.InventoryItem(**item.model_dump())
    db.add(db_item)
    await db.commit()
    await db.refresh(db_item)
    return db_item

@router.put("/{id}", response_model=schemas.InventoryItem)
async def update_item(id: int, item: schemas.InventoryItemCreate, db: AsyncSession = Depends(get_db)):
    db_item = await db.get(models.InventoryItem, id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    await db.commit()
    await db.refresh(db_item)
    return db_item

@router.delete("/{id}")
async def delete_item(id: int, db: AsyncSession = Depends(get_db)):
    db_item = await db.get(models.InventoryItem, id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    await db.delete(db_item)
    await db.commit()
    return {"detail": "Item deleted"}

@router.get("/alerts", response_model=List[schemas.InventoryItem])
async def get_alerts(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(models.InventoryItem).filter(models.InventoryItem.quantity < models.InventoryItem.reorder_threshold)
    )
    return result.scalars().all()
