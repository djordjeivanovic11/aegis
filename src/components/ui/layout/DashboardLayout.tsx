'use client';

import React from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
    children?: React.ReactNode;
    pageTitle?: string;
}

export default function DashboardLayout({
                                            children,
                                            pageTitle,
                                        }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen bg-background text-foreground">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                {pageTitle && (
                    <header className="px-4 py-2 border-b bg-card border-border">
                        <h1 className="text-xl font-medium text-primary">{pageTitle}</h1>
                    </header>
                )}

                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
