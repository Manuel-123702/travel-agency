"use client";

import React, { useState } from "react";

type Props = {
  applicationId?: string | null;
  onUploaded?: () => void;
};

export default function DocumentUploader({ applicationId, onUploaded }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return setError("Please select a file.");
    setLoading(true);
    setError(null);

    try {
      // NOTE: This implementation expects a file to be uploaded to your chosen
      // storage provider (UploadThing, Supabase, etc.) and then POSTed here
      // as metadata. This is a lightweight scaffold — replace with real
      // upload integration (UploadThing SDK) for production.

      const fakeUrl = `/uploads/${encodeURIComponent(file.name)}`;

      const res = await fetch(`/api/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: applicationId ?? null,
          type: "OTHER",
          fileName: file.name,
          fileUrl: fakeUrl,
          fileKey: file.name,
          fileSize: file.size,
          mimeType: file.type,
        }),
      });

      if (!res.ok) throw new Error("Upload failed");
      setFile(null);
      onUploaded?.();
    } catch (err: any) {
      setError(err?.message ?? "Upload error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block text-sm font-medium">Select document</label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        className="block w-full text-sm"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-gold text-navy rounded-lg font-semibold disabled:opacity-60"
        >
          {loading ? "Uploading…" : "Upload"}
        </button>
      </div>
    </form>
  );
}
