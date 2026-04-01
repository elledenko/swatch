"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onUpload: (file: File) => void;
  loading: boolean;
}

export default function ImageUploader({ onUpload, loading }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles[0]);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
    disabled: loading,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative border-2 border-dashed rounded-3xl p-16 cursor-pointer transition-all duration-300
        ${isDragActive
          ? "border-terracotta bg-terracotta/5 scale-[1.02]"
          : "border-blush bg-white/60 hover:border-terracotta/60 hover:bg-white/80"
        }
        ${loading ? "opacity-60 cursor-wait" : ""}
      `}
    >
      <input {...getInputProps()} />
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-blush border-t-terracotta rounded-full animate-spin" />
          <p className="text-navy/50 font-medium">Extracting colors...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-blush/40 flex items-center justify-center">
            <svg
              className="w-9 h-9 text-terracotta"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-navy font-medium text-lg">
            {isDragActive ? "Drop it here" : "Drop an image here"}
          </p>
          <p className="text-navy/40 text-sm">or click to browse</p>
        </div>
      )}
    </div>
  );
}
