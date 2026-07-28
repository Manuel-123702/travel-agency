"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Globe, Award, Search, Filter, Plus, Edit, Trash2, Shield } from "lucide-react";

type Partner = {
  id: string;
  name: string;
  logo?: string;
  website: string;
  type: "university" | "employer" | "government" | "organization";
  description: string;
  country: string;
  active: boolean;
  featured: boolean;
};

type Certification = {
  id: string;
  name: string;
  image?: string;
  issuingBody: string;
  validUntil: string;
  active: boolean;
};

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  async function load() {
    const res = await fetch(`/api/admin/partners`);
    if (!res.ok) return;
    const data = await res.json();
    setPartners(data.partners || []);
    setCertifications(data.certifications || []);
  }

  useEffect(() => {
    load();
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "university": return "bg-blue-100 text-blue-700";
      case "employer": return "bg-green-100 text-green-700";
      case "government": return "bg-purple-100 text-purple-700";
      case "organization": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Partners & Certifications</h1>
          <p className="text-gray-500 mt-1">Manage partner organizations and certifications</p>
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
            Add Partner
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Partners", value: partners.length, color: "bg-blue-100 text-blue-700" },
          { label: "Active", value: partners.filter(p => p.active).length, color: "bg-green-100 text-green-700" },
          { label: "Featured", value: partners.filter(p => p.featured).length, color: "bg-gold/20 text-yellow-700" },
          { label: "Certifications", value: certifications.length, color: "bg-purple-100 text-purple-700" },
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

      {/* Partners Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8"
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-heading font-bold text-navy text-lg">Partner Organizations</h2>
        </div>

        {partners.length === 0 ? (
          <div className="p-12 text-center">
            <Building2 className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500">No partners added yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Website</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {partners.map((partner, i) => (
                  <motion.tr
                    key={partner.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.03 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-navy/10 rounded-xl flex items-center justify-center">
                          <Building2 size={18} className="text-navy" />
                        </div>
                        <div>
                          <p className="font-medium text-navy">{partner.name}</p>
                          {partner.featured && (
                            <span className="text-gold text-xs">★ Featured</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(partner.type)}`}>
                        {partner.type.charAt(0).toUpperCase() + partner.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600">{partner.country}</p>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-blue-700 hover:underline"
                      >
                        <Globe size={14} />
                        Visit
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${partner.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                        {partner.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-navy transition-colors">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Certifications Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-heading font-bold text-navy text-lg">Certifications & Accreditations</h2>
          <button className="flex items-center gap-2 bg-navy text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors text-sm">
            <Plus size={16} />
            Add Certification
          </button>
        </div>

        {certifications.length === 0 ? (
          <div className="p-12 text-center">
            <Award className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500">No certifications added yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="border border-gray-200 rounded-xl p-4 hover:border-navy transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award size={24} className="text-purple-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-navy">{cert.name}</h3>
                    <p className="text-gray-500 text-sm">{cert.issuingBody}</p>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-2">
                      <Shield size={12} />
                      Valid until: {new Date(cert.validUntil).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${cert.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                    {cert.active ? "Active" : "Expired"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-navy transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
