"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, User, Mail, Phone, Shield, Search, Filter, Plus, Edit, Trash2 } from "lucide-react";

type StaffMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "ADMIN" | "STAFF" | "SENIOR_ADVISOR" | "ADVISOR";
  department: string;
  status: "active" | "inactive";
  clientsAssigned: number;
  successRate: number;
  joinedAt: string;
};

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);

  async function load() {
    const res = await fetch(`/api/admin/staff`);
    if (!res.ok) return;
    const data = await res.json();
    setStaff(data);
  }

  useEffect(() => {
    load();
  }, []);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN": return "bg-red-100 text-red-700";
      case "SENIOR_ADVISOR": return "bg-purple-100 text-purple-700";
      case "ADVISOR": return "bg-blue-100 text-blue-700";
      case "STAFF": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "ADMIN": return "Admin";
      case "SENIOR_ADVISOR": return "Senior Advisor";
      case "ADVISOR": return "Advisor";
      case "STAFF": return "Staff";
      default: return role;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Staff Management</h1>
          <p className="text-gray-500 mt-1">Manage team members and permissions</p>
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
            Add Staff
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Staff", value: staff.length, color: "bg-blue-100 text-blue-700" },
          { label: "Active", value: staff.filter(s => s.status === "active").length, color: "bg-green-100 text-green-700" },
          { label: "Admins", value: staff.filter(s => s.role === "ADMIN").length, color: "bg-red-100 text-red-700" },
          { label: "Advisors", value: staff.filter(s => s.role.includes("ADVISOR")).length, color: "bg-purple-100 text-purple-700" },
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

      {/* Staff Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-heading font-bold text-navy text-lg">Team Members</h2>
        </div>

        {staff.length === 0 ? (
          <div className="p-12 text-center">
            <Briefcase className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500">No staff members</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Clients</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Success Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {staff.map((member, i) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.03 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-navy/10 rounded-full flex items-center justify-center">
                          <User size={18} className="text-navy" />
                        </div>
                        <p className="font-medium text-navy">{member.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Mail size={14} />
                        {member.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Phone size={14} />
                        {member.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(member.role)}`}>
                        {getRoleLabel(member.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600">{member.department}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-heading font-bold text-navy">{member.clientsAssigned}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-heading font-bold text-green-600">{member.successRate}%</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${member.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-navy transition-colors">
                          <Edit size={18} />
                        </button>
                        {member.role !== "ADMIN" && (
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        )}
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
