"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import Image from "next/image";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  time: string;
}

const quickReplies = [
  "How much does it cost?",
  "How long does it take?",
  "France visa requirements",
  "Canada Express Entry",
  "Book a consultation",
];

const botResponses: Record<string, string> = {
  default:
    "Thanks for reaching out! I'm the Travel Agency assistant. Our advisors will respond shortly. You can also WhatsApp us for an immediate response. 😊",
  cost:
    "Our fees start from $250 for visitor visas, $450 for student files, and $750 for work permits. Book a free evaluation to get an exact quote for your situation!",
  long:
    "Processing times vary: visitor visas (1–4 weeks), student visas (3–6 weeks), work permits (4–12 weeks). We always aim to be faster! 🚀",
  france:
    "For France, you'll need a valid passport, campus france registration (for students), proof of accommodation, financial resources, and a completed visa application. We prepare everything for you!",
  canada:
    "Canada Express Entry is a points-based system. Our RCIC-certified advisors will optimize your CRS score to maximize your invitation chances. Let's review your profile!",
  book:
    "Great! You can book your free 30-minute consultation at travelagency.com/contact, or chat with us directly on WhatsApp: +1 (514) 000-0000 💬",
};

function getBotResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("cost") || lower.includes("price") || lower.includes("fee") || lower.includes("much"))
    return botResponses.cost;
  if (lower.includes("long") || lower.includes("time") || lower.includes("duration") || lower.includes("weeks"))
    return botResponses.long;
  if (lower.includes("france") || lower.includes("français"))
    return botResponses.france;
  if (lower.includes("canada") || lower.includes("express"))
    return botResponses.canada;
  if (lower.includes("book") || lower.includes("consult") || lower.includes("appointment"))
    return botResponses.book;
  return botResponses.default;
}

const now = () =>
  new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "bot",
      text: "👋 Hi! Welcome to Travel Agency. How can I help you today?",
      time: now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), from: "user", text, time: now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const botMsg: Message = {
        id: Date.now() + 1,
        from: "bot",
        text: getBotResponse(text),
        time: now(),
      };
      setMessages((m) => [...m, botMsg]);
      if (!open) setUnread((u) => u + 1);
    }, 1200 + Math.random() * 800);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.5, type: "spring" }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-24 z-50 w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center shadow-2xl shadow-blue-700/40 hover:bg-navy transition-colors"
        aria-label="Live Chat"
      >
        {open ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={22} className="text-white" />
        )}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-44 right-6 z-50 w-80 h-[480px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-navy p-4 flex items-center gap-3">
              <div className="relative">
                <Image src="/logo.png" alt="Agent" width={36} height={36} className="rounded-full object-contain brightness-0 invert" loading="eager" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-navy" />
              </div>
              <div className="flex-1">
                <p className="text-white font-heading font-bold text-sm">Travel Agency</p>
                <p className="text-green-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                  Online — typically replies instantly
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.from === "bot" && (
                    <div className="w-7 h-7 bg-navy rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.from === "user"
                        ? "bg-blue-700 text-white rounded-tr-sm"
                        : "bg-white text-navy shadow-sm rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                    <p className={`text-xs mt-1 ${msg.from === "user" ? "text-blue-200" : "text-gray-400"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-navy rounded-full flex items-center justify-center">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [-3, 3, -3] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div className="px-3 py-2 flex gap-2 overflow-x-auto border-t border-gray-100 bg-white scrollbar-hide">
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  onClick={() => sendMessage(qr)}
                  className="flex-shrink-0 text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors font-medium whitespace-nowrap"
                >
                  {qr}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 rounded-full bg-gray-100 text-sm focus:outline-none focus:bg-blue-50 transition-colors"
                />
                <button
                  type="submit"
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-navy transition-colors flex-shrink-0"
                >
                  <Send size={15} className="text-white" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
