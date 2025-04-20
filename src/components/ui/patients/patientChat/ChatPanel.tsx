'use client';

import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { nanoid } from 'nanoid';
import { sendPatientEducationMessage, getInitialOverview } from '@/services/chat';

interface Message {
    id: string;
    sender: 'user' | 'assistant';
    text: string;
}

interface ChatPanelProps {
    patientId?: string;
}

export default function ChatPanel({ patientId }: ChatPanelProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll on new messages
    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }, [messages]);

    // Load initial message when component mounts
    useEffect(() => {
        if (patientId && messages.length === 0) {
            fetchInitialMessage();
        }
    }, [patientId]);

    const fetchInitialMessage = async () => {
        if (!patientId) return;
        setLoading(true);
    
        try {
            // Replace the fetch call with the imported function
            const data = await getInitialOverview(patientId);
            
            if (data.content) {
                setMessages([{ id: nanoid(), sender: 'assistant', text: data.content }]);
            } else {
                setMessages([{ id: nanoid(), sender: 'assistant', text: 'Hello! I can help answer questions about your treatment plan and medical care. What would you like to know?' }]);
            }
        } catch (error) {
            console.error('Error fetching initial message:', error);
            setMessages([{ id: nanoid(), sender: 'assistant', text: 'Hello! I can help answer questions about your treatment plan and medical care. What would you like to know?' }]);
        } finally {
            setLoading(false);
        }
    };


    const sendMessage = async () => {
        if (!input.trim() || !patientId) return;
        const userMsg: Message = { id: nanoid(), sender: 'user', text: input };
        setMessages((prevMessages) => [...prevMessages, userMsg]);
        setInput('');
        setLoading(true);

        try {
            // Format the conversation history
            const history = messages.map(msg => ({
                content: msg.text,
                isBot: msg.sender === 'assistant'
            }));

            // Replace the fetch call with the imported function
            const data = await sendPatientEducationMessage(patientId, input, history);
            
            if (data.content) {
                setMessages(m => [...m, { id: nanoid(), sender: 'assistant', text: data.content }]);
            } else {
                setMessages(m => [...m, { id: nanoid(), sender: 'assistant', text: '❗ I couldn\'t process that request.' }]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(m => [...m, { id: nanoid(), sender: 'assistant', text: '❗ Something went wrong.' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="w-full max-w-2xl h-[600px] flex flex-col bg-white overflow-hidden rounded-xl shadow-lg">
            {/* Header */}
            <div className="flex-none bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
                <h2 className="text-white text-xl font-semibold text-center">Medical Assistant</h2>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50"
            >
                {messages.map(msg => {
                    const isUser = msg.sender === 'user';
                    return (
                        <div
                            key={msg.id}
                            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`
                                    max-w-[75%] p-4 rounded-2xl relative
                                    ${isUser
                                        ? 'bg-indigo-600 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'}
                                    shadow-md transition-transform duration-200 hover:scale-[1.02]
                                `}
                            >
                                <div className="whitespace-pre-wrap">{msg.text}</div>
                                <span
                                    className={`
                                        absolute -bottom-2 ${isUser ? 'right-4' : 'left-4'}
                                        block w-3 h-3
                                        ${isUser ? 'bg-indigo-600 rounded-bl-full' : 'bg-white rounded-br-full border-t border-gray-200'}
                                    `}
                                />
                            </div>
                        </div>
                    );
                })}

                {loading && (
                    <div className="flex justify-start">
                        <div className="flex items-center space-x-2 text-gray-500 italic">
                            <svg
                                className="w-5 h-5 animate-spin text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                />
                            </svg>
                            <span>Thinking...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="flex-none p-4 bg-white border-t border-gray-200 flex items-end gap-3">
                <textarea
                    className="flex-1 h-14 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Ask about your treatment plan..."
                    disabled={loading}
                />
                <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="p-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 rounded-full transition-shadow shadow-md"
                    aria-label="Send message"
                >
                    <PaperAirplaneIcon className="h-6 w-6 text-white rotate-90" />
                </button>
            </div>
        </div>
    );
}