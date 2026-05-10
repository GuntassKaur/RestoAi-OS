print("Loading main.py...")
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
print("Importing database...")
from database import engine, Base
print("Importing routers...")
from routers import inventory, orders, staff, reports, agent
print("Importing manager...")
from routers.orders import manager
import uvicorn
from contextlib import asynccontextmanager

print("Defining lifespan...")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(title="DINEVA OS API", lifespan=lifespan)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://dineva.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health():
    return {"status": "healthy", "neural_link": "active"}

# Include Routers
app.include_router(inventory.router)
app.include_router(orders.router)
app.include_router(staff.router)
app.include_router(reports.router)
app.include_router(agent.router)

# WebSocket endpoint integrated with orders manager
@app.websocket("/ws/orders")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Handle ping/pong if needed
    except WebSocketDisconnect:
        manager.disconnect(websocket)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
