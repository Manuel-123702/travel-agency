"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MoreVertical, Eye, Edit, UserPlus, Shield, Mail, Phone, MapPin, Calendar, Briefcase } from "lucide-react";

export default function AdminStaffPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");

  const staff = [
    { id: 1, name: "Aminata Coulibaly", email: "aminata@travelagency.com", role: "Immigration Advisor", department: "Advisory", status: "active", cases: 45, joined: "2023-01-15" },
    { id: 2, name: "Jean-Pierre Martin", email: "jeanpierre@travelagency.com", role: "Senior Consultant", department: "Advisory", status: "active", cases: 38, joined: "2023-02-20" },
    { id: 3, name: "Marie Laurent", email: "marie@travelagency.com", role: "Document Officer", department: "Documents", status: "active", cases: 32, joined: "2023-03-10" },
    { id: 4, name: "Thomas Dubois", email: "thomas@travelagency.com", role: "Financial Officer", department: "Finance", status: "active", cases: 28, joined: "2023-04-05" },
    { id: 5, name: "Sophie Renault", email: "sophie@travelagency.com", role: "Marketing Manager", department: "Marketing", status: "active", cases: 0, joined: "2023-05-12" },
    { id: 6, name: "Luc Bernard", email: "luc@travelagency.com", role: "Content Editor", department: "Content", status: "inactive", cases: 0, joined: "2023-06-01" },
  ];

  const statusColors = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">Staff Management</h1>
            <p className="text-gray-600">Manage your team members and their permissions</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-navy to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            <UserPlus size={20} />
            Add Staff Member
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Staff", value: "24", color: "from-blue-500 to-blue-600" },
            { label: "Active", value: "21", color: "from-green-500 to-green-600" },
            { label: "Advisory", value: "8", color: "from-purple-500 to-purple-600" },
            { label: "On Leave", value: "3", color: "from-yellow-500 to-yellow-600" },
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
              placeholder="Search staff by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-navy transition-all"
            >
              <option value="all">All Departments</option>
              <option value="Advisory">Advisory</option>
              <option value="Documents">Documents</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Content">Content</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all">
              <Filter size={18} />
              More Filters
            </button>
          </div>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-navy to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-bold text-navy">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[member.status as keyof typeof statusColors]}`}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={16} className="text-gray-400" />
                    {member.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase size={16} className="text-gray-400" />
                    {member.department}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} className="text-gray-400" />
                    Joined {member.joined}
                  </div>
                </div>

                {member.cases > 0 && (
                  <div className="bg-navy/5 rounded-xl p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Cases</span>
                      <span className="text-lg font-bold text-navy">{member.cases}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-navy text-white rounded-xl text-sm font-medium hover:bg-navy-800 transition-colors">
                    <Eye size={16} />
                    View Profile
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-navy rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                    <Edit size={16} />
                    Edit
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
