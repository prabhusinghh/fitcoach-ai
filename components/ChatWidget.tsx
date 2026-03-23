"use client";

import { useEffect, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget({ stats }: any) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🟢 Load chat
  useEffect(() => {
    const saved = localStorage.getItem("chat");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // 🟢 Save chat
  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages:Message[] = [
      ...messages,
      { role: "user", content: input },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
          stats,
        }),
      });

      const reply = await res.json();

      setMessages([...newMessages, reply]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Something went wrong. Try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col h-[420px] border border-gray-100">
      
      {/* 🔥 HEADER WITH BOT */}
      <div className="flex items-center gap-3 p-4 border-b">
        <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full text-lg">
          🤖
        </div>
        <div>
          <h2 className="text-md font-semibold text-gray-900">
            AI Fitness Coach
          </h2>
          <p className="text-xs text-gray-500">Always here to guide you</p>
        </div>
      </div>

      {/* 🔥 MESSAGES */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-10">
            Ask anything about your fitness…
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-xl text-sm max-w-[75%] 
              ${
                msg.role === "user"
                  ? "bg-black text-white"
                  : "bg-white text-gray-900 shadow"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* 🔥 Typing indicator */}
        {loading && (
          <div className="text-gray-400 text-sm">AI is typing...</div>
        )}
      </div>

      {/* 🔥 INPUT BAR */}
      <div className="p-3 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 border border-gray-300 p-2 rounded-lg text-gray-900 
          focus:outline-none focus:ring-2 focus:ring-black transition"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className={`px-4 rounded-lg text-white transition active:scale-95
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:opacity-90"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
}