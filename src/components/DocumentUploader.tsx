"use client";

import React, { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

interface UploadResult {
  name: string;
  url: string;
  key: string;
  size: number;
  type: string;
}

type Props = {
  applicationId?: string | null;
  onUploaded?: () => void;
};

export default function DocumentUploader({ applicationId, onUploaded }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUploadComplete(res: UploadResult[]) {
    setLoading(true);
    setError(null);

    try {
      const file = res[0];
      
      const apiRes = await fetch(`/api/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: applicationId ?? null,
          type: "OTHER",
          fileName: file.name,
          fileUrl: file.url,
          fileKey: file.key,
          fileSize: file.size,
          mimeType: file.type,
        }),
      });

      if (!apiRes.ok) throw new Error("Failed to save document");
      onUploaded?.();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">Select document</label>
      <UploadButton
        endpoint="documentUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
          setError(error.message);
        }}
        onUploadBegin={() => {
          setLoading(true);
          setError(null);
        }}
        className="ut-button:bg-gold ut-button:text-navy ut-button:hover:bg-yellow-500"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
