"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, MapPin, Phone, CheckCircle, XCircle, AlertCircle, Plus, Filter } from "lucide-react";
import AppointmentForm from "@/components/AppointmentForm";

type Appointment = {
  id: string;
  title: string;
  scheduledAt: string;
  status: string;
  advisor: string;
  type: "google-meet" | "zoom" | "whatsapp" | "phone" | "physical";
  notes?: string;
};

export default function AppointmentsPage() {
  const [appts, setAppts] = useState<Appointment[]>([]);
  const [showBooking, setShowBooking] = useState(false);

  async function load() {
    const res = await fetch(`/api/appointments`);
    if (!res.ok) return;
    const data = await res.json();
    setAppts(data);
  }

  useEffect(() => {
    load();
  }, []);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "completed": return "bg-blue-100 text-blue-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return CheckCircle;
      case "pending": return AlertCircle;
      case "completed": return CheckCircle;
      case "cancelled": return XCircle;
      default: return Clock;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Appointments</h1>
          <p className="text-gray-500 mt-1">Manage your consultation schedule</p>
        </div>
        <button
          onClick={() => setShowBooking(!showBooking)}
          className="flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors"
        >
          <Plus size={18} />
          Book Appointment
        </button>
      </div>

      {showBooking && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-navy text-lg">Book New Appointment</h2>
            <button
              onClick={() => setShowBooking(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle size={20} />
            </button>
          </div>
          <AppointmentForm onBooked={() => { load(); setShowBooking(false); }} />
        </motion.div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-heading font-bold text-navy text-lg">Upcoming Appointments</h2>
          <button className="flex items-center gap-2 text-gray-500 hover:text-navy text-sm font-medium">
            <Filter size={16} />
            Filter
          </button>
        </div>

        {appts.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500">No appointments scheduled</p>
            <button
              onClick={() => setShowBooking(true)}
              className="mt-4 text-blue-700 font-semibold hover:underline"
            >
              Book your first appointment
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {appts.map((apt, i) => {
              const TypeIcon = getTypeIcon(apt.type);
              const StatusIcon = getStatusIcon(apt.status);
              return (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading font-bold text-navy">{apt.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(apt.status)}`}>
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {new Date(apt.scheduledAt).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <TypeIcon size={14} />
                          {apt.type.replace("-", " ").toUpperCase()}
                        </div>
                      </div>
                      {apt.advisor && (
                        <p className="text-sm text-gray-600 mt-2">with {apt.advisor}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {apt.status === "confirmed" && (
                        <button className="flex items-center gap-2 bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-green-200 transition-colors">
                          <Video size={14} />
                          Join Call
                        </button>
                      )}
                      <button className="p-2 text-gray-400 hover:text-navy transition-colors">
                        <StatusIcon size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
