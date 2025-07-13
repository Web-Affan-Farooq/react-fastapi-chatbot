import chainlit as cl
from chatting_agent import bot
from agentsdk_gemini_adapter import config
from typing import cast
from agents import Agent , RunConfig, Runner
from schemas import ChatHistory

@cl.on_chat_start
async def start():
    global config, bot
    
    cl.user_session.set("chat_history",[])
    cl.user_session.set("config",config)
    cl.user_session.set("agent",bot)
    await cl.Message(content="Personal chatbot assistant How can I help you today").send()
    

@cl.on_message
async def begin_messaging(message:cl.Message):
    agent = cast(Agent,cl.user_session.get("agent"))
    config = cast(RunConfig,cl.user_session.get("config"))
    chat_history:ChatHistory = cast(ChatHistory,cl.user_session.get("chat_history"))
    
    msg = cl.Message("Thinking ...")
    await msg.send()
    
    try:
        result = Runner.run_sync(
        starting_agent=agent,
        run_config=config,
        input=message.content
    )
        msg.content = result.final_output
        await msg.update()
    except Exception as e:
        print("Error occured while processing prompt ... : ",e)
        msg.content = "An error occured" 
        await msg.update()