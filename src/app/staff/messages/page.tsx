"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Search, Filter, Send, CheckCircle, Clock, User } from "lucide-react";

type Message = {
  id: string;
  clientName: string;
  clientAvatar?: string;
  subject: string;
  preview: string;
  status: "read" | "unread";
  timestamp: string;
  clientId: string;
};

export default function StaffMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  async function load() {
    const res = await fetch(`/api/staff/messages`);
    if (!res.ok) return;
    const data = await res.json();
    setMessages(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Messages</h1>
          <p className="text-gray-500 mt-1">Client communications</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
            <Search size={16} />
            Search
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Messages", value: messages.length, color: "bg-blue-100 text-blue-700" },
          { label: "Unread", value: messages.filter(m => m.status === "unread").length, color: "bg-green-100 text-green-700" },
          { label: "Today", value: messages.filter(m => new Date(m.timestamp).toDateString() === new Date().toDateString()).length, color: "bg-purple-100 text-purple-700" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <p className={`font-heading font-bold text-2xl mt-1 ${stat.color.split(" ")[1]}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Messages List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-heading font-bold text-navy text-lg">Inbox</h2>
        </div>

        {messages.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500">No messages</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.03 }}
                className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${msg.status === "unread" ? "bg-blue-50/50" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-navy/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-navy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-navy">{msg.clientName}</h3>
                        {msg.status === "unread" && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                        <Clock size={12} />
                        {new Date(msg.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <p className="font-medium text-gray-700 text-sm mb-1">{msg.subject}</p>
                    <p className="text-gray-500 text-sm line-clamp-1">{msg.preview}</p>
                  </div>
                  <button className="flex items-center gap-2 bg-navy text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors">
                    <Send size={14} />
                    Reply
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
