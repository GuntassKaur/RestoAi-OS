import asyncio
from agent.graph import get_agent_graph

async def main():
    print('Getting graph...')
    try:
        graph = get_agent_graph()
        print('Graph:', graph)
        res = await graph.ainvoke({'messages': [{'role': 'user', 'content': 'Hi'}]})
        print(res)
    except Exception as e:
        print("ERROR:", str(e))

if __name__ == "__main__":
    asyncio.run(main())
