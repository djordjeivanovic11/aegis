'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-background border-t border-default mt-16">
            <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-muted">
                {/* AEGIS description */}
                <div>
                    <h2 className="text-xl font-bold text-primary tracking-wide">AEGIS</h2>
                    <p className="mt-2 max-w-sm">
                        AEGIS is an intelligent documentation assistant that helps clinicians capture,
                        summarize, and recall medical conversations effortlessly.
                    </p>
                </div>

                {/* Links + legal */}
                <div className="flex flex-col sm:items-end sm:text-right gap-2">
                    <nav className="space-x-4">
                        <Link href="/team" className="hover:text-primary">Team</Link>
                        <Link href="/login" className="hover:text-primary">Login</Link>
                    </nav>
                    <p className="mt-4 text-xs text-muted">
                        Made at Harvard. All rights reserved © {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </footer>
    );
}
