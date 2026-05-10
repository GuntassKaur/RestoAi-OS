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

SYSTEM_PROMPT = """You are DINEVA, an intelligent operations assistant (powered by Gemini) for a restaurant. 
You have direct access to the restaurant's database. 
Be concise, use INR for currency, and hamesha actionable insights provide karein.
If a user asks for something you can't do, inform them politely."""

def get_agent_graph():
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        return None
    
    # Force initialization without fallback checks
    # Use a more widely available model
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0)
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
    messages = [(h["role"], h["content"]) for h in history]
    messages.append(("user", query))
    
    try:
        graph = get_agent_graph()
        if not graph:
            yield "DINEVA: API Key missing in backend/.env. Please add GOOGLE_API_KEY."
            return

        async for event in graph.astream({"messages": messages}, stream_mode="values"):
            # values mode returns the full state at each step. 
            # We want the last message's content if it's from the assistant.
            if "messages" in event:
                last_msg = event["messages"][-1]
                if hasattr(last_msg, "content") and last_msg.type == "ai":
                    # For astream, this might be tricky. Let's use "messages" mode instead but fix the extraction
                    pass
        
        # Actually, let's revert to a simpler non-streaming for now if streaming is buggy, 
        # or fix the extraction for 'messages' mode.
        async for chunk, metadata in graph.astream({"messages": messages}, stream_mode="messages"):
            if chunk and hasattr(chunk, "content") and chunk.content:
                yield chunk.content
    except Exception as e:
        # Check for common database/query triggers in query for basic fallback
        query_lc = query.lower()
        if "inventory" in query_lc or "stock" in query_lc:
            data = await get_inventory_status.ainvoke({})
            yield f"DINEVA (Offline Logic): {data[:500]}"
        elif "revenue" in query_lc:
            data = await get_revenue_summary.ainvoke({"days": 7})
            yield f"DINEVA (Offline Logic): {data}"
        else:
            yield f"Neural Link Error: {str(e)[:100]}. System is still operational. Try asking for specific data like 'inventory' or 'staff'."
