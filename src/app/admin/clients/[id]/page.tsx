"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle, Clock, Circle, FileText, MessageSquare,
  Download, Eye, X, ChevronDown, Send, Save, Phone, Mail,
} from "lucide-react";

const caseSteps = [
  { id: 1, title: "Profile Evaluation", status: "completed" },
  { id: 2, title: "File Preparation", status: "in-progress" },
  { id: 3, title: "Application Submission", status: "pending" },
  { id: 4, title: "Interview Preparation", status: "pending" },
  { id: 5, title: "Visa Obtained", status: "pending" },
];

const documents = [
  { name: "Valid Passport", status: "approved", file: "passport_scan.pdf", size: "2.4 MB", uploaded: "June 16" },
  { name: "Degree Certificate", status: "approved", file: "degree_bsc.pdf", size: "1.1 MB", uploaded: "June 18" },
  { name: "Employment Letter", status: "approved", file: "employment_letter.pdf", size: "0.8 MB", uploaded: "June 20" },
  { name: "Police Clearance", status: "approved", file: "police_clearance.pdf", size: "1.6 MB", uploaded: "June 22" },
  { name: "Bank Statement", status: "missing", file: null, size: null, uploaded: null },
  { name: "Reference Letter", status: "missing", file: null, size: null, uploaded: null },
  { name: "Medical Results", status: "pending", file: null, size: null, uploaded: null },
  { name: "Proof of Accommodation", status: "pending", file: null, size: null, uploaded: null },
  { name: "Language Test (IELTS)", status: "pending", file: null, size: null, uploaded: null },
];

const messages = [
  { from: "advisor", text: "Hello Marcus! Your profile evaluation has been approved. Great score!", time: "June 10, 9:15" },
  { from: "client", text: "Thank you! What are the next steps?", time: "June 10, 10:32" },
  { from: "advisor", text: "Please start gathering the documents listed in your Document Center. Priority: bank statement due July 2.", time: "June 10, 10:45" },
  { from: "client", text: "Does the bank statement need to be certified?", time: "June 11, 11:02" },
  { from: "advisor", text: "Just official bank letterhead or PDF from online banking. No notarization needed.", time: "June 11, 11:08" },
];

const statusOptions = ["new", "active", "documents-pending", "submitted", "interview", "approved", "completed", "on-hold"];

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [caseStatus, setCaseStatus] = useState("active");
  const [steps, setSteps] = useState(caseSteps);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [note, setNote] = useState("");
  const [reply, setReply] = useState("");
  const [msgList, setMsgList] = useState(messages);
  const [activeTab, setActiveTab] = useState<"overview" | "documents" | "messages" | "notes">("overview");

  const cycleStep = (id: number) => {
    setSteps((prev) => prev.map((s) => s.id === id ? {
      ...s,
      status: s.status === "pending" ? "in-progress" : s.status === "in-progress" ? "completed" : "pending"
    } : s));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const sendReply = () => {
    if (!reply.trim()) return;
    setMsgList((m) => [...m, { from: "advisor", text: reply.trim(), time: "Just now" }]);
    setReply("");
  };

  const client = {
    name: "Marcus Johnson",
    id: id || "TA-2026-04721",
    email: "marcus@email.com",
    phone: "+1 514 000 0001",
    nationality: "🇺🇸 American",
    destination: "🇨🇦 Canada",
    type: "Work Permit / Express Entry",
    package: "Premium",
    advisor: "Aminata Coulibaly",
    joined: "June 10, 2026",
    crs: 468,
    success: 94,
  };

  const tabs = ["overview", "documents", "messages", "notes"] as const;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Back + Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <Link href="/admin/clients" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium mb-4 transition-colors">
          <ArrowLeft size={15} /> Back to Clients
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-[#0A0F1E] flex items-center justify-center text-white font-bold text-xl">
              MJ
            </div>
            <div>
              <h1 className="font-heading font-bold text-2xl text-gray-900">{client.name}</h1>
              <p className="text-gray-500 text-sm">{client.id} · {client.email} · {client.nationality}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select value={caseStatus} onChange={(e) => setCaseStatus(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:outline-none focus:border-blue-400 capitalize bg-white">
              {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-2 bg-[#0A0F1E] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-70">
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={14} />}
              {saved ? "✓ Saved" : "Save Changes"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
              activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Info + Case Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info grid */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-heading font-bold text-gray-900 mb-4">Client Information</h2>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {[
                  { l: "Full Name", v: client.name },
                  { l: "Case ID", v: client.id },
                  { l: "Email", v: client.email },
                  { l: "Phone", v: client.phone },
                  { l: "Nationality", v: client.nationality },
                  { l: "Destination", v: client.destination },
                  { l: "Project Type", v: client.type },
                  { l: "Package", v: client.package },
                  { l: "CRS Score", v: `${client.crs} / 1200` },
                  { l: "Success Probability", v: `${client.success}%` },
                  { l: "Assigned Advisor", v: client.advisor },
                  { l: "Client Since", v: client.joined },
                ].map(({ l, v }) => (
                  <div key={l}>
                    <dt className="text-gray-400 text-xs font-medium">{l}</dt>
                    <dd className="text-gray-900 font-semibold text-sm mt-0.5">{v}</dd>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-5">
                <a href={`mailto:${client.email}`}
                  className="flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:underline">
                  <Mail size={14} /> Email Client
                </a>
                <a href={`tel:${client.phone}`}
                  className="flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:underline">
                  <Phone size={14} /> Call
                </a>
              </div>
            </motion.div>

            {/* Case steps — clickable to change status */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-bold text-gray-900">Case Steps</h2>
                <p className="text-xs text-gray-400">Click a step to cycle status</p>
              </div>
              <div className="space-y-3">
                {steps.map(({ id, title, status }) => (
                  <button key={id} onClick={() => cycleStep(id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all hover:shadow-sm ${
                      status === "completed" ? "border-green-200 bg-green-50" :
                      status === "in-progress" ? "border-blue-200 bg-blue-50" :
                      "border-gray-100 bg-gray-50 hover:border-gray-200"
                    }`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                      status === "completed" ? "bg-green-500" :
                      status === "in-progress" ? "bg-blue-600" : "bg-gray-200"
                    }`}>
                      {status === "completed" ? <CheckCircle size={16} className="text-white" /> :
                       status === "in-progress" ? <Clock size={16} className="text-white" /> :
                       <Circle size={16} className="text-gray-400" />}
                    </div>
                    <span className={`font-semibold text-sm flex-1 ${
                      status === "pending" ? "text-gray-400" : "text-gray-900"
                    }`}>Step {id}: {title}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                      status === "completed" ? "bg-green-100 text-green-700" :
                      status === "in-progress" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-400"
                    }`}>
                      {status === "in-progress" ? "Active" : status}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Stats */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="bg-[#0A0F1E] rounded-2xl p-5">
              <p className="text-gold font-heading font-bold mb-1">🎯 Success Probability</p>
              <div className="text-4xl font-heading font-black text-white mb-2">{client.success}%</div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gold to-yellow-400 rounded-full" style={{ width: `${client.success}%` }} />
              </div>
              <p className="text-white/40 text-xs mt-2">CRS Score: {client.crs} / 1200</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-heading font-bold text-gray-900 mb-3">Progress</h3>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "40%" }} transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-blue-600 rounded-full" />
                </div>
                <span className="text-sm font-bold text-blue-700">40%</span>
              </div>
              <p className="text-gray-400 text-xs">Step 2 of 5 — File Preparation</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                {[
                  { v: "4/9", l: "Documents", c: "text-orange-600" },
                  { v: "June 10", l: "Start Date", c: "text-blue-700" },
                  { v: "Sept 15", l: "Est. End", c: "text-gray-700" },
                  { v: "11 wks", l: "Duration", c: "text-purple-600" },
                ].map(({ v, l, c }) => (
                  <div key={l} className="p-3 bg-gray-50 rounded-xl">
                    <p className={`font-bold text-sm ${c}`}>{v}</p>
                    <p className="text-gray-400 text-xs">{l}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="bg-red-50 border border-red-100 rounded-2xl p-5">
              <p className="text-red-700 font-heading font-bold text-sm mb-2">⚠️ Urgent Items</p>
              <ul className="space-y-1.5 text-red-600 text-xs">
                <li>• Bank statement due July 2</li>
                <li>• Reference letter due July 3</li>
                <li>• IELTS results pending (test July 1)</li>
              </ul>
            </motion.div>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === "documents" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-heading font-bold text-gray-900">Document Review</h2>
            <span className="text-xs text-gray-500">4 of 9 uploaded · Click to approve/reject</span>
          </div>
          <div className="divide-y divide-gray-50">
            {documents.map(({ name, status, file, size, uploaded }) => (
              <div key={name} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  status === "approved" ? "bg-green-100" :
                  status === "missing" ? "bg-red-100" : "bg-orange-100"
                }`}>
                  <FileText size={15} className={
                    status === "approved" ? "text-green-600" :
                    status === "missing" ? "text-red-500" : "text-orange-500"
                  } />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{name}</p>
                  {file ? (
                    <p className="text-gray-400 text-xs">📎 {file} · {size} · Uploaded {uploaded}</p>
                  ) : (
                    <p className={`text-xs ${status === "missing" ? "text-red-400 font-medium" : "text-gray-400"}`}>
                      {status === "missing" ? "Not uploaded — client reminder sent" : "Awaiting upload"}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {file && (
                    <>
                      <button className="p-1.5 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"><Eye size={14} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"><Download size={14} /></button>
                    </>
                  )}
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    status === "approved" ? "bg-green-100 text-green-700" :
                    status === "missing" ? "bg-red-100 text-red-600" :
                    "bg-orange-100 text-orange-600"
                  }`}>
                    {status === "approved" ? "✓ Approved" : status === "missing" ? "Missing" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Messages Tab */}
      {activeTab === "messages" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
          style={{ height: "600px" }}>
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-gray-900">Conversation with Marcus Johnson</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {msgList.map((m, i) => (
              <div key={i} className={`flex ${m.from === "advisor" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${
                  m.from === "advisor"
                    ? "bg-[#0A0F1E] text-white rounded-tr-sm"
                    : "bg-white text-gray-900 shadow-sm border border-gray-100 rounded-tl-sm"
                }`}>
                  <p>{m.text}</p>
                  <p className={`text-xs mt-1 ${m.from === "advisor" ? "text-white/40" : "text-gray-400"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <input value={reply} onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendReply(); }}
                placeholder="Reply as advisor to Marcus..."
                className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:bg-blue-50 transition-colors" />
              <button onClick={sendReply} disabled={!reply.trim()}
                className="w-10 h-10 bg-[#0A0F1E] rounded-xl flex items-center justify-center text-white hover:opacity-90 disabled:opacity-40 transition-opacity">
                <Send size={15} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Notes Tab */}
      {activeTab === "notes" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading font-bold text-gray-900 mb-4">Internal Advisor Notes</h2>
          <p className="text-gray-400 text-xs mb-3">Notes are private and not visible to the client.</p>
          <textarea value={note} onChange={(e) => setNote(e.target.value)}
            placeholder="Add internal notes about this client's case — strategy, concerns, follow-up items, interview prep tips..."
            rows={10}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all resize-none" />
          <div className="flex items-center justify-between mt-4">
            <p className="text-gray-400 text-xs">Last saved: Never</p>
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-2 bg-[#0A0F1E] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={14} />}
              {saved ? "✓ Saved" : "Save Notes"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
