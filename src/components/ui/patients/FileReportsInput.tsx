'use client';

import React, { useState, useCallback } from 'react';
import { FaFlask, FaTimes, FaSpinner } from 'react-icons/fa';

import filesService from '@/services/files';
import linksService from '@/services/links';
import {
  UploadDocumentRequest,
  UploadDocumentResponse,
} from '@/types/files/types';
import { LinkBasic, LinkDetail } from '@/types/link/types';

interface LabReportsInputProps {
  patientId: string;
  docType: 'BACKGROUND' | 'EDUCATION' | 'LAB_REPORT' | 'OTHER';
  files: File[];
  links: string[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setLinks: React.Dispatch<React.SetStateAction<string[]>>;
}

const LabReportsInput: React.FC<LabReportsInputProps> = ({
                                                           patientId,
                                                           docType,
                                                           files,
                                                           links,
                                                           setFiles,
                                                           setLinks,
                                                         }) => {
  const [linkInput, setLinkInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);

  /* ---------- file handlers ---------- */
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFiles(prev => {
      const seen = new Set(prev.map(f => `${f.name}-${f.size}`));
      return [...prev, ...newFiles.filter(f => !seen.has(`${f.name}-${f.size}`))];
    });
  };

  const removeFile = (i: number) => {
    setFiles(prev => prev.filter((_, idx) => idx !== i));
  };

  /* ---------- link handlers ---------- */
  const addLink = () => {
    const trimmed = linkInput.trim();
    if (!trimmed) return;

    try {
      const urlStr = trimmed.startsWith('http://') || trimmed.startsWith('https://')
          ? trimmed
          : `https://${trimmed}`;
      const url = new URL(urlStr);
      if (!/\.(com|org|net|edu|gov|io|co|uk|ca|au|de|fr|jp)$/i.test(url.hostname)) {
        alert('Please enter a URL with a valid domain suffix.');
        return;
      }
      setLinks(prev => (prev.includes(urlStr) ? prev : [...prev, urlStr]));
      setLinkInput('');
    } catch {
      alert('Please enter a valid URL');
    }
  };

  const removeLink = (i: number) => {
    setLinks(prev => prev.filter((_, idx) => idx !== i));
  };

  /* ---------- send handler ---------- */
  const handleSend = useCallback(async () => {
    if (isSending) return;
    setIsSending(true);
    setProgress(0);

    try {
      // 1) Upload & extract all files
      const fileResults: Array<{ doc: UploadDocumentResponse; extracted: UploadDocumentResponse }> = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const req: UploadDocumentRequest = { patient_id: patientId, doc_type: docType, file };
        const doc = await filesService.uploadDocument(req);
        const extracted = await filesService.extractText(doc.id);
        fileResults.push({ doc, extracted });
        setProgress(Math.round(((i + 1) / files.length) * 33)); // up to 33%
      }

      // 2) Create links
      const createdLinks: LinkBasic[] = await linksService.createLinks(links);
      setProgress(50);

      // 3) Analyze links
      const urls = createdLinks.map(l => l.url);
      const analyzedLinks: LinkDetail[] = await linksService.analyzeAndStoreLinks(urls);
      setProgress(80);

      console.log('File results:', fileResults);
      console.log('Link analysis:', analyzedLinks);

      // 4) Complete
      setProgress(100);
    } catch (err: any) {
      console.error('Error sending files/links:', err);
      alert(err?.message || 'Unexpected error');
    } finally {
      setTimeout(() => {
        setIsSending(false);
        setProgress(0);
      }, 500);
    }
  }, [files, links, patientId, docType, isSending]);

  return (
      <div className="bg-card border border-default rounded-md p-6 space-y-6">
        {/* Progress Bar */}
        {isSending && (
            <div className="w-full bg-gray-200 h-1 rounded overflow-hidden">
              <div
                  className="h-1 bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
              />
            </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaFlask className="text-primary text-xl" />
            <h5 className="text-lg font-semibold text-foreground">
              File Reports &amp; Sources
            </h5>
          </div>
          <button
              onClick={handleSend}
              disabled={(files.length === 0 && links.length === 0) || isSending}
              className={`flex items-center gap-2 font-medium px-4 py-2 rounded-md ${
                  (files.length === 0 && links.length === 0) || isSending
                      ? 'bg-gray-300 cursor-not-allowed text-black'
                      : 'bg-primary text-white'
              }`}
          >
            {isSending ? (
                <>
                  <FaSpinner className="animate-spin" /> Working…
                </>
            ) : (
                'Send Files'
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FILE UPLOADER */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Upload Files
            </label>
            <div className="relative border border-dashed border-default rounded-md h-[42px] flex items-center justify-center text-muted text-sm px-3">
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

          {/* SOURCE LINKS */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Paste Source Links
            </label>
            <div className="flex gap-2">
              <input
                  type="text"
                  value={linkInput}
                  onChange={e => setLinkInput(e.target.value)}
                  onKeyDown={e => {
                      if (e.key === 'Enter') {
                          e.preventDefault();
                          if (linkInput.trim()) {
                              addLink();
                          }
                      }
                  }}
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
            {links.length > 0 && (
                <ul className="border border-default rounded-md divide-y divide-default max-h-40 overflow-y-auto">
                  {links.map((link, idx) => (
                      <li
                          key={idx}
                          className="flex items-center justify-between px-3 py-2 bg-white"
                      >
                  <span className="text-sm text-foreground truncate">
                    {link}
                  </span>
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
