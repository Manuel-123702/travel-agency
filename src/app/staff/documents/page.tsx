"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Search, Filter, CheckCircle, XCircle, Clock, Download, Eye, AlertCircle } from "lucide-react";

type Document = {
  id: string;
  clientName: string;
  fileName: string;
  type: string;
  status: "pending" | "approved" | "rejected" | "needs-revision";
  uploadedAt: string;
  reviewedAt?: string;
  notes?: string;
};

export default function StaffDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);

  async function load() {
    const res = await fetch(`/api/staff/documents`);
    if (!res.ok) return;
    const data = await res.json();
    setDocuments(data);
  }

  useEffect(() => {
    load();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
      case "needs-revision": return "bg-orange-100 text-orange-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return CheckCircle;
      case "rejected": return XCircle;
      case "needs-revision": return AlertCircle;
      case "pending": return Clock;
      default: return Clock;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Document Review</h1>
          <p className="text-gray-500 mt-1">Review and approve client documents</p>
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
          { label: "Pending Review", value: documents.filter(d => d.status === "pending").length, color: "bg-yellow-100 text-yellow-700" },
          { label: "Approved", value: documents.filter(d => d.status === "approved").length, color: "bg-green-100 text-green-700" },
          { label: "Needs Revision", value: documents.filter(d => d.status === "needs-revision").length, color: "bg-orange-100 text-orange-700" },
          { label: "Rejected", value: documents.filter(d => d.status === "rejected").length, color: "bg-red-100 text-red-700" },
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

      {/* Documents Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-heading font-bold text-navy text-lg">Documents Awaiting Review</h2>
        </div>

        {documents.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500">No documents to review</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Document</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Uploaded</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {documents.map((doc, i) => {
                  const StatusIcon = getStatusIcon(doc.status);
                  return (
                    <motion.tr
                      key={doc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.03 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-navy">{doc.clientName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-gray-400" />
                          <p className="text-gray-600">{doc.fileName}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{doc.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Clock size={14} />
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(doc.status)}`}>
                            {doc.status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                          <StatusIcon size={16} className={doc.status === "approved" ? "text-green-600" : doc.status === "rejected" ? "text-red-600" : "text-gray-400"} />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-navy transition-colors" title="View">
                            <Eye size={18} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-navy transition-colors" title="Download">
                            <Download size={18} />
                          </button>
                          {doc.status === "pending" && (
                            <>
                              <button className="p-2 text-green-400 hover:text-green-600 transition-colors" title="Approve">
                                <CheckCircle size={18} />
                              </button>
                              <button className="p-2 text-red-400 hover:text-red-600 transition-colors" title="Reject">
                                <XCircle size={18} />
                              </button>
                            </>
                          )}
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
