"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MoreVertical, Eye, Edit, Ban, CheckCircle, XCircle, Clock, UserPlus, Download } from "lucide-react";

export default function AdminClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const clients = [
    { id: 1, name: "John Doe", email: "john@example.com", country: "Canada", status: "active", applications: 2, joined: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", country: "France", status: "active", applications: 1, joined: "2024-02-20" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", country: "Luxembourg", status: "pending", applications: 0, joined: "2024-03-10" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", country: "Canada", status: "active", applications: 3, joined: "2024-01-05" },
    { id: 5, name: "Tom Brown", email: "tom@example.com", country: "France", status: "inactive", applications: 1, joined: "2023-12-01" },
  ];

  const statusColors = {
    active: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    inactive: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">Clients & Cases</h1>
            <p className="text-gray-600">Manage all client accounts and their immigration applications</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-navy to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            <UserPlus size={20} />
            Add New Client
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Clients", value: "1,547", color: "from-blue-500 to-blue-600" },
            { label: "Active Clients", value: "1,234", color: "from-green-500 to-green-600" },
            { label: "Pending Review", value: "89", color: "from-yellow-500 to-yellow-600" },
            { label: "Inactive", value: "224", color: "from-gray-500 to-gray-600" },
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
              placeholder="Search clients by name, email, or country..."
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
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all">
              <Filter size={18} />
              More Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Client</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Target Country</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Applications</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Joined</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, i) => (
                  <motion.tr
                    key={client.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-navy to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-navy">{client.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{client.email}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2">
                        {client.country === "Canada" && "🇨🇦"}
                        {client.country === "France" && "🇫🇷"}
                        {client.country === "Luxembourg" && "🇱🇺"}
                        {client.country}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[client.status as keyof typeof statusColors]}`}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{client.applications}</td>
                    <td className="px-6 py-4 text-gray-600">{client.joined}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600" title="View">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600" title="Edit">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600" title="Suspend">
                          <Ban size={18} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
