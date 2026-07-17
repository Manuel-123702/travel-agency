import React, { useEffect, useState } from "react";
import DocumentUploader from "@/components/DocumentUploader";

type Doc = {
  id: string;
  fileName: string;
  fileUrl: string;
  mimeType: string;
  createdAt: string;
};

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Doc[]>([]);

  async function load() {
    const res = await fetch(`/api/documents`);
    if (!res.ok) return;
    const data = await res.json();
    setDocs(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Documents</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-3">Upload Document</h3>
          <DocumentUploader onUploaded={load} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-3">Your Documents</h3>
          <ul className="space-y-2">
            {docs.map((d) => (
              <li key={d.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{d.fileName}</div>
                  <div className="text-xs text-gray-500">{d.mimeType}</div>
                </div>
                <a href={d.fileUrl} className="text-sm text-gold">Download</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, Clock, AlertCircle, Trash2, Eye, X } from "lucide-react";

interface Document {
  id: string;
  name: string;
  status: "uploaded" | "pending" | "required" | "rejected";
  file?: string;
  uploadedAt?: string;
  size?: string;
  note?: string;
}

const initialDocs: Document[] = [
  { id: "1", name: "Valid Passport (all pages)", status: "uploaded", file: "passport_scan.pdf", uploadedAt: "June 16, 2026", size: "2.4 MB" },
  { id: "2", name: "University Degree Certificate(s)", status: "uploaded", file: "degree_bsc.pdf", uploadedAt: "June 18, 2026", size: "1.1 MB" },
  { id: "3", name: "Current Employment Letter", status: "uploaded", file: "employment_letter.pdf", uploadedAt: "June 20, 2026", size: "0.8 MB" },
  { id: "4", name: "Police Clearance Certificate", status: "uploaded", file: "police_clearance.pdf", uploadedAt: "June 22, 2026", size: "1.6 MB" },
  { id: "5", name: "Bank Statement (last 3 months)", status: "required", note: "Due July 2 — Required for financial proof" },
  { id: "6", name: "Reference Letter (Employer)", status: "required", note: "Due July 3" },
  { id: "7", name: "Medical Examination Results", status: "pending", note: "Awaiting your doctor's report" },
  { id: "8", name: "Proof of Accommodation Abroad", status: "pending", note: "Due July 5" },
  { id: "9", name: "Language Test Results (IELTS/TEF)", status: "required", note: "Due July 5 — Minimum CLB 7 required" },
];

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Document[]>(initialDocs);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [preview, setPreview] = useState<Document | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);

  const uploaded = docs.filter((d) => d.status === "uploaded").length;
  const total = docs.length;

  const handleUpload = async (id: string, file: File) => {
    setUploading(id);
    await new Promise((r) => setTimeout(r, 1800));
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "uploaded",
              file: file.name,
              uploadedAt: "June 29, 2026",
              size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
              note: undefined,
            }
          : d
      )
    );
    setUploading(null);
    setActiveUploadId(null);
  };

  const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(id, file);
  };

  const handleDrop = (id: string, e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(id, file);
  };

  const deleteDoc = (id: string) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: "required", file: undefined, uploadedAt: undefined, size: undefined }
          : d
      )
    );
  };

  const statusConfig = {
    uploaded: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50 border-green-200", label: "Uploaded", labelColor: "bg-green-100 text-green-700" },
    pending: { icon: Clock, color: "text-orange-500", bg: "bg-orange-50 border-orange-200", label: "Pending", labelColor: "bg-orange-100 text-orange-700" },
    required: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50 border-red-200", label: "Required", labelColor: "bg-red-100 text-red-700" },
    rejected: { icon: X, color: "text-red-600", bg: "bg-red-50 border-red-300", label: "Rejected", labelColor: "bg-red-200 text-red-800" },
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading font-bold text-2xl text-navy mb-1">Document Center</h1>
        <p className="text-gray-500 mb-8">Upload and manage all required documents for your immigration file.</p>
      </motion.div>

      {/* Progress */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="font-heading font-bold text-navy text-lg">{uploaded} of {total} documents</span>
            <span className="text-gray-400 text-sm ml-2">uploaded</span>
          </div>
          <span className="font-heading font-bold text-blue-700">{Math.round((uploaded / total) * 100)}%</span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(uploaded / total) * 100}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
          />
        </div>
        <div className="flex gap-5 mt-4 text-sm">
          {[
            { label: "Uploaded", count: docs.filter((d) => d.status === "uploaded").length, color: "text-green-600" },
            { label: "Required", count: docs.filter((d) => d.status === "required").length, color: "text-red-500" },
            { label: "Pending", count: docs.filter((d) => d.status === "pending").length, color: "text-orange-500" },
          ].map(({ label, count, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={`font-bold ${color}`}>{count}</span>
              <span className="text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Documents list */}
      <div className="space-y-3">
        {docs.map((doc, i) => {
          const cfg = statusConfig[doc.status];
          const Icon = cfg.icon;
          const isUploading = uploading === doc.id;

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(doc.id); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={(e) => handleDrop(doc.id, e)}
              className={`bg-white rounded-2xl border p-5 transition-all ${
                dragOver === doc.id ? "border-blue-400 bg-blue-50 scale-[1.01] shadow-md" : "border-gray-100 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-4 flex-wrap">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                  <Icon size={18} className={cfg.color} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-heading font-semibold text-navy text-sm">{doc.name}</p>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${cfg.labelColor}`}>
                      {cfg.label}
                    </span>
                  </div>
                  {doc.status === "uploaded" ? (
                    <p className="text-gray-400 text-xs mt-1">
                      📎 {doc.file} · {doc.size} · Uploaded {doc.uploadedAt}
                    </p>
                  ) : doc.note ? (
                    <p className={`text-xs mt-1 ${doc.status === "required" ? "text-red-500 font-medium" : "text-gray-400"}`}>
                      {doc.note}
                    </p>
                  ) : null}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {doc.status === "uploaded" ? (
                    <>
                      <button onClick={() => setPreview(doc)}
                        className="p-2 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => deleteDoc(doc.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </>
                  ) : isUploading ? (
                    <div className="flex items-center gap-2 text-blue-700 text-sm">
                      <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                      Uploading...
                    </div>
                  ) : (
                    <>
                      <input
                        type="file"
                        ref={activeUploadId === doc.id ? fileRef : undefined}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(doc.id, e)}
                      />
                      <button
                        onClick={() => {
                          setActiveUploadId(doc.id);
                          const input = document.createElement("input");
                          input.type = "file";
                          input.accept = ".pdf,.jpg,.jpeg,.png";
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) handleUpload(doc.id, file);
                          };
                          input.click();
                        }}
                        className="flex items-center gap-1.5 bg-navy text-white font-semibold text-xs px-4 py-2.5 rounded-xl hover:bg-blue-800 transition-colors"
                      >
                        <Upload size={13} /> Upload
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Drag hint */}
              {dragOver === doc.id && (
                <div className="mt-3 text-center text-blue-700 text-sm font-medium animate-pulse">
                  Drop to upload ↓
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Tips */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <h3 className="font-heading font-bold text-blue-800 text-sm mb-2">📌 Document Tips</h3>
        <ul className="space-y-1.5 text-blue-700 text-xs">
          {[
            "All documents must be clear, legible scans in PDF, JPG, or PNG format",
            "Maximum file size: 10 MB per document",
            "Certified translations required for documents not in English or French",
            "Bank statements must show your name, account number, and balance clearly",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span className="flex-shrink-0">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Preview modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-navy">Document Preview</h3>
                <button onClick={() => setPreview(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="bg-gray-100 rounded-2xl h-48 flex items-center justify-center mb-5">
                <div className="text-center">
                  <FileText size={48} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">{preview.file}</p>
                </div>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-gray-400">File Name</dt><dd className="text-navy font-medium">{preview.file}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-400">Size</dt><dd className="text-navy font-medium">{preview.size}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-400">Uploaded</dt><dd className="text-navy font-medium">{preview.uploadedAt}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-400">Status</dt><dd className="text-green-600 font-semibold">✓ Approved</dd></div>
              </dl>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
