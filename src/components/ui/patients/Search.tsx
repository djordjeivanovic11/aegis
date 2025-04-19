'use client';

import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export interface SearchParams {
    email: string;
    fullName: string;
    phoneNumber: string;
}

interface SearchBarProps {
    onSearch: (params: SearchParams) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({ email, fullName, phoneNumber });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-card border border-default rounded-md p-4 md:p-6 grid md:grid-cols-4 gap-4 items-end"
        >
            {['Email', 'Full Name', 'Phone'].map((label, i) => {
                const state = [email, fullName, phoneNumber][i];
                const setter = [setEmail, setFullName, setPhoneNumber][i];
                const placeholder = i === 0 ? 'johndoe@example.com' : i === 1 ? 'John Doe' : '(123) 456‑7890';
                const id = `search-${label.toLowerCase().replace(' ', '')}`;
                return (
                    <div key={i} className="flex flex-col">
                        <label htmlFor={id} className="text-sm font-medium text-foreground mb-1">
                            {label}
                        </label>
                        <input
                            id={id}
                            type="text"
                            value={state}
                            onChange={e => setter(e.target.value)}
                            placeholder={placeholder}
                            className="w-full rounded-md border border-default px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                );
            })}
            <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition"
            >
                <MagnifyingGlassIcon className="h-5 w-5" />
                Search
            </button>
        </form>
    );
};

export default SearchBar;
