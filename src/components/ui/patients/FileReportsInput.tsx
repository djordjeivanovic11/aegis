'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { FaFlask, FaTimes } from 'react-icons/fa';

interface LabReportsInputProps {
  files: File[];
  links: string[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setLinks: React.Dispatch<React.SetStateAction<string[]>>;
}

const LabReportsInput: React.FC<LabReportsInputProps> = ({ files, links, setFiles, setLinks }) => {
  /* --------------- state --------------- */
  const [linkInput, setLinkInput] = useState<string>('');

  /* ---------- file handlers ---------- */
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);

    setFiles(prev => {
      const existing = new Set(prev.map(f => `${f.name}-${f.size}`));
      const filtered = newFiles.filter(
        f => !existing.has(`${f.name}-${f.size}`)
      );
      return [...prev, ...filtered];
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev: File[]) => prev.filter((_, i) => i !== index));
  };

  /* ---------- link handlers ---------- */
  const addLink = () => {
    const trimmed = linkInput.trim();
    if (!trimmed) return;
    
    try {
      // Add https:// if protocol is missing
      const urlStr = trimmed.startsWith('http://') || trimmed.startsWith('https://') 
        ? trimmed 
        : `https://${trimmed}`;
      const url = new URL(urlStr);
      const hasValidSuffix = /\.(com|org|net|edu|gov|io|co|uk|ca|au|de|fr|jp)$/i.test(url.hostname);
      
      if (!hasValidSuffix) {
        alert('Please enter a URL with a valid domain suffix (e.g., .com, .org, .edu)');
        return;
      }

      setLinks((prev: string[]) => {
        if (prev.includes(urlStr)) return prev;
        return [...prev, urlStr];
      });
      setLinkInput('');
    } catch {
      alert('Please enter a valid URL');
    }
  };

  const removeLink = (index: number) => {
    setLinks((prev: string[]) => prev.filter((_, i) => i !== index));
  };

  /* --------------- UI --------------- */
  return (
    <div className="bg-card border border-default rounded-md p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <FaFlask className="text-primary text-xl" />
            <h5 className="text-lg font-semibold text-foreground">
            File Reports &amp; Sources
            </h5>
        </div>
        <button 
            className={
                (files.length === 0 && links.length === 0 ? "bg-gray-300 cursor-not-allowed text-black" : "bg-primary text-white") + " " +
                "font-medium px-4 py-2 rounded-md flex items-center justify-center"
            } 
            disabled={files.length === 0 && links.length === 0}
            onClick={() => {}}
        >
            Send Files
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ----------- FILE UPLOADER ----------- */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Upload Files
          </label>

          <div
            className="
              relative
              border border-dashed border-default
              rounded-md
              h-[42px]
              flex items-center justify-center
              text-muted text-sm
              px-3
            "
          >
            <input
              type="file"
              multiple
              onChange={handleFiles}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <span>Drag &amp; drop files here, or click to select</span>
          </div>

          {files.length > 0 && (
            <ul className="border border-default rounded-md divide-y divide-default max-h-40 overflow-y-auto">
              {files.map((file, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between px-3 py-2 bg-white"
                >
                  <span className="text-sm text-foreground truncate">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="p-1 text-muted hover:text-accent transition"
                    aria-label="Remove file"
                  >
                    <FaTimes />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ----------- SOURCE LINKS ----------- */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Paste Source Links
          </label>

          {/* input + add button */}
          <div className="flex gap-2">
            <input
              type="text"
              value={linkInput}
              onChange={e => setLinkInput(e.target.value)}
              placeholder="Resource for the patient..."
              className="flex-1 border border-default rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              type="button"
              onClick={addLink}
              className="bg-primary text-white font-medium px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>

          {/* link list (same styling as file list) */}
          {links.length > 0 && (
            <ul className="border border-default rounded-md divide-y divide-default max-h-40 overflow-y-auto">
              {links.map((link, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between px-3 py-2 bg-white"
                >
                  <span className="text-sm text-foreground truncate">{link}</span>
                  <button
                    type="button"
                    onClick={() => removeLink(idx)}
                    className="p-1 text-muted hover:text-accent transition"
                    aria-label="Remove link"
                  >
                    <FaTimes />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabReportsInput;