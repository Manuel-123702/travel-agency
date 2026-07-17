"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  advisorId: z.string().optional(),
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
  meetingType: z.enum(["Google Meet", "Zoom", "WhatsApp", "Physical"]),
  title: z.string().min(3),
});

type FormValues = z.infer<typeof schema>;

export default function AppointmentForm({ onBooked }: { onBooked?: () => void }) {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { meetingType: "Google Meet", title: "Consultation" },
  });

  async function onSubmit(values: FormValues) {
    // combine date and time into ISO
    const scheduledAt = new Date(`${values.date}T${values.time}`);

    await fetch(`/api/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: values.title,
        scheduledAt: scheduledAt.toISOString(),
        duration: 30,
        meetingType: values.meetingType,
      }),
    });

    onBooked?.();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <label className="block text-sm">Title</label>
      <input className="w-full p-2 border rounded" {...register("title")} />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">Date</label>
          <input type="date" className="w-full p-2 border rounded" {...register("date")} />
        </div>
        <div>
          <label className="block text-sm">Time</label>
          <input type="time" className="w-full p-2 border rounded" {...register("time")} />
        </div>
      </div>

      <label className="block text-sm">Meeting Type</label>
      <select className="w-full p-2 border rounded" {...register("meetingType")}> 
        <option>Google Meet</option>
        <option>Zoom</option>
        <option>WhatsApp</option>
        <option>Physical</option>
      </select>

      <div className="flex items-center gap-3">
        <button type="submit" className="px-4 py-2 bg-gold text-navy rounded font-semibold">
          Book
        </button>
      </div>
    </form>
  );
}
