"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Star, Phone, Video, MoreVertical } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface Message {
  id: number;
  from: "advisor" | "client";
  text: string;
  time: string;
  date?: string;
  read?: boolean;
}

const initialMessages: Message[] = [
  { id: 1, from: "advisor", text: "Hello! Welcome to Travel Agency. I'm Aminata, your dedicated immigration advisor. I'm here to guide you through every step of your journey to Canada. 🎉", time: "9:15 AM", date: "June 10, 2026" },
  { id: 2, from: "advisor", text: "I've reviewed your profile and I'm pleased to confirm that you're an excellent candidate for the Canada Express Entry program. Your CRS score of 468 puts you well above the current invitation threshold.", time: "9:16 AM" },
  { id: 3, from: "client", text: "Thank you so much! I'm really excited about this opportunity. What are the next steps?", time: "10:32 AM" },
  { id: 4, from: "advisor", text: "Great enthusiasm! Here's what happens next:\n\n1. You'll receive a list of required documents in your Document Center\n2. Please start gathering them as soon as possible — some take time to obtain\n3. Priority item: your bank statement showing 3 months of transactions\n\nDo you have any questions about any of the documents?", time: "10:45 AM" },
  { id: 5, from: "client", text: "I have a question about the bank statement — does it need to be certified by the bank?", time: "11:02 AM" },
  { id: 6, from: "advisor", text: "Great question! Yes, the bank statement should be on official bank letterhead and either stamped by the bank or downloaded directly from your online banking portal as a PDF. It does NOT need to be notarized — just official.", time: "11:08 AM" },
  { id: 7, from: "advisor", text: "Also, I noticed your language test results aren't in yet. Do you have an upcoming IELTS or TEF test scheduled? We need a minimum CLB 7 (IELTS 6.0) for your target pathway. Let me know if you need test prep resources! 📚", time: "June 25, 2026", date: "June 25, 2026" },
  { id: 8, from: "client", text: "I'm scheduled for IELTS on July 1st. Should I choose Academic or General Training?", time: "2:15 PM" },
  { id: 9, from: "advisor", text: "Perfect timing! 🌟 For Express Entry to Canada, you need the **General Training** format. Please make sure to register under that option. The Academic format is only for study-specific purposes.\n\nGood luck on July 1st — I'm sure you'll do great!", time: "2:22 PM" },
  { id: 10, from: "advisor", text: "Friendly reminder: your bank statement is due on July 2nd — tomorrow! Please upload it to your Document Center as soon as possible so we can stay on schedule. 📎", time: "9:00 AM", date: "June 29, 2026", read: false },
  { id: 11, from: "advisor", text: "How is everything going? Don't hesitate to reach out if you have any questions — I'm always here! 😊", time: "9:05 AM", read: false },
];

const fmt = () => new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const advisorReplies = [
    "Great question! Let me check that for you and get back to you shortly.",
    "I understand your concern. Based on your file, everything looks good so far. Keep collecting the required documents and we'll be well prepared!",
    "That's a very common question. Yes, everything you've described is within our normal process — nothing to worry about.",
    "Thank you for the update! I'll note that in your file. Please continue uploading the remaining documents when you have them.",
    "Perfect — I'll follow up with the relevant authority and let you know within 24-48 hours. 👍",
  ];

  const send = () => {
    if (!input.trim()) return;
    const msg: Message = { id: Date.now(), from: "client", text: input.trim(), time: fmt() };
    setMessages((m) => [...m, msg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply: Message = {
        id: Date.now() + 1,
        from: "advisor",
        text: advisorReplies[Math.floor(Math.random() * advisorReplies.length)],
        time: fmt(),
      };
      setMessages((m) => [...m, reply]);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="h-[calc(100vh-4rem)] lg:h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 shadow-sm flex-shrink-0">
        <div className="relative">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Advisor" className="w-11 h-11 rounded-full object-cover" />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        </div>
        <div className="flex-1">
          <p className="font-heading font-bold text-navy text-base">Aminata Coulibaly</p>
          <p className="text-green-600 text-xs flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
            Online — Senior Immigration Specialist
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 mr-2">
            {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-gold fill-gold" />)}
          </div>
          <a
            href="tel:+237650921917"
            className="group relative p-2.5 rounded-xl text-white bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:scale-105"
            title="Audio Call"
          >
            <Phone size={17} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping opacity-75" />
          </a>
          <a
            href="https://meet.google.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-2.5 rounded-xl text-white bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105"
            title="Video Call (Google Meet)"
          >
            <Video size={17} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping opacity-75" />
          </a>
          <a
            href="https://wa.me/237650921917"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-2.5 rounded-xl text-white bg-gradient-to-br from-[#25D366] to-[#128C7E] hover:from-[#22c55e] hover:to-[#15803d] transition-all shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:scale-105"
            title="WhatsApp Call"
          >
            <svg width={17} height={17} fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
          <button className="p-2 rounded-xl text-gray-400 hover:text-navy hover:bg-gray-100 transition-colors">
            <MoreVertical size={17} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg, i) => {
          const isClient = msg.from === "client";
          const showDate = msg.date && (i === 0 || messages[i - 1].date !== msg.date);

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="text-center my-4">
                  <span className="bg-white text-gray-400 text-xs px-4 py-1.5 rounded-full border border-gray-200 font-medium shadow-sm">
                    {msg.date}
                  </span>
                </div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isClient ? "justify-end" : "justify-start"} gap-3`}
              >
                {!isClient && (
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Advisor"
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1" />
                )}
                <div className={`max-w-[72%] ${isClient ? "items-end" : "items-start"} flex flex-col`}>
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    isClient
                      ? "bg-blue-700 text-white rounded-tr-sm"
                      : "bg-white text-navy shadow-sm rounded-tl-sm border border-gray-100"
                  }`}>
                    {msg.text}
                  </div>
                  <span className={`text-xs mt-1 ${isClient ? "text-gray-400" : "text-gray-400"}`}>{msg.time}</span>
                </div>
                {isClient && (
                  <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center flex-shrink-0 mt-1 text-white font-bold text-xs">
                    {user?.firstName?.[0] || "Y"}
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}

        {typing && (
          <div className="flex items-center gap-3">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Advisor" className="w-8 h-8 rounded-full object-cover" />
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div key={i} className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ y: [-3, 3, -3] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:text-navy transition-colors flex-shrink-0">
            <Paperclip size={18} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Type your message to your advisor..."
            className="flex-1 px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none focus:bg-blue-50 transition-colors"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="w-11 h-11 bg-blue-700 rounded-full flex items-center justify-center hover:bg-navy transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          Messages are end-to-end encrypted · Emergency: WhatsApp +1 (514) 000-0000
        </p>
      </div>
    </div>
  );
}
