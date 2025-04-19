'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/components/context/AuthContext';
import { usePathname } from 'next/navigation';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const noShell = ['/', '/team', '/login'];
    const isDashboard = !noShell.includes(pathname);

    return (
        <html lang="en" className={inter.variable}>
        <body className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased">
        <AuthProvider>
            {!isDashboard && <Navbar />}
            <main className={`${!isDashboard ? 'px-6 py-8 max-w-5xl mx-auto' : ''}`}>
                {children}
            </main>
            {!isDashboard && <Footer />}
        </AuthProvider>
        </body>
        </html>
    );
}
