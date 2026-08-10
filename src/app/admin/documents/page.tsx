"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MoreVertical, Eye, Download, FileText, CheckCircle, XCircle, Clock, AlertCircle, Upload } from "lucide-react";

export default function AdminDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const documents = [
    { id: "DOC-001", client: "John Doe", type: "Passport", fileName: "passport_john_doe.pdf", status: "verified", uploaded: "2024-01-15", size: "2.4 MB" },
    { id: "DOC-002", client: "Jane Smith", type: "Bank Statement", fileName: "bank_statement_jane.pdf", status: "pending", uploaded: "2024-02-20", size: "1.8 MB" },
    { id: "DOC-003", client: "Mike Johnson", type: "Academic Certificate", fileName: "degree_mike.pdf", status: "rejected", uploaded: "2024-03-10", size: "3.2 MB" },
    { id: "DOC-004", client: "Sarah Wilson", type: "Police Clearance", fileName: "police_clearance_sarah.pdf", status: "verified", uploaded: "2024-01-05", size: "0.8 MB" },
    { id: "DOC-005", client: "Tom Brown", type: "Medical Certificate", fileName: "medical_tom.pdf", status: "pending", uploaded: "2024-02-28", size: "1.5 MB" },
  ];

  const statusConfig = {
    verified: { label: "Verified", color: "bg-green-100 text-green-700", icon: CheckCircle },
    pending: { label: "Pending Review", color: "bg-yellow-100 text-yellow-700", icon: Clock },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-700", icon: XCircle },
    expired: { label: "Expired", color: "bg-gray-100 text-gray-700", icon: AlertCircle },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">Document Review</h1>
            <p className="text-gray-600">Review and verify client submitted documents</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-navy to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            <Upload size={20} />
            Upload Document
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Documents", value: "1,234", color: "from-blue-500 to-blue-600" },
            { label: "Pending Review", value: "89", color: "from-yellow-500 to-yellow-600" },
            { label: "Verified", value: "1,098", color: "from-green-500 to-green-600" },
            { label: "Rejected", value: "47", color: "from-red-500 to-red-600" },
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

        {/* Document Types Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { type: "Passport", count: 245, color: "from-blue-500 to-blue-600" },
            { type: "Bank Statement", count: 198, color: "from-green-500 to-green-600" },
            { type: "Academic Certs", count: 167, color: "from-purple-500 to-purple-600" },
            { type: "Police Clearance", count: 134, color: "from-orange-500 to-orange-600" },
          ].map((item, i) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 text-white`}
            >
              <p className="text-3xl font-bold mb-1">{item.count}</p>
              <p className="text-white/80 text-sm">{item.type}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center border border-gray-100">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search documents by client, type, or filename..."
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
              <option value="verified">Verified</option>
              <option value="pending">Pending Review</option>
              <option value="rejected">Rejected</option>
              <option value="expired">Expired</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all">
              <Filter size={18} />
              More Filters
            </button>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Document ID</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Client</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Document Type</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">File Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Size</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Uploaded</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, i) => {
                  const status = statusConfig[doc.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;
                  return (
                    <motion.tr
                      key={doc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold text-navy">{doc.id}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-navy">{doc.client}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-gray-400" />
                          <span className="text-gray-700">{doc.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{doc.fileName}</td>
                      <td className="px-6 py-4 text-gray-600">{doc.size}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                          <StatusIcon size={14} />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{doc.uploaded}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600" title="View">
                            <Eye size={18} />
                          </button>
                          <button className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600" title="Download">
                            <Download size={18} />
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
