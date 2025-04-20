'use client';

import React from 'react';
import DashboardLayout from '@/components/ui/layout/DashboardLayout';
import SearchBar, { SearchParams } from '@/components/ui/patients/Search';

export default function RecordsPage() {
    const handleSearch = (params: SearchParams) => {
        console.log('Search params:', params);
    };

    return (
        <DashboardLayout pageTitle="Records">
            <SearchBar onSearch={handleSearch} />
        </DashboardLayout>
    );
}
