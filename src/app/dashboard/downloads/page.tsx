"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, FileCheck, Clock, Search, Filter } from "lucide-react";

type DownloadItem = {
  id: string;
  title: string;
  type: "document" | "form" | "guide" | "certificate";
  size: string;
  uploadedAt: string;
  url: string;
};

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);

  async function load() {
    const res = await fetch(`/api/downloads`);
    if (!res.ok) return;
    const data = await res.json();
    setDownloads(data);
  }

  useEffect(() => {
    load();
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "document": return "bg-blue-100 text-blue-700";
      case "form": return "bg-purple-100 text-purple-700";
      case "guide": return "bg-green-100 text-green-700";
      case "certificate": return "bg-gold/20 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document": return FileText;
      case "form": return FileText;
      case "guide": return FileText;
      case "certificate": return FileCheck;
      default: return FileText;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Downloads</h1>
          <p className="text-gray-500 mt-1">Access your documents, forms, and guides</p>
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

      {/* Downloads Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-heading font-bold text-navy text-lg">Available Downloads</h2>
        </div>

        {downloads.length === 0 ? (
          <div className="p-12 text-center">
            <Download className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500">No downloads available</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {downloads.map((item, i) => {
              const TypeIcon = getTypeIcon(item.type);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getTypeColor(item.type)}`}>
                          <TypeIcon size={18} />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-navy">{item.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(item.type)}`}>
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </span>
                            <span>•</span>
                            <span>{item.size}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              {new Date(item.uploadedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 bg-navy text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors">
                      <Download size={14} />
                      Download
                    </button>
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
