"use client";

import React, { useState } from "react";

export default function AdminAIPage() {
  const [q, setQ] = useState("");
  const [assistantAnswer, setAssistantAnswer] = useState<string | null>(null);
  const [assistantHits, setAssistantHits] = useState<Array<{ text: string; metadata?: Record<string, unknown>; score?: number }> | null>(null);
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [assistantError, setAssistantError] = useState<string | null>(null);

  const [fileName, setFileName] = useState("");
  const [mimeType, setMimeType] = useState("application/pdf");
  const [fileSize, setFileSize] = useState<number>(0);
  const [fileUrl, setFileUrl] = useState("");
  const [documentResult, setDocumentResult] = useState<{ ok: boolean; issues: string[] } | null>(null);
  const [documentLoading, setDocumentLoading] = useState(false);
  const [documentError, setDocumentError] = useState<string | null>(null);

  const [ingestLoading, setIngestLoading] = useState(false);
  const [ingestMessage, setIngestMessage] = useState<string | null>(null);
  const [ingestError, setIngestError] = useState<string | null>(null);

  async function ask() {
    setAssistantLoading(true);
    setAssistantAnswer(null);
    setAssistantError(null);
    setAssistantHits(null);

    try {
      const res = await fetch(`/api/ai/assistant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Assistant request failed");
      }
      setAssistantAnswer(data.answer ?? null);
      setAssistantHits(data.hits ?? null);
    } catch (error) {
      setAssistantError((error as Error).message);
    } finally {
      setAssistantLoading(false);
    }
  }

  async function checkDocument() {
    setDocumentLoading(true);
    setDocumentResult(null);
    setDocumentError(null);

    try {
      const res = await fetch(`/api/ai/check-document`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName, fileSize, mimeType, fileUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Document check failed");
      }
      setDocumentResult(data);
    } catch (error) {
      setDocumentError((error as Error).message);
    } finally {
      setDocumentLoading(false);
    }
  }

  async function ingestContent() {
    setIngestLoading(true);
    setIngestMessage(null);
    setIngestError(null);

    try {
      const res = await fetch(`/api/ai/ingest`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Ingest failed");
      }
      setIngestMessage(`Ingested ${data.ingested ?? 0} content records.`);
    } catch (error) {
      setIngestError((error as Error).message);
    } finally {
      setIngestLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">AI Assistant</h1>
        <p className="text-sm text-gray-500 mb-6">Ask the Travel Agency assistant for visa, document, or country guidance.</p>

        <div className="grid gap-4 sm:grid-cols-[1fr_auto] mb-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Ask about visas, documents, countries, or immigration rules..."
          />
          <button
            onClick={ask}
            disabled={assistantLoading || !q.trim()}
            className="rounded-2xl bg-[#0A0F1E] px-6 py-3 text-sm font-semibold text-white hover:bg-opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {assistantLoading ? "Thinking…" : "Ask"}
          </button>
        </div>

        {assistantError && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">{assistantError}</div>
        )}

        {assistantAnswer && (
          <div className="rounded-3xl border border-gray-200 bg-slate-50 p-5 mt-4">
            <p className="text-sm text-gray-500 mb-3">Answer</p>
            <div className="whitespace-pre-wrap text-gray-900">{assistantAnswer}</div>
          </div>
        )}

        {assistantHits && assistantHits.length > 0 && (
          <div className="rounded-3xl border border-gray-200 bg-white p-5 mt-4">
            <p className="text-sm text-gray-500 mb-3">Context hits</p>
            <ul className="space-y-3">
              {assistantHits.map((hit, index) => (
                <li key={index} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
                  {hit.text ?? JSON.stringify(hit)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-gray-900">Document Checker</h2>
              <p className="text-sm text-gray-500 mt-1">Validate a document file before review.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              AI-powered guardrails
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">File name</label>
              <input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="passport.pdf"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">MIME type</label>
              <input
                value={mimeType}
                onChange={(e) => setMimeType(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="application/pdf"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">File size (bytes)</label>
              <input
                type="number"
                value={fileSize}
                onChange={(e) => setFileSize(Number(e.target.value))}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="1048576"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">File URL (optional)</label>
              <input
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="https://example.com/passport.pdf"
              />
            </div>
          </div>

          <button
            onClick={checkDocument}
            disabled={documentLoading || !fileName.trim() || !mimeType.trim()}
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#0A0F1E] px-5 py-3 text-sm font-semibold text-white hover:bg-opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {documentLoading ? "Checking…" : "Check document"}
          </button>

          {documentError && (
            <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">{documentError}</div>
          )}

          {documentResult && (
            <div className="mt-4 rounded-3xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-sm font-semibold text-gray-900">Result</p>
              <p className="mt-2 text-sm text-gray-700">Status: <span className={`font-semibold ${documentResult.ok ? "text-green-700" : "text-orange-700"}`}>{documentResult.ok ? "Acceptable" : "Needs attention"}</span></p>
              {documentResult.issues.length > 0 ? (
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {documentResult.issues.map((issue, index) => (
                    <li key={index} className="rounded-2xl border border-gray-100 bg-white p-3">{issue}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-gray-500">No issues detected.</p>
              )}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900">Content Ingestion</h2>
          <p className="mt-2 text-sm text-gray-500">Sync Sanity content into the AI vector store for better assistant answers.</p>

          <button
            onClick={ingestContent}
            disabled={ingestLoading}
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {ingestLoading ? "Ingesting…" : "Ingest content"}
          </button>

          {ingestMessage && (
            <div className="mt-4 rounded-2xl border border-green-100 bg-green-50 p-4 text-sm text-green-700">{ingestMessage}</div>
          )}
          {ingestError && (
            <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">{ingestError}</div>
          )}
        </div>
      </div>
    </div>
  );
}
