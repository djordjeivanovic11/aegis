'use client';

import React from 'react';
import Link from 'next/link';
import { FaCog } from 'react-icons/fa';

const navItems = [
    { name: 'Agenda', href: '/agenda' },
    { name: 'Patients', href: '/agenda/visit' }
];

const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-card border-r border-default p-6 hidden lg:block">
            <h2 className="text-xl font-bold text-primary mb-6">
                <Link href="/">
                    AEGIS
                </Link>
            </h2>
            <nav>
                <ul className="space-y-4">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                                className="block text-base font-medium text-foreground hover:text-primary transition"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-10 border-t border-muted pt-6">
                <Link
                    href="/settings"
                    className="flex items-center gap-2 text-base font-medium text-muted-foreground hover:text-primary transition"
                >
                    <FaCog className="text-lg" />
                    Report Settings
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
