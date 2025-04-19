'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { nanoid } from 'nanoid';

type Message = {
    id: string;
    sender: 'user' | 'assistant';
    text: string;
};

interface ChatPanelProps {
    patientId?: string;
}

export default function ChatPanel({ patientId }: ChatPanelProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // auto-scroll
    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || !patientId) return;

        const userMsg: Message = { id: nanoid(), sender: 'user', text: input };
        setMessages((m) => [...m, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/insights/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: input,
                    patientId,         // <-- include patient context
                }),
            });
            const { answer } = await res.json();
            const botMsg: Message = { id: nanoid(), sender: 'assistant', text: answer };
            setMessages((m) => [...m, botMsg]);
        } catch (err) {
            const errorMsg: Message = {
                id: nanoid(),
                sender: 'assistant',
                text: '❗ Sorry, something went wrong.',
            };
            setMessages((m) => [...m, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const scrollable = messages.length > 8;

    return (
        <div className="bg-card border border-default rounded-lg p-6 mt-8 max-w-2xl mx-auto flex flex-col">
            <h3 className="text-xl font-semibold text-primary mb-4">Just ask?</h3>

            <div
                ref={scrollRef}
                className={`flex-1 space-y-3 mb-4 ${
                    scrollable ? 'overflow-y-auto max-h-80' : ''
                }`}
            >
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${
                            msg.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <div
                            className={`max-w-[70%] p-3 ${
                                msg.sender === 'user'
                                    ? 'bg-primary text-white rounded-l-full rounded-tr-full'
                                    : 'bg-background rounded-r-full rounded-tl-full'
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-background rounded-r-full rounded-tl-full p-3 italic text-sm text-muted-foreground">
                            Thinking…
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2">
        <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={
                patientId
                    ? 'Type your question…'
                    : 'Select a patient first to ask questions…'
            }
            className="flex-1 border border-default rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            rows={2}
            disabled={!patientId}
        />
                <button
                    onClick={sendMessage}
                    disabled={loading || !patientId}
                    className="p-2 bg-primary text-white rounded-full hover:bg-primary/80 transition disabled:opacity-50"
                    aria-label="Send message"
                >
                    <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
                </button>
            </div>
        </div>
    );
}
