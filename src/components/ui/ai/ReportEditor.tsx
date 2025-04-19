'use client';

import React, { useState, useEffect } from 'react';
import { FaSave, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';

interface ReportEditorProps {
    initialContent: string;
    onCommitGraph: (content: string) => Promise<void>;
}

const ReportEditor: React.FC<ReportEditorProps> = ({ initialContent, onCommitGraph }) => {
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent]);

    const savePdf = () => {
        const doc = new jsPDF({ unit: 'pt', format: 'letter' });
        const margin = 40;
        const lineHeight = 18;
        const maxLineWidth = 520;
        const words = content.split(' ');
        let cursorY = margin;
        let line = '';

        words.forEach(word => {
            const testLine = line + word + ' ';
            const testWidth = doc.getTextWidth(testLine);
            if (testWidth > maxLineWidth) {
                doc.text(line, margin, cursorY);
                line = word + ' ';
                cursorY += lineHeight;
            } else {
                line = testLine;
            }
        });
        if (line) doc.text(line, margin, cursorY);
        doc.save('report.pdf');
    };

    const commitGraph = async () => {
        await onCommitGraph(content);
        alert('✅ Committed to graph database');
    };

    return (
        <div className="w-full bg-card border-t-4 border-primary rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 bg-primary/10">
                <h2 className="text-2xl font-bold text-foreground">Editable Report</h2>
            </div>

            {/* Editor */}
            <div className="p-6 space-y-6">
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    rows={14}
                    className="w-full min-h-[240px] rounded-md border-2 border-default px-4 py-3 text-base text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none shadow-sm"
                    placeholder="Your AI‑generated report will appear here…"
                />

                {/* Buttons */}
                <div className="pt-4 flex justify-center gap-6 border-t border-muted/30 pt-6">
                    <button
                        onClick={savePdf}
                        className="flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-full font-medium hover:bg-secondary/90 transition"
                    >
                        <FaFilePdf className="text-lg" />
                        <span className="text-sm">Export PDF</span>
                    </button>

                    <button
                        onClick={commitGraph}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition"
                    >
                        <FaSave className="text-lg" />
                        <span className="text-sm">Save to Graph</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportEditor;
