"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Ticket, Plus, MessageSquare, Clock, CheckCircle, AlertCircle, Search, Filter, Send } from "lucide-react";

type Ticket = {
  id: string;
  subject: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  createdAt: string;
  updatedAt: string;
  messages: number;
};

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showNewTicket, setShowNewTicket] = useState(false);

  async function load() {
    const res = await fetch(`/api/tickets`);
    if (!res.ok) return;
    const data = await res.json();
    setTickets(data);
  }

  useEffect(() => {
    load();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-green-100 text-green-700";
      case "in-progress": return "bg-blue-100 text-blue-700";
      case "resolved": return "bg-purple-100 text-purple-700";
      case "closed": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-green-50 text-green-600";
      case "medium": return "bg-yellow-50 text-yellow-600";
      case "high": return "bg-orange-50 text-orange-600";
      case "urgent": return "bg-red-50 text-red-600";
      default: return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Support Tickets</h1>
          <p className="text-gray-500 mt-1">Get help with your immigration case</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            Filter
          </button>
          <button
            onClick={() => setShowNewTicket(!showNewTicket)}
            className="flex items-center gap-2 bg-navy text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors"
          >
            <Plus size={16} />
            New Ticket
          </button>
        </div>
      </div>

      {showNewTicket && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
        >
          <h2 className="font-heading font-bold text-navy text-lg mb-4">Create New Ticket</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                placeholder="Brief description of your issue"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all">
                <option>General Inquiry</option>
                <option>Document Issue</option>
                <option>Payment Issue</option>
                <option>Appointment Issue</option>
                <option>Technical Issue</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={4}
                placeholder="Please describe your issue in detail"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors">
                <Send size={18} />
                Submit Ticket
              </button>
              <button
                onClick={() => setShowNewTicket(false)}
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tickets List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-heading font-bold text-navy text-lg">Your Tickets</h2>
        </div>

        {tickets.length === 0 ? (
          <div className="p-12 text-center">
            <Ticket className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500">No support tickets</p>
            <button
              onClick={() => setShowNewTicket(true)}
              className="mt-4 text-blue-700 font-semibold hover:underline"
            >
              Create your first ticket
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {tickets.map((ticket, i) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-heading font-bold text-navy">{ticket.subject}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-1">{ticket.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{ticket.category}</span>
                      <div className="flex items-center gap-1">
                        <MessageSquare size={12} />
                        {ticket.messages} messages
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(ticket.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 bg-navy text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
