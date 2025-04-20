'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { FaFlask, FaTimes } from 'react-icons/fa';

interface LabReportsInputProps {
    onChange: (files: File[], text: string) => void;
}

const LabReportsInput: React.FC<LabReportsInputProps> = ({ onChange }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [text, setText] = useState('');

    const updateParent = useCallback(() => {
        onChange(files, text);
    }, [files, text, onChange]);

    // Prevent duplicates by checking name + size
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
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    useEffect(() => {
        updateParent();
    }, [files, text, updateParent]);

    return (
        <div className="bg-card border border-default rounded-md p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2">
                <FaFlask className="text-primary text-xl" />
                <h5 className="text-lg font-semibold text-foreground">Lab Reports & Results</h5>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* File Uploader */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Upload Files</label>
                    <div className="relative border-2 border-dashed border-default rounded-md p-4 flex items-center justify-center text-muted text-sm">
                        <input
                            type="file"
                            multiple
                            onChange={handleFiles}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <span>Drag & drop files here, or click to select</span>
                    </div>
                    {files.length > 0 && (
                        <ul className="border border-default rounded-md divide-y divide-default max-h-40 overflow-y-auto">
                            {files.map((file, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-center justify-between px-3 py-2 bg-white"
                                >
                                    <span className="text-sm text-foreground truncate">{file.name}</span>
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

                {/* Text Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Or Paste Results</label>
                    <textarea
                        rows={6}
                        value={text}
                        onChange={handleText}
                        placeholder="E.g. Hemoglobin: 10.2 g/dL..."
                        className="w-full rounded-md border border-default px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                </div>
            </div>
        </div>
    );
};

export default LabReportsInput;
