'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/context/AuthContext';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
    children?: ReactNode;
    pageTitle?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
                                                             children,
                                                             pageTitle,
                                                         }) => {
    const { token, logout } = useAuth();
    const router = useRouter();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!token) {
            router.replace('/login');
        }
    }, [token, router]);

    // While we don’t know auth state (or redirecting), render nothing
    if (!token) {
        return null;
    }

    return (
        <div className="min-h-screen flex bg-background text-foreground">
            {/* Sidebar */}
            <Sidebar />

            {/* Main area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-between bg-card border-b border-border px-6 py-4 shadow-sm">
                    <h1 className="text-2xl font-semibold text-primary">
                        {pageTitle}
                    </h1>
                    <button
                        onClick={() => {
                            logout();
                            router.replace('/login');
                        }}
                        className="text-sm text-accent hover:underline"
                    >
                        Logout
                    </button>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-auto p-6">
                    <div className="max-w-6xl mx-auto space-y-6">
                        <div className="bg-card rounded-xl p-6 shadow-inner border border-border">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
