"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle, AlertCircle, Eye, Download, X, Search } from "lucide-react";

const allDocs = [
  { id: 1, client: "Marcus Johnson", clientId: "TA-2026-04721", doc: "Bank Statement", status: "pending-review", file: "bank_stmt_june.pdf", size: "1.2 MB", submitted: "Today, 8:00", urgent: true },
  { id: 2, client: "Fatima Al-Rashidi", clientId: "TA-2026-04695", doc: "University Transcripts", status: "pending-review", file: "transcripts_fatima.pdf", size: "3.4 MB", submitted: "Today, 9:30", urgent: false },
  { id: 3, client: "Yves Dupont", clientId: "TA-2026-04612", doc: "Police Clearance", status: "pending-review", file: "police_yves.pdf", size: "0.9 MB", submitted: "Yesterday", urgent: false },
  { id: 4, client: "Omar Hassan", clientId: "TA-2026-04498", doc: "IELTS Results", status: "approved", file: "ielts_omar.pdf", size: "0.6 MB", submitted: "2 days ago", urgent: false },
  { id: 5, client: "Lena Kovacs", clientId: "TA-2026-04198", doc: "Employment Letter", status: "approved", file: "emp_lena.pdf", size: "0.8 MB", submitted: "3 days ago", urgent: false },
  { id: 6, client: "Amara Diallo", clientId: "TA-2026-04088", doc: "Passport Copy", status: "rejected", file: "passport_amara.pdf", size: "5.1 MB", submitted: "4 days ago", urgent: true },
  { id: 7, client: "Sofia Papadaki", clientId: "TA-2026-04445", doc: "Degree Certificate", status: "approved", file: "degree_sofia.pdf", size: "2.2 MB", submitted: "5 days ago", urgent: false },
];

type DocStatus = "pending-review" | "approved" | "rejected";

export default function AdminDocumentsPage() {
  const [docs, setDocs] = useState(allDocs);
  const [filter, setFilter] = useState<"all" | DocStatus>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof allDocs[0] | null>(null);

  const approve = (id: number) => setDocs((d) => d.map((x) => x.id === id ? { ...x, status: "approved" as DocStatus } : x));
  const reject = (id: number) => setDocs((d) => d.map((x) => x.id === id ? { ...x, status: "rejected" as DocStatus } : x));

  const displayed = docs.filter((d) => {
    const matchSearch = d.client.toLowerCase().includes(search.toLowerCase()) || d.doc.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || d.status === filter;
    return matchSearch && matchFilter;
  });

  const count = (s: string) => docs.filter((d) => d.status === s).length;

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-heading font-bold text-2xl text-gray-900 mb-1">Document Review</h1>
        <p className="text-gray-500">{count("pending-review")} documents awaiting review</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Pending Review", count: count("pending-review"), color: "orange", icon: AlertCircle },
          { label: "Approved", count: count("approved"), color: "green", icon: CheckCircle },
          { label: "Rejected", count: count("rejected"), color: "red", icon: X },
        ].map(({ label, count: c, color, icon: Icon }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              color === "orange" ? "bg-orange-100" : color === "green" ? "bg-green-100" : "bg-red-100"
            }`}>
              <Icon size={18} className={color === "orange" ? "text-orange-500" : color === "green" ? "text-green-600" : "text-red-500"} />
            </div>
            <div>
              <p className="font-heading font-black text-2xl text-gray-900">{c}</p>
              <p className="text-gray-400 text-xs">{label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client or document..."
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-400 transition-colors" />
        </div>
        <div className="flex gap-2">
          {(["all", "pending-review", "approved", "rejected"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${
                filter === f ? "bg-[#0A0F1E] text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}>
              {f === "pending-review" ? "Pending" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Document list */}
      <div className="space-y-3">
        {displayed.map((doc, i) => (
          <motion.div key={doc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className={`bg-white rounded-2xl p-5 shadow-sm border transition-all hover:shadow-md ${
              doc.status === "pending-review" && doc.urgent ? "border-red-100" : "border-gray-100"
            }`}>
            <div className="flex items-center gap-4 flex-wrap">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                doc.status === "approved" ? "bg-green-100" :
                doc.status === "rejected" ? "bg-red-100" : "bg-orange-100"
              }`}>
                <FileText size={18} className={
                  doc.status === "approved" ? "text-green-600" :
                  doc.status === "rejected" ? "text-red-500" : "text-orange-500"
                } />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="font-heading font-bold text-gray-900 text-sm">{doc.doc}</p>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    doc.status === "approved" ? "bg-green-100 text-green-700" :
                    doc.status === "rejected" ? "bg-red-100 text-red-600" :
                    "bg-orange-100 text-orange-600"
                  }`}>
                    {doc.status === "pending-review" ? "⏳ Pending Review" : doc.status === "approved" ? "✓ Approved" : "✗ Rejected"}
                  </span>
                  {doc.urgent && doc.status === "pending-review" && (
                    <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">URGENT</span>
                  )}
                </div>
                <p className="text-gray-500 text-xs mt-0.5">
                  <span className="font-semibold text-gray-700">{doc.client}</span>
                  <span className="text-gray-300 mx-1">·</span>
                  {doc.clientId}
                  <span className="text-gray-300 mx-1">·</span>
                  📎 {doc.file} · {doc.size}
                  <span className="text-gray-300 mx-1">·</span>
                  {doc.submitted}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => setSelected(doc)}
                  className="p-2 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors" title="Preview">
                  <Eye size={15} />
                </button>
                <button className="p-2 text-gray-400 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors" title="Download">
                  <Download size={15} />
                </button>
                {doc.status === "pending-review" && (
                  <>
                    <button onClick={() => approve(doc.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 transition-colors">
                      <CheckCircle size={13} /> Approve
                    </button>
                    <button onClick={() => reject(doc.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors">
                      <X size={13} /> Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6" onClick={() => setSelected(null)}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-gray-900">Document Preview</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={20} /></button>
            </div>
            <div className="bg-gray-100 rounded-2xl h-52 flex items-center justify-center mb-5">
              <div className="text-center">
                <FileText size={48} className="text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm font-medium">{selected.file}</p>
              </div>
            </div>
            <dl className="space-y-3 text-sm">
              {[
                { l: "Document Type", v: selected.doc },
                { l: "Client", v: `${selected.client} (${selected.clientId})` },
                { l: "File", v: `${selected.file} — ${selected.size}` },
                { l: "Submitted", v: selected.submitted },
              ].map(({ l, v }) => (
                <div key={l} className="flex justify-between">
                  <dt className="text-gray-400">{l}</dt>
                  <dd className="text-gray-900 font-medium text-right max-w-[60%]">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { approve(selected.id); setSelected(null); }}
                className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors text-sm">
                ✓ Approve
              </button>
              <button onClick={() => { reject(selected.id); setSelected(null); }}
                className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors text-sm">
                ✗ Reject
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
