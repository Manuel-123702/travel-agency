"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Globe, Star, Search, Filter, Plus, Edit, Trash2, MapPin } from "lucide-react";

type University = {
  id: string;
  name: string;
  country: string;
  city: string;
  logo?: string;
  description: string;
  website: string;
  ranking: string;
  programs: string[];
  scholarships: number;
  admissionRequirements: string[];
  intakeDates: string[];
  featured: boolean;
  active: boolean;
};

export default function AdminUniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);

  async function load() {
    const res = await fetch(`/api/admin/universities`);
    if (!res.ok) return;
    const data = await res.json();
    setUniversities(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Universities</h1>
          <p className="text-gray-500 mt-1">Manage partner universities and programs</p>
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
            Add University
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Universities", value: universities.length, color: "bg-blue-100 text-blue-700" },
          { label: "Featured", value: universities.filter(u => u.featured).length, color: "bg-gold/20 text-yellow-700" },
          { label: "Active", value: universities.filter(u => u.active).length, color: "bg-green-100 text-green-700" },
          { label: "Scholarships", value: universities.reduce((sum, u) => sum + u.scholarships, 0), color: "bg-purple-100 text-purple-700" },
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

      {/* Universities Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {universities.map((uni, i) => (
          <motion.div
            key={uni.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center">
                    <GraduationCap size={24} className="text-navy" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-navy">{uni.name}</h3>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                      <MapPin size={12} />
                      {uni.city}, {uni.country}
                    </div>
                  </div>
                </div>
                {uni.featured && (
                  <span className="px-2 py-1 bg-gold/20 text-yellow-700 rounded-full text-xs font-semibold">
                    <Star size={10} className="inline mr-1" />
                    Featured
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{uni.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">{uni.ranking}</span>
                <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-semibold">{uni.scholarships} Scholarships</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                {uni.programs.slice(0, 3).map((prog) => (
                  <span key={prog} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{prog}</span>
                ))}
                {uni.programs.length > 3 && (
                  <span className="text-xs text-gray-500">+{uni.programs.length - 3} more</span>
                )}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <a
                  href={uni.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-blue-700 text-sm font-medium hover:underline"
                >
                  <Globe size={14} />
                  Website
                </a>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-navy transition-colors">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {universities.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"
        >
          <GraduationCap className="text-gray-300 mx-auto mb-4" size={48} />
          <p className="text-gray-500">No universities added yet</p>
          <button className="mt-4 text-blue-700 font-semibold hover:underline">
            Add your first university
          </button>
        </motion.div>
      )}
    </div>
  );
}
