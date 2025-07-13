import os
from agents import AsyncOpenAI , OpenAIChatCompletionsModel, RunConfig
from dotenv import load_dotenv

## 1._____ Getting envs ...
load_dotenv()
api_key=os.getenv("GEMINI_API_KEY")

## 2. _____ Creating client ...
client = AsyncOpenAI(
    api_key=api_key,
    base_url= "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
)

## 3. ______ Creating model ...
model = OpenAIChatCompletionsModel(
    model="gemini-2.0-flash",
    openai_client=client
)

## 4. ______ Final Configuration ...
config = RunConfig(
    model=model,
    model_provider=client,
    tracing_disabled=True,
)