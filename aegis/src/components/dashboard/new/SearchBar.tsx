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
            className="bg-card p-6 grid gap-6 md:grid-cols-4 md:items-end"
        >
            {/* Email */}
            <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium text-foreground mb-1">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="johndoe@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full rounded-md border border-default px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Full Name */}
            <div className="flex flex-col">
                <label htmlFor="fullName" className="text-sm font-medium text-foreground mb-1">
                    Full Name
                </label>
                <input
                    type="text"
                    id="fullName"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full rounded-md border border-default px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
                <label htmlFor="phone" className="text-sm font-medium text-foreground mb-1">
                    Phone
                </label>
                <input
                    type="tel"
                    id="phone"
                    placeholder="(123) 456‑7890"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="w-full rounded-md border border-default px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Submit */}
            <div>
                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary transition"
                >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
