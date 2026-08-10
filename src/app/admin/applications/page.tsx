"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MoreVertical, Eye, Edit, FileText, Calendar, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

export default function AdminApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const applications = [
    { id: "APP-001", client: "John Doe", country: "Canada", type: "Express Entry", status: "under_review", submitted: "2024-01-15", progress: 65 },
    { id: "APP-002", client: "Jane Smith", country: "France", type: "Student Visa", status: "approved", submitted: "2024-02-20", progress: 100 },
    { id: "APP-003", client: "Mike Johnson", country: "Luxembourg", type: "Work Permit", status: "pending", submitted: "2024-03-10", progress: 20 },
    { id: "APP-004", client: "Sarah Wilson", country: "Canada", type: "Family Sponsorship", status: "processing", submitted: "2024-01-05", progress: 45 },
    { id: "APP-005", client: "Tom Brown", country: "France", type: "Business Visa", status: "rejected", submitted: "2023-12-01", progress: 0 },
  ];

  const statusConfig = {
    under_review: { label: "Under Review", color: "bg-blue-100 text-blue-700", icon: Clock },
    approved: { label: "Approved", color: "bg-green-100 text-green-700", icon: CheckCircle },
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: AlertCircle },
    processing: { label: "Processing", color: "bg-purple-100 text-purple-700", icon: FileText },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-700", icon: XCircle },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">Applications</h1>
            <p className="text-gray-600">Monitor and manage all immigration applications</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-navy to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            <FileText size={20} />
            New Application
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total", value: "342", color: "from-blue-500 to-blue-600" },
            { label: "Pending", value: "89", color: "from-yellow-500 to-yellow-600" },
            { label: "Under Review", value: "124", color: "from-blue-500 to-indigo-600" },
            { label: "Approved", value: "98", color: "from-green-500 to-green-600" },
            { label: "Rejected", value: "31", color: "from-red-500 to-red-600" },
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
              placeholder="Search applications by ID, client, or country..."
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
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="processing">Processing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all">
              <Filter size={18} />
              More Filters
            </button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Application ID</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Client</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Country</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Type</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Progress</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Submitted</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, i) => {
                  const status = statusConfig[app.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;
                  return (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold text-navy">{app.id}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-navy">{app.client}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2">
                          {app.country === "Canada" && "🇨🇦"}
                          {app.country === "France" && "🇫🇷"}
                          {app.country === "Luxembourg" && "🇱🇺"}
                          {app.country}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{app.type}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                          <StatusIcon size={14} />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-navy to-blue-600 transition-all"
                              style={{ width: `${app.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-600">{app.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{app.submitted}</td>
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
