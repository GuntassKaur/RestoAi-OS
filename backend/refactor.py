import os
import shutil

base_dir = r"c:\Users\Harpartap\New folder\backend"
app_dir = os.path.join(base_dir, "app")

folders = ["api", "models", "schemas", "agents"]
for f in folders:
    os.makedirs(os.path.join(app_dir, f), exist_ok=True)
    open(os.path.join(app_dir, f, "__init__.py"), "w").close()

open(os.path.join(app_dir, "__init__.py"), "w").close()

# Move files
moves = [
    ("models.py", "app/models/models.py"),
    ("schemas.py", "app/schemas/schemas.py"),
    ("agent.py", "app/agents/agent.py"),
    ("crud.py", "app/api/crud.py"),
    ("main.py", "app/main.py"),
    ("database.py", "app/database.py"),
]

for src, dest in moves:
    src_path = os.path.join(base_dir, src)
    dest_path = os.path.join(base_dir, dest.replace("/", "\\"))
    if os.path.exists(src_path):
        shutil.move(src_path, dest_path)

# Update imports in main.py
main_path = os.path.join(app_dir, "main.py")
if os.path.exists(main_path):
    with open(main_path, "r") as f:
        content = f.read()
    content = content.replace("from . import models, schemas, crud, agent", "from app.models import models\nfrom app.schemas import schemas\nfrom app.api import crud\nfrom app.agents import agent")
    content = content.replace("from .database import engine, get_db, Base", "from app.database import engine, get_db, Base")
    with open(main_path, "w") as f:
        f.write(content)

# Update imports in agent.py
agent_path = os.path.join(app_dir, "agents", "agent.py")
if os.path.exists(agent_path):
    with open(agent_path, "r") as f:
        content = f.read()
    content = content.replace("from .database import AsyncSessionLocal", "from app.database import AsyncSessionLocal")
    content = content.replace("from . import crud, schemas", "from app.api import crud\nfrom app.schemas import schemas")
    content = content.replace("from .models import Supplier", "from app.models.models import Supplier")
    with open(agent_path, "w") as f:
        f.write(content)

# Update imports in crud.py
crud_path = os.path.join(app_dir, "api", "crud.py")
if os.path.exists(crud_path):
    with open(crud_path, "r") as f:
        content = f.read()
    content = content.replace("from . import models, schemas", "from app.models import models\nfrom app.schemas import schemas")
    with open(crud_path, "w") as f:
        f.write(content)

# Update imports in seed.py
seed_path = os.path.join(base_dir, "seed.py")
if os.path.exists(seed_path):
    with open(seed_path, "r") as f:
        content = f.read()
    content = content.replace("from database import engine, Base, AsyncSessionLocal", "from app.database import engine, Base, AsyncSessionLocal")
    content = content.replace("from models import InventoryItem", "from app.models.models import InventoryItem")
    content = content.replace("from schemas import InventoryItemCreate", "from app.schemas.schemas import InventoryItemCreate")
    with open(seed_path, "w") as f:
        f.write(content)
