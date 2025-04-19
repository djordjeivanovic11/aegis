'use client';

import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const navigation = [
    { name: 'Team', href: '/team' },
    { name: 'Login', href: '/login' },
];

export default function Navbar() {
    return (
        <Disclosure as="nav" className="bg-background border-b border-default shadow-sm">
            {({ open }) => (
                <>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <Link href="/public" className="text-2xl font-extrabold tracking-widest text-primary">
                                    AEGIS
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden sm:flex sm:space-x-6 text-sm font-medium text-foreground">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="hover:text-primary transition"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="sm:hidden">
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                                    aria-label="Toggle menu"
                                >
                                    {open ? (
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Panel */}
                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-4 pt-2 pb-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as={Link}
                                    href={item.href}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary"
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
