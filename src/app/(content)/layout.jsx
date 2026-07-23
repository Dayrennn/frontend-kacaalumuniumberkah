'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu } from 'lucide-react';
import Sidebar from '../components/sidebar/page';
import { selectUser } from '@/hooks/api/authSliceAPI';

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = useSelector(selectUser);

    const isAdmin = user?.role === 'Admin';
    const isOwner = user?.role === 'Owner';

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} isAdmin={isAdmin} isOwner={isOwner} />

            {/* pl-64 harus sama dengan lebar sidebar (w-64) */}
            <div className="lg:pl-64">
                {/* Topbar cuma dipakai buat toggle sidebar di layar kecil */}
                <header className="sticky top-0 z-20 flex h-16 items-center border-b border-gray-100 bg-white px-4 lg:hidden">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="rounded-xl p-2 text-gray-500 hover:bg-gray-50"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <span className="ml-3 font-bold text-gray-900">Plavon</span>
                </header>

                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
