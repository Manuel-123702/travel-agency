"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, Filter, MessageSquare, FileText, Calendar, CheckCircle, Clock } from "lucide-react";

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  visaType: string;
  status: "active" | "pending" | "completed" | "on-hold";
  progress: number;
  lastActivity: string;
  documentsPending: number;
  nextAppointment?: string;
};

export default function StaffClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);

  async function load() {
    const res = await fetch(`/api/staff/clients`);
    if (!res.ok) return;
    const data = await res.json();
    setClients(data);
  }

  useEffect(() => {
    load();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "completed": return "bg-blue-100 text-blue-700";
      case "on-hold": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">My Clients</h1>
          <p className="text-gray-500 mt-1">Manage your assigned clients</p>
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
          { label: "Total Clients", value: clients.length, color: "bg-blue-100 text-blue-700" },
          { label: "Active", value: clients.filter(c => c.status === "active").length, color: "bg-green-100 text-green-700" },
          { label: "Pending Docs", value: clients.reduce((sum, c) => sum + c.documentsPending, 0), color: "bg-orange-100 text-orange-700" },
          { label: "Completed", value: clients.filter(c => c.status === "completed").length, color: "bg-purple-100 text-purple-700" },
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

      {/* Clients Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-heading font-bold text-navy text-lg">Assigned Clients</h2>
        </div>

        {clients.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500">No clients assigned yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Visa Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Pending Docs</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {clients.map((client, i) => (
                  <motion.tr
                    key={client.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.03 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-navy">{client.name}</p>
                        <p className="text-gray-500 text-sm">{client.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600">{client.destination}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">{client.visaType}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-navy h-2 rounded-full" style={{ width: `${client.progress}%` }} />
                        </div>
                        <span className="text-sm text-gray-600">{client.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(client.status)}`}>
                        {client.status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {client.documentsPending > 0 ? (
                        <span className="text-orange-600 font-semibold">{client.documentsPending}</span>
                      ) : (
                        <CheckCircle size={18} className="text-green-600" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-navy transition-colors" title="Message">
                          <MessageSquare size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-navy transition-colors" title="Documents">
                          <FileText size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-navy transition-colors" title="Appointments">
                          <Calendar size={18} />
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
