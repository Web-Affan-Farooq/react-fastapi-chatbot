from typing import List , TypedDict

class ChatMessage(TypedDict):
    role:str
    message:str
    answer:str
    
ChatHistory = List[ChatMessage]
    