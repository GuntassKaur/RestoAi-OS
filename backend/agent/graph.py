import os
import logging
from dotenv import load_dotenv
from langgraph.prebuilt import create_react_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from agent.tools import (
    get_inventory_status, 
    get_low_stock_items, 
    get_revenue_summary, 
    get_todays_orders, 
    get_staff_on_duty, 
    create_purchase_order
)

load_dotenv()

SYSTEM_PROMPT = """You are RestoAI, an intelligent operations assistant (powered by Gemini) for a restaurant. 
You have direct access to the restaurant's database. 
Be concise, use INR for currency, and hamesha actionable insights provide karein.
If a user asks for something you can't do, inform them politely."""

def get_agent_graph():
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        return None
    
    # Force initialization without fallback checks
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash-latest", temperature=0)
    tools = [
        get_inventory_status, 
        get_low_stock_items, 
        get_revenue_summary, 
        get_todays_orders, 
        get_staff_on_duty, 
        create_purchase_order
    ]
    graph = create_react_agent(llm, tools, prompt=SYSTEM_PROMPT)
    return graph

async def stream_agent_responses(query: str, history: list = []):
    messages = [{"role": h["role"], "content": h["content"]} for h in history]
    messages.append({"role": "user", "content": query})
    
    try:
        graph = get_agent_graph()
        if not graph:
            yield "RestoAI: API Key missing in backend/.env. Please add GOOGLE_API_KEY."
            return

        async for chunk in graph.astream({"messages": messages}, stream_mode="messages"):
            token = ""
            if isinstance(chunk, tuple):
                token = chunk[0].content if hasattr(chunk[0], 'content') else ""
            elif hasattr(chunk, 'content'):
                token = chunk.content
            
            if token:
                yield token
    except Exception as e:
        # Check for common database/query triggers in query for basic fallback
        query_lc = query.lower()
        if "inventory" in query_lc or "stock" in query_lc:
            data = await get_inventory_status.ainvoke({})
            yield f"RestoAI (Offline Logic): {data[:500]}"
        elif "revenue" in query_lc:
            data = await get_revenue_summary.ainvoke({"days": 7})
            yield f"RestoAI (Offline Logic): {data}"
        else:
            yield f"Neural Link Error: {str(e)[:100]}. System is still operational. Try asking for specific data like 'inventory' or 'staff'."
