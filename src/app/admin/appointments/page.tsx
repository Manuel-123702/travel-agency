"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, Phone, MapPin, CheckCircle, XCircle, AlertCircle, Search, Filter, Plus } from "lucide-react";

type Appointment = {
  id: string;
  clientName: string;
  advisor: string;
  title: string;
  scheduledAt: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  type: "google-meet" | "zoom" | "whatsapp" | "phone" | "physical";
  notes?: string;
};

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  async function load() {
    const res = await fetch(`/api/admin/appointments`);
    if (!res.ok) return;
    const data = await res.json();
    setAppointments(data);
  }

  useEffect(() => {
    load();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "completed": return "bg-blue-100 text-blue-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "google-meet": return Video;
      case "zoom": return Video;
      case "whatsapp": return Phone;
      case "phone": return Phone;
      case "physical": return MapPin;
      default: return Calendar;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Appointments</h1>
          <p className="text-gray-500 mt-1">Manage all client appointments</p>
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
          <button className="flex items-center gap-2 bg-navy text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors">
            <Plus size={16} />
            New Appointment
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", value: appointments.length, color: "bg-blue-100 text-blue-700" },
          { label: "Confirmed", value: appointments.filter(a => a.status === "confirmed").length, color: "bg-green-100 text-green-700" },
          { label: "Pending", value: appointments.filter(a => a.status === "pending").length, color: "bg-yellow-100 text-yellow-700" },
          { label: "Completed", value: appointments.filter(a => a.status === "completed").length, color: "bg-purple-100 text-purple-700" },
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

      {/* Appointments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-heading font-bold text-navy text-lg">All Appointments</h2>
        </div>

        {appointments.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500">No appointments scheduled</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Advisor</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((apt, i) => {
                  const TypeIcon = getTypeIcon(apt.type);
                  return (
                    <motion.tr
                      key={apt.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.03 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-navy">{apt.clientName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-600">{apt.advisor}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-600">{apt.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Clock size={14} />
                          {new Date(apt.scheduledAt).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <TypeIcon size={14} className="text-gray-500" />
                          <span className="text-gray-600">{apt.type.replace("-", " ")}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(apt.status)}`}>
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-navy transition-colors">
                            <CheckCircle size={18} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <XCircle size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
