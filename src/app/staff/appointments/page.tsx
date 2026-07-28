"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Search, Filter, Video, Phone, MapPin, CheckCircle, Clock, MessageSquare } from "lucide-react";

type Appointment = {
  id: string;
  clientName: string;
  title: string;
  scheduledAt: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  type: "google-meet" | "zoom" | "whatsapp" | "phone" | "physical";
  notes?: string;
};

export default function StaffAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  async function load() {
    const res = await fetch(`/api/staff/appointments`);
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
          <p className="text-gray-500 mt-1">Manage your scheduled appointments</p>
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
          { label: "Total", value: appointments.length, color: "bg-blue-100 text-blue-700" },
          { label: "Confirmed", value: appointments.filter(a => a.status === "confirmed").length, color: "bg-green-100 text-green-700" },
          { label: "Today", value: appointments.filter(a => new Date(a.scheduledAt).toDateString() === new Date().toDateString()).length, color: "bg-purple-100 text-purple-700" },
          { label: "Completed", value: appointments.filter(a => a.status === "completed").length, color: "bg-gray-100 text-gray-700" },
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

      {/* Appointments List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-heading font-bold text-navy text-lg">Upcoming Appointments</h2>
        </div>

        {appointments.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500">No appointments scheduled</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {appointments.map((apt, i) => {
              const TypeIcon = getTypeIcon(apt.type);
              return (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.03 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading font-bold text-navy">{apt.clientName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(apt.status)}`}>
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{apt.title}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {new Date(apt.scheduledAt).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <TypeIcon size={14} />
                          {apt.type.replace("-", " ")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 bg-navy text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors">
                        <MessageSquare size={14} />
                        Message
                      </button>
                      {apt.status === "confirmed" && (
                        <button className="flex items-center gap-2 bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-green-200 transition-colors">
                          <Video size={14} />
                          Join
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
