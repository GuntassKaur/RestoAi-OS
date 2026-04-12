import asyncio
import random
from datetime import datetime, timedelta
from database import engine, Base, AsyncSessionLocal
from models import InventoryItem, Order, OrderItem, Staff, Shift, OrderStatus

async def seed_data():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        # 1. Indian Inventory
        items = [
            ("Tomato", "Vegetables", 40.5, "kg", 15.0, 30.0, "Fresh Mandi"),
            ("Onion", "Vegetables", 60.0, "kg", 20.0, 45.0, "Fresh Mandi"),
            ("Paneer", "Dairy", 12.0, "kg", 5.0, 450.0, "Amul Dairy"),
            ("Chicken Breast", "Meat", 25.0, "kg", 10.0, 280.0, "Eagle Poultry"),
            ("Basmati Rice", "Grains", 100.0, "kg", 20.0, 110.0, "Bhandari Grains"),
            ("Toor Dal", "Grains", 50.0, "kg", 15.0, 140.0, "Bhandari Grains"),
            ("Mustard Oil", "Pantry", 20.0, "L", 5.0, 160.0, "Fortune"),
            ("Ghee", "Pantry", 10.0, "L", 3.0, 650.0, "Mother Dairy"),
            ("Ginger-Garlic Paste", "Pantry", 5.0, "kg", 2.0, 180.0, "Local Prep"),
            ("Garam Masala", "Spices", 4.0, "kg", 1.0, 500.0, "MDH Spices"),
            ("Red Chilli Powder", "Spices", 3.0, "kg", 1.0, 400.0, "MDH Spices"),
            ("Turmeric", "Spices", 5.0, "kg", 1.0, 250.0, "MDH Spices"),
            ("Milk", "Dairy", 30.0, "L", 10.0, 60.0, "Amul"),
            ("Curd", "Dairy", 15.0, "kg", 5.0, 80.0, "Amul"),
            ("Coke 330ml", "Beverages", 120.0, "Units", 40.0, 35.0, "Coca Cola Corp"),
            ("Water Bottle 1L", "Beverages", 200.0, "Units", 50.0, 12.0, "Bislery"),
            ("Naan Flour", "Grains", 80.0, "kg", 20.0, 45.0, "Aashirvaad"),
            ("Butter", "Dairy", 10.0, "kg", 3.0, 550.0, "Amul"),
            ("Cream", "Dairy", 8.0, "L", 2.0, 220.0, "Amul"),
            ("Mutton", "Meat", 15.0, "kg", 5.0, 750.0, "Local Butcher"),
            ("Prawns", "Meat", 8.0, "kg", 3.0, 850.0, "Seafood Catch"),
            ("Lemon", "Vegetables", 50.0, "Units", 20.0, 5.0, "Local Vendor"),
            ("Coriander", "Vegetables", 10.0, "kg", 3.0, 40.0, "Local Vendor"),
            ("Sugar", "Pantry", 40.0, "kg", 10.0, 42.0, "Local Vendor"),
            ("Tea Leaves", "Beverages", 5.0, "kg", 2.0, 450.0, "Tata Tea"),
        ]
        
        db_items = []
        for name, cat, qty, unit, reorder, cost, supplier in items:
            it = InventoryItem(
                name=name, category=cat, quantity=qty, unit=unit, 
                reorder_threshold=reorder, cost_per_unit=cost, supplier_name=supplier
            )
            db.add(it)
            db_items.append(it)

        # 2. Staff
        staff_data = [
            ("Rajesh Kumar", "Manager", "9876543210"),
            ("Suresh Raina", "Executive Chef", "9876543211"),
            ("Amit Shah", "Sous Chef", "9876543212"),
            ("Vicky Kaushal", "Waiter", "9876543213"),
            ("Deepika P.", "Waiter", "9876543214"),
            ("Ranbir K.", "Waiter", "9876543215"),
            ("Alia B.", "Waiter", "9876543216"),
            ("Pankaj Tripathi", "Cashier", "9876543217"),
        ]
        
        db_staff = []
        for name, role, phone in staff_data:
            s = Staff(name=name, role=role, phone=phone, is_active=True)
            db.add(s)
            db_staff.append(s)
        
        await db.commit()

        # 3. Shifts (This week)
        now = datetime.utcnow()
        for s in db_staff:
            for i in range(7):
                day = now - timedelta(days=now.weekday()) + timedelta(days=i)
                start = day.replace(hour=9, minute=0, second=0)
                end = day.replace(hour=18, minute=0, second=0)
                shift = Shift(staff_id=s.id, date=day, start_time=start, end_time=end)
                db.add(shift)

        # 4. Orders (60 orders, last 30 days, ₹200-₹2000)
        menu_items = [
            ("Butter Chicken", 450), ("Paneer Tikka", 320), ("Dal Makhani", 280),
            ("Garlic Naan", 60), ("Jeera Rice", 180), ("Biryani", 350),
            ("Gulab Jamun", 120), ("Lassi", 90), ("Tandoori Roti", 30)
        ]
        
        for _ in range(60):
            days_ago = random.randint(0, 30)
            created_at = now - timedelta(days=days_ago, hours=random.randint(0, 23))
            
            # Select 2-5 random items
            chosen = random.sample(menu_items, random.randint(2, 5))
            total = sum(c[1] for c in chosen)
            
            status = OrderStatus.SERVED if days_ago > 0 else random.choice(list(OrderStatus))
            
            order = Order(
                table_number=random.randint(1, 15),
                status=status,
                total=float(total),
                created_at=created_at
            )
            db.add(order)
            await db.flush() # Get order ID
            
            for item_name, price in chosen:
                oi = OrderItem(order_id=order.id, item_name=item_name, qty=1, price=float(price))
                db.add(oi)

        await db.commit()
        print("RestoAI OS Database Seeded with Indian Restaurant Data!")

if __name__ == "__main__":
    asyncio.run(seed_data())
