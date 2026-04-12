from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
import json
from agent.graph import stream_agent_responses

router = APIRouter(prefix="/api/agent", tags=["agent"])

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

@router.post("/chat")
async def agent_chat(req: ChatRequest):
    async def event_generator():
        # history conversion
        history_list = [{"role": m.role, "content": m.content} for m in req.history]
        
        async for chunk in stream_agent_responses(req.message, history_list):
            # We wrap in a simple data: format for SSE-like streaming
            # Or just raw text if the frontend handles it via ReadableStream
            yield f"data: {json.dumps({'content': chunk})}\n\n"
        
        yield "data: [DONE]\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
