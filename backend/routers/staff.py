from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload
from typing import List
from datetime import datetime
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/staff", tags=["staff"])

@router.get("/", response_model=List[schemas.Staff])
async def get_staff(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Staff))
    return result.scalars().all()

@router.get("/on-duty")
async def get_on_duty(db: AsyncSession = Depends(get_db)):
    now = datetime.utcnow()
    # Find active shifts today
    result = await db.execute(
        select(models.Shift)
        .options(joinedload(models.Shift.staff))
        .filter(models.Shift.start_time <= now)
        .filter(models.Shift.end_time >= now)
    )
    shifts = result.scalars().all()
    return [{
        "name": s.staff.name,
        "role": s.staff.role,
        "shift_end": s.end_time
    } for s in shifts]
