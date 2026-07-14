"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Filter, UserPlus, Eye, MessageSquare, Phone, CheckCircle, Clock, AlertCircle, Globe } from "lucide-react";

const allClients = [
  { id: "TA-2026-04721", name: "Marcus Johnson", email: "marcus@email.com", phone: "+1 514 000 0001", nationality: "🇺🇸 American", destination: "🇨🇦 Canada", type: "Work Permit", step: 2, progress: 40, status: "active", advisor: "Aminata C.", joined: "June 10, 2026", urgent: true },
  { id: "TA-2026-04695", name: "Fatima Al-Rashidi", email: "fatima@email.com", phone: "+966 50 000 0002", nationality: "🇸🇦 Saudi", destination: "🇫🇷 France", type: "Student Visa", step: 3, progress: 60, status: "active", advisor: "Khadija B.", joined: "June 5, 2026", urgent: false },
  { id: "TA-2026-04612", name: "Yves Dupont", email: "yves@email.com", phone: "+33 6 00 00 00 03", nationality: "🇫🇷 French", destination: "🇱🇺 Luxembourg", type: "Work Permit", step: 4, progress: 80, status: "active", advisor: "Aminata C.", joined: "May 20, 2026", urgent: false },
  { id: "TA-2026-04588", name: "Aisha Mbeki", email: "aisha@email.com", phone: "+27 60 000 0004", nationality: "🇿🇦 South African", destination: "🇨🇦 Canada", type: "Express Entry", step: 5, progress: 100, status: "completed", advisor: "Khadija B.", joined: "March 1, 2026", urgent: false },
  { id: "TA-2026-04541", name: "Priya Nair", email: "priya@email.com", phone: "+91 98 0000 0005", nationality: "🇮🇳 Indian", destination: "🇫🇷 France", type: "Student Visa", step: 1, progress: 15, status: "new", advisor: "Unassigned", joined: "June 28, 2026", urgent: true },
  { id: "TA-2026-04498", name: "Omar Hassan", email: "omar@email.com", phone: "+20 10 0000 0006", nationality: "🇪🇬 Egyptian", destination: "🇨🇦 Canada", type: "Work Permit", step: 3, progress: 55, status: "active", advisor: "Aminata C.", joined: "April 15, 2026", urgent: false },
  { id: "TA-2026-04445", name: "Sofia Papadaki", email: "sofia@email.com", phone: "+30 69 0000 0007", nationality: "🇬🇷 Greek", destination: "🇱🇺 Luxembourg", type: "Work Permit", step: 2, progress: 35, status: "active", advisor: "Khadija B.", joined: "May 8, 2026", urgent: false },
  { id: "TA-2026-04312", name: "Carlos Mendes", email: "carlos@email.com", phone: "+55 11 0000 0008", nationality: "🇧🇷 Brazilian", destination: "🇫🇷 France", type: "Visitor Visa", step: 5, progress: 100, status: "completed", advisor: "Aminata C.", joined: "Jan 12, 2026", urgent: false },
  { id: "TA-2026-04198", name: "Lena Kovacs", email: "lena@email.com", phone: "+36 20 0000 0009", nationality: "🇭🇺 Hungarian", destination: "🇨🇦 Canada", type: "Express Entry", step: 4, progress: 78, status: "active", advisor: "Khadija B.", joined: "Feb 22, 2026", urgent: false },
  { id: "TA-2026-04088", name: "Amara Diallo", email: "amara@email.com", phone: "+224 60 000 010", nationality: "🇬🇳 Guinean", destination: "🇫🇷 France", type: "Student Visa", step: 3, progress: 62, status: "active", advisor: "Aminata C.", joined: "April 3, 2026", urgent: false },
  { id: "TA-2026-03975", name: "Hiroshi Tanaka", email: "hiroshi@email.com", phone: "+81 80 0000 011", nationality: "🇯🇵 Japanese", destination: "🇨🇦 Canada", type: "Work Permit", step: 5, progress: 100, status: "completed", advisor: "Khadija B.", joined: "Nov 5, 2025", urgent: false },
  { id: "TA-2026-03821", name: "Nadia Okonkwo", email: "nadia@email.com", phone: "+234 80 0000 012", nationality: "🇳🇬 Nigerian", destination: "🇱🇺 Luxembourg", type: "Work Permit", step: 2, progress: 30, status: "active", advisor: "Unassigned", joined: "June 20, 2026", urgent: true },
];

type StatusFilter = "all" | "active" | "completed" | "new";

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [destinationFilter, setDestinationFilter] = useState("all");

  const filtered = allClients.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.includes(search) || c.email.includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchDest = destinationFilter === "all" || c.destination.includes(destinationFilter);
    return matchSearch && matchStatus && matchDest;
  });

  const statusCount = (s: string) => allClients.filter((c) => c.status === s).length;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl text-gray-900 mb-1">Clients & Cases</h1>
          <p className="text-gray-500">{allClients.length} total clients · {statusCount("active")} active · {statusCount("new")} new intakes</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0A0F1E] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
          <UserPlus size={15} /> Add New Client
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ID, or email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:border-blue-400 transition-colors" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["all", "active", "completed", "new"] as StatusFilter[]).map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                  statusFilter === s ? "bg-[#0A0F1E] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}>
                {s} {s !== "all" && <span className="opacity-60">({statusCount(s)})</span>}
              </button>
            ))}
            <select value={destinationFilter} onChange={(e) => setDestinationFilter(e.target.value)}
              className="px-4 py-2 rounded-xl text-sm bg-gray-100 text-gray-600 focus:outline-none hover:bg-gray-200 cursor-pointer">
              <option value="all">All destinations</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="France">🇫🇷 France</option>
              <option value="Luxembourg">🇱🇺 Luxembourg</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Client", "Nationality", "Destination", "Type", "Advisor", "Progress", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-[#0A0F1E] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-heading font-semibold text-gray-900 text-sm">{c.name}</p>
                          {c.urgent && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />}
                        </div>
                        <p className="text-gray-400 text-xs">{c.id} · {c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{c.nationality}</td>
                  <td className="px-5 py-4 text-sm text-gray-700 font-medium">{c.destination}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{c.type}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold ${c.advisor === "Unassigned" ? "text-red-500" : "text-gray-700"}`}>
                      {c.advisor}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${c.progress}%` }} />
                        </div>
                        <span className="text-xs text-gray-500">{c.progress}%</span>
                      </div>
                      <p className="text-gray-400 text-[10px] mt-0.5">Step {c.step}/5</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 w-fit ${
                      c.status === "completed" ? "bg-green-100 text-green-700" :
                      c.status === "active" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {c.status === "completed" ? <CheckCircle size={10} /> : c.status === "active" ? <Clock size={10} /> : <AlertCircle size={10} />}
                      {c.status === "completed" ? "Completed" : c.status === "active" ? "Active" : "New"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/clients/${c.id}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-700 hover:bg-blue-50 transition-colors" title="View case">
                        <Eye size={14} />
                      </Link>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-green-700 hover:bg-green-50 transition-colors" title="Message">
                        <MessageSquare size={14} />
                      </button>
                      <a href={`tel:${c.phone}`} className="p-1.5 rounded-lg text-gray-400 hover:text-purple-700 hover:bg-purple-50 transition-colors" title="Call">
                        <Phone size={14} />
                      </a>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 font-semibold">No clients found</p>
            <p className="text-gray-300 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Showing {filtered.length} of {allClients.length} clients</span>
          <span className="text-xs">Sorted by: Most Recent</span>
        </div>
      </motion.div>
    </div>
  );
}
