'use client';

import React from 'react';
import Link from 'next/link';

export default function Page() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 sm:px-6 text-center">
            <div className="max-w-3xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug sm:leading-tight mb-6">
                    Transforming doctor–patient conversations into structured, real-time clinical notes.
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-muted font-medium mb-10">
                    Clarity. Speed. Precision. Seamlessly delivered at the point of care.
                </p>

                <Link
                    href="/dashboard"
                    className="inline-block px-6 sm:px-8 py-3 rounded-full bg-primary text-white font-medium text-base sm:text-lg shadow hover:bg-primary/90 transition"
                >
                    Try AEGIS Now
                </Link>
            </div>
        </div>
    );
}
