"use client";

import React, { useEffect, useState } from "react";
import AppointmentForm from "@/components/AppointmentForm";

type Appointment = {
  id: string;
  title: string;
  scheduledAt: string;
  status: string;
};

export default function AppointmentsPage() {
  const [appts, setAppts] = useState<Appointment[]>([]);

  async function load() {
    const res = await fetch(`/api/appointments`);
    if (!res.ok) return;
    const data = await res.json();
    setAppts(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Appointments</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-3">Book a consultation</h3>
          <AppointmentForm onBooked={load} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-3">Upcoming</h3>
          <ul className="space-y-3">
            {appts.map((a) => (
              <li key={a.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{a.title}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(a.scheduledAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-sm text-gray-600">{a.status}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
