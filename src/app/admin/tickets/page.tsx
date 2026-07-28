"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Ticket, MessageSquare, Clock, CheckCircle, AlertCircle, Search, Filter, Send, User } from "lucide-react";

type SupportTicket = {
  id: string;
  clientName: string;
  subject: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  messages: number;
};

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  async function load() {
    const res = await fetch(`/api/admin/tickets`);
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
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Support Tickets</h1>
          <p className="text-gray-500 mt-1">Manage all client support requests</p>
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

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Open", value: tickets.filter(t => t.status === "open").length, color: "bg-green-100 text-green-700" },
          { label: "In Progress", value: tickets.filter(t => t.status === "in-progress").length, color: "bg-blue-100 text-blue-700" },
          { label: "Urgent", value: tickets.filter(t => t.priority === "urgent").length, color: "bg-red-100 text-red-700" },
          { label: "Resolved", value: tickets.filter(t => t.status === "resolved").length, color: "bg-purple-100 text-purple-700" },
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

      {/* Tickets Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-heading font-bold text-navy text-lg">All Tickets</h2>
        </div>

        {tickets.length === 0 ? (
          <div className="p-12 text-center">
            <Ticket className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500">No support tickets</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Ticket ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tickets.map((ticket, i) => (
                  <motion.tr
                    key={ticket.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.03 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-heading font-bold text-navy">#{ticket.id.slice(-6)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        <p className="text-gray-600">{ticket.clientName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-navy">{ticket.subject}</p>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-1">
                        <MessageSquare size={12} />
                        {ticket.messages} messages
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{ticket.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600">{ticket.assignedTo || "Unassigned"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 bg-navy text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-800 transition-colors">
                          <Send size={12} />
                          Reply
                        </button>
                        <button className="p-2 text-gray-400 hover:text-navy transition-colors">
                          <CheckCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
