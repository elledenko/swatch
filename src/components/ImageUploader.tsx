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
        relative border-2 border-dashed rounded-2xl p-16 cursor-pointer transition-all
        ${isDragActive
          ? "border-amber-400 bg-amber-100/50"
          : "border-stone-300 bg-white hover:border-amber-400 hover:bg-amber-50/30"
        }
        ${loading ? "opacity-50 cursor-wait" : ""}
      `}
    >
      <input {...getInputProps()} />
      {loading ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-stone-300 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-stone-500">Extracting colors...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 16V4m0 0l-4 4m4-4l4 4M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4"
              />
            </svg>
          </div>
          <p className="text-stone-700 font-medium">
            {isDragActive ? "Drop it here" : "Drop an image here"}
          </p>
          <p className="text-stone-400 text-sm">or click to browse</p>
        </div>
      )}
    </div>
  );
}
