"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MoreVertical, Eye, Edit, Calendar, Clock, Video, Phone, MapPin, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function AdminAppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const appointments = [
    { id: "APT-001", client: "John Doe", advisor: "Aminata C.", date: "2024-01-20", time: "10:00 AM", type: "Google Meet", status: "scheduled", duration: 30 },
    { id: "APT-002", client: "Jane Smith", advisor: "Jean-Pierre M.", date: "2024-01-21", time: "2:00 PM", type: "WhatsApp Call", status: "completed", duration: 45 },
    { id: "APT-003", client: "Mike Johnson", advisor: "Marie L.", date: "2024-01-22", time: "11:30 AM", type: "Physical Office", status: "scheduled", duration: 60 },
    { id: "APT-004", client: "Sarah Wilson", advisor: "Aminata C.", date: "2024-01-23", time: "3:00 PM", type: "Zoom", status: "cancelled", duration: 30 },
    { id: "APT-005", client: "Tom Brown", advisor: "Thomas D.", date: "2024-01-24", time: "9:00 AM", type: "Phone Call", status: "no_show", duration: 30 },
  ];

  const statusConfig = {
    scheduled: { label: "Scheduled", color: "bg-blue-100 text-blue-700", icon: Clock },
    completed: { label: "Completed", color: "bg-green-100 text-green-700", icon: CheckCircle },
    cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700", icon: XCircle },
    no_show: { label: "No Show", color: "bg-yellow-100 text-yellow-700", icon: AlertCircle },
  };

  const typeConfig = {
    "Google Meet": { icon: Video, color: "bg-blue-100 text-blue-600" },
    "Zoom": { icon: Video, color: "bg-purple-100 text-purple-600" },
    "WhatsApp Call": { icon: Phone, color: "bg-green-100 text-green-600" },
    "Phone Call": { icon: Phone, color: "bg-gray-100 text-gray-600" },
    "Physical Office": { icon: MapPin, color: "bg-orange-100 text-orange-600" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">Appointments</h1>
            <p className="text-gray-600">Manage consultation appointments and meetings</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-navy to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            <Calendar size={20} />
            Schedule Appointment
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: "156", color: "from-blue-500 to-blue-600" },
            { label: "Scheduled", value: "45", color: "from-blue-500 to-indigo-600" },
            { label: "Completed", value: "98", color: "from-green-500 to-green-600" },
            { label: "Cancelled", value: "13", color: "from-red-500 to-red-600" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white`}
            >
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-white/80 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center border border-gray-100">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search appointments by client, advisor, or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-navy transition-all"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no_show">No Show</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all">
              <Filter size={18} />
              More Filters
            </button>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Appointment ID</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Client</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Advisor</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Date & Time</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Type</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Duration</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt, i) => {
                  const status = statusConfig[apt.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;
                  const type = typeConfig[apt.type as keyof typeof typeConfig];
                  const TypeIcon = type.icon;
                  return (
                    <motion.tr
                      key={apt.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold text-navy">{apt.id}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-navy">{apt.client}</td>
                      <td className="px-6 py-4 text-gray-600">{apt.advisor}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-navy">{apt.date}</span>
                          <span className="text-sm text-gray-500">{apt.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${type.color}`}>
                          <TypeIcon size={14} />
                          {apt.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{apt.duration} min</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                          <StatusIcon size={14} />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600" title="View">
                            <Eye size={18} />
                          </button>
                          <button className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600" title="Edit">
                            <Edit size={18} />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
