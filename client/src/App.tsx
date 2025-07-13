import { useState } from "react";
import { Send } from "lucide-react";

const ChatbotLayout = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [loading, setloading] = useState(false);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    setloading(true)
  };

  return (
    <div className="flex flex-col w-full h-screen mx-auto border shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4 text-lg font-semibold">
        Chatbot Assistant
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 flex flex-row flex-nowrap items-center gap-[10px] max-w-xs rounded-lg ${msg.sender === "user"
              ? "ml-auto bg-blue-500 text-white"
              : "mr-auto bg-gray-200 text-gray-800"
              }`}
          >
            <div className={`${msg.sender === "user" ? "hidden" : ""} cursor-pointer z-30 text-white right-8 top-20 bg-black p-2 rounded-full`}>
              <img src="/gemini.svg" alt="gemini" width={20} height={20} />
            </div>
            <span className={`text-sm ${msg.sender === "user" ? "text-white" : "text-gray-500"}`}>
              {msg.text}
            </span>
          </div>
        ))}
        <div className={`${loading? "flex" : "hidden"}`}>
          <span className="text">Loading</span><span>.</span><span>.</span><span>.</span>
        </div>
      </div>

      {/* Input */}
      <div className="flex p-4 border-t bg-white">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 rounded-xl p-2 outline-none bg-gray-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-700 text-white p-2 rounded-xl"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatbotLayout;
