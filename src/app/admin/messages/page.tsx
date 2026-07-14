"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Send, Star, Archive, MoreVertical, Filter } from "lucide-react";

const threads = [
  {
    id: "TA-2026-04721",
    client: "Marcus Johnson",
    initials: "MJ",
    lastMsg: "Does my bank statement need to be certified?",
    time: "10 min ago",
    unread: 2,
    starred: false,
    destination: "🇨🇦 Canada",
    preview: "Your application is looking great! Just a quick question...",
  },
  {
    id: "TA-2026-04695",
    client: "Fatima Al-Rashidi",
    initials: "FA",
    lastMsg: "I received my university transcripts. Should I upload them now or wait?",
    time: "1 hour ago",
    unread: 1,
    starred: true,
    destination: "🇫🇷 France",
    preview: "Thank you for the fast response last time!",
  },
  {
    id: "TA-2026-04541",
    client: "Priya Nair",
    initials: "PN",
    lastMsg: "Hello! I just signed up and I'm very excited to get started.",
    time: "3 hours ago",
    unread: 1,
    starred: false,
    destination: "🇫🇷 France",
    preview: "Welcome to Travel Agency!",
  },
  {
    id: "TA-2026-03821",
    client: "Nadia Okonkwo",
    initials: "NO",
    lastMsg: "When will I know who my advisor is?",
    time: "Yesterday",
    unread: 1,
    starred: false,
    destination: "🇱🇺 Luxembourg",
    preview: "Your account has been created.",
  },
  {
    id: "TA-2026-04498",
    client: "Omar Hassan",
    initials: "OH",
    lastMsg: "I passed my IELTS with 7.5! Here are my results.",
    time: "2 days ago",
    unread: 0,
    starred: true,
    destination: "🇨🇦 Canada",
    preview: "Congratulations Omar!",
  },
  {
    id: "TA-2026-04612",
    client: "Yves Dupont",
    initials: "YD",
    lastMsg: "My employer has agreed to provide the reference letter.",
    time: "3 days ago",
    unread: 0,
    starred: false,
    destination: "🇱🇺 Luxembourg",
    preview: "Great news about your employer!",
  },
];

const demoConversations: Record<string, Array<{ from: "advisor" | "client"; text: string; time: string }>> = {
  "TA-2026-04721": [
    { from: "advisor", text: "Hello Marcus! Great to have you with us. Your profile evaluation came back strong — CRS score of 468 is excellent! 🎉", time: "June 10, 9:15" },
    { from: "client", text: "Thank you so much! What do I need to prepare?", time: "June 10, 10:32" },
    { from: "advisor", text: "Please check your Document Center — you'll see the full list. Priority is your bank statement, due July 2.", time: "June 10, 10:45" },
    { from: "client", text: "Does my bank statement need to be certified?", time: "Today, 10:30" },
  ],
  "TA-2026-04695": [
    { from: "advisor", text: "Bienvenue Fatima! Your France student visa application is underway. Your CampusFrance dossier has been submitted.", time: "June 5, 14:00" },
    { from: "client", text: "Merci! I received my university transcripts. Should I upload them now or wait?", time: "Today, 9:45" },
  ],
  "TA-2026-04541": [
    { from: "advisor", text: "Welcome to Travel Agency, Priya! We're excited to have you. Your file is being opened and an advisor will be assigned within 24 hours.", time: "Yesterday, 18:00" },
    { from: "client", text: "Hello! I just signed up and I'm very excited to get started.", time: "Today, 8:00" },
  ],
};

const quickReplies = [
  "Thank you for your message! I'll review this and get back to you within 24 hours.",
  "Your documents look great! Please proceed to upload the remaining items.",
  "Congratulations! Your visa has been approved. 🎉",
  "I need a few more details to process your request. Could you please...",
];

export default function AdminMessagesPage() {
  const [selected, setSelected] = useState(threads[0]);
  const [search, setSearch] = useState("");
  const [reply, setReply] = useState("");
  const [conversations, setConversations] = useState(demoConversations);

  const filtered = threads.filter((t) =>
    t.client.toLowerCase().includes(search.toLowerCase()) || t.id.includes(search)
  );

  const currentConvo = conversations[selected.id] || [];
  const unreadTotal = threads.reduce((sum, t) => sum + t.unread, 0);

  const sendReply = () => {
    if (!reply.trim()) return;
    setConversations((prev) => ({
      ...prev,
      [selected.id]: [...(prev[selected.id] || []), { from: "advisor", text: reply.trim(), time: "Just now" }],
    }));
    setReply("");
  };

  return (
    <div className="h-[calc(100vh-4rem)] lg:h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Thread list */}
        <div className="w-80 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading font-bold text-gray-900">Inbox</h2>
              {unreadTotal > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadTotal} unread</span>
              )}
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clients..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-xl text-xs focus:outline-none focus:bg-blue-50 transition-colors" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.map((thread) => (
              <button key={thread.id} onClick={() => setSelected(thread)}
                className={`w-full flex items-start gap-3 p-4 text-left border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                  selected.id === thread.id ? "bg-blue-50 border-l-2 border-l-blue-600" : ""
                }`}>
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-[#0A0F1E] flex items-center justify-center text-white text-xs font-bold">
                    {thread.initials}
                  </div>
                  {thread.unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">
                      {thread.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold truncate ${thread.unread > 0 ? "text-gray-900" : "text-gray-700"}`}>
                      {thread.client}
                    </span>
                    <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">{thread.time}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">{thread.destination}</span>
                  <p className={`text-xs truncate mt-0.5 ${thread.unread > 0 ? "text-gray-700 font-medium" : "text-gray-400"}`}>
                    {thread.lastMsg}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Convo header */}
          <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-[#0A0F1E] flex items-center justify-center text-white text-xs font-bold">
                {selected.initials}
              </div>
              <div>
                <p className="font-heading font-bold text-gray-900 text-base">{selected.client}</p>
                <p className="text-gray-500 text-xs">{selected.id} · {selected.destination}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 transition-colors">
                <Star size={16} />
              </button>
              <button className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                <Archive size={16} />
              </button>
              <button className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {currentConvo.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.from === "advisor" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[65%] rounded-2xl px-4 py-3 text-sm ${
                  msg.from === "advisor"
                    ? "bg-[#0A0F1E] text-white rounded-tr-sm"
                    : "bg-white text-gray-900 shadow-sm border border-gray-100 rounded-tl-sm"
                }`}>
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.from === "advisor" ? "text-white/40" : "text-gray-400"}`}>{msg.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick replies */}
          <div className="px-6 pb-2 flex gap-2 overflow-x-auto">
            {quickReplies.map((q) => (
              <button key={q} onClick={() => setReply(q)}
                className="flex-shrink-0 text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-600 hover:border-blue-400 hover:text-blue-700 transition-colors">
                {q.length > 40 ? q.slice(0, 40) + "…" : q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="bg-white border-t border-gray-100 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-[#0A0F1E] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                AD
              </div>
              <input value={reply} onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendReply(); }}
                placeholder={`Reply to ${selected.client} as advisor...`}
                className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:bg-blue-50 transition-colors" />
              <button onClick={sendReply} disabled={!reply.trim()}
                className="w-10 h-10 bg-[#0A0F1E] rounded-xl flex items-center justify-center text-white hover:opacity-90 disabled:opacity-40 transition-opacity flex-shrink-0">
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
