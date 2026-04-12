from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from datetime import datetime, timedelta
import models
from database import get_db

router = APIRouter(prefix="/api/reports", tags=["reports"])

@router.get("/summary")
async def get_summary(db: AsyncSession = Depends(get_db)):
    today = datetime.utcnow().date()
    start_today = datetime.combine(today, datetime.min.time())
    start_month = today.replace(day=1)
    
    # Today's Revenue
    res_today = await db.execute(
        select(func.sum(models.Order.total)).filter(models.Order.created_at >= start_today)
    )
    today_rev = res_today.scalar() or 0
    
    # Today's Orders
    res_orders = await db.execute(
        select(func.count(models.Order.id)).filter(models.Order.created_at >= start_today)
    )
    today_count = res_orders.scalar() or 0
    
    # Monthly Revenue
    res_month = await db.execute(
        select(func.sum(models.Order.total)).filter(models.Order.created_at >= start_month)
    )
    month_rev = res_month.scalar() or 0
    
    # Low stock count
    res_low = await db.execute(
        select(func.count(models.InventoryItem.id))
        .filter(models.InventoryItem.quantity < models.InventoryItem.reorder_threshold)
    )
    low_count = res_low.scalar() or 0
    
    return {
        "today_revenue": today_rev,
        "today_orders": today_count,
        "monthly_revenue": month_rev,
        "low_stock_count": low_count
    }

@router.get("/revenue")
async def get_revenue_chart(days: int = 30, db: AsyncSession = Depends(get_db)):
    limit_date = datetime.utcnow() - timedelta(days=days)
    
    # Daily aggregation (simplified for SQLite/PG)
    # Using date(created_at) for grouping
    result = await db.execute(
        select(func.date(models.Order.created_at), func.sum(models.Order.total))
        .filter(models.Order.created_at >= limit_date)
        .group_by(func.date(models.Order.created_at))
        .order_by(func.date(models.Order.created_at))
    )
    
    return [{"date": row[0], "revenue": row[1]} for row in result.all()]
