'use client';

import SidebarLink from './sidebarLink/sidebarLink';
import SidebarSubLink from './sidebarLink/sidebarSubLink';
import SidebarGroup from './sidebarGroup/sidebarGroup';
import {
    LayoutDashboard,
    Package,
    Tag,
    Warehouse,
    ArrowDownToLine,
    ArrowUpFromLine,
    Image as ImageIcon,
    Box,
    Building2,
    Phone,
    Users,
    LogOut,
} from 'lucide-react';
import { useLogoutMutation, useGetMeQuery } from '@/hooks/api/userSliceAPI';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import LogoutModal from '../modal/logoutModal';
import { logout as logoutAction } from '@/hooks/api/authSliceAPI';

const ROLE_LABELS = {
    Admin: 'Admin',
    Owner: 'Owner',
};

export default function Sidebar({ open = true, onClose, isAdmin = false, isOwner = false }) {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [logoutAPI, { isLoading: logoutLoading }] = useLogoutMutation();
    const { data: meData, isLoading: profileLoading } = useGetMeQuery();
    const router = useRouter();
    const dispatch = useDispatch();

    const user = meData?.data;
    const roleLabel = user?.role ? (ROLE_LABELS[user.role] ?? user.role) : '';

    const handleLogout = async () => {
        try {
            await logoutAPI().unwrap();
        } catch (error) {
            console.error('logout gagal', error);
        } finally {
            dispatch(logoutAction());
            router.push('/login');
        }
    };

    const dashboardLink = isAdmin ? '/dashboard/admin' : isOwner ? '/dashboard/owner' : '/';

    return (
        <>
            {/* Overlay mobile */}
            {open && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={onClose} />}

            <aside
                className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-40 transition-transform duration-200 ${
                    open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                {/* Brand */}
                <div className="flex items-center gap-3 px-6 py-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-blue-600 shadow-lg shadow-blue-200 shrink-0">
                        <Warehouse className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-extrabold text-gray-900 text-lg">Plavon</span>
                </div>

                {/* Menu */}
                <nav className="flex-1 overflow-y-auto px-4 space-y-1 pb-4">
                    <SidebarLink href={dashboardLink} icon={LayoutDashboard}>
                        Dashboard
                    </SidebarLink>

                    <SidebarGroup icon={Package} label="Master Data" basePath="/master-data">
                        <SidebarSubLink href="/master-data/data-barang" icon={Package}>
                            Barang
                        </SidebarSubLink>
                        <SidebarSubLink href="/master-data/kategori" icon={Tag}>
                            Kategori
                        </SidebarSubLink>
                    </SidebarGroup>

                    <SidebarGroup icon={Warehouse} label="Gudang" basePath="/gudang">
                        <SidebarSubLink href="/gudang/barang-masuk" icon={ArrowDownToLine}>
                            Barang Masuk
                        </SidebarSubLink>
                        <SidebarSubLink href="/gudang/barang-keluar" icon={ArrowUpFromLine}>
                            Barang Keluar
                        </SidebarSubLink>
                    </SidebarGroup>

                    <SidebarGroup icon={Building2} label="Company Profile" basePath="/company-profile">
                        <SidebarSubLink href="/company-profile/banner" icon={ImageIcon}>
                            Banner
                        </SidebarSubLink>
                        <SidebarSubLink href="/company-profile/produk" icon={Box}>
                            Produk
                        </SidebarSubLink>
                        <SidebarSubLink href="/company-profile/profile-perusahaan" icon={Building2}>
                            Profil Perusahaan
                        </SidebarSubLink>
                    </SidebarGroup>
                    {isOwner && (
                        <SidebarLink href="/pengguna" icon={Users}>
                            Pengguna
                        </SidebarLink>
                    )}
                </nav>

                {/* Profile + Logout */}
                <div className="px-4 py-4 border-t border-gray-100 space-y-2">
                    {profileLoading ? (
                        <div className="flex items-center gap-3 px-3 py-2 rounded-xl animate-pulse">
                            <div className="w-9 h-9 rounded-full bg-gray-100 shrink-0" />
                            <div className="flex-1 space-y-1.5">
                                <div className="h-3 w-20 bg-gray-100 rounded" />
                                <div className="h-2.5 w-12 bg-gray-100 rounded" />
                            </div>
                        </div>
                    ) : user ? (
                        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50">
                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0">
                                {user.username?.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">{user.username}</p>
                                <p className="text-xs text-gray-500 truncate">{roleLabel}</p>
                            </div>
                        </div>
                    ) : null}

                    <button
                        type="button"
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
                    >
                        <LogOut className="w-[18px] h-[18px] shrink-0" />
                        Logout
                    </button>
                </div>
            </aside>
            {showLogoutModal && (
                <LogoutModal
                    onConfirm={handleLogout}
                    onCancel={() => setShowLogoutModal(false)}
                    isLoading={logoutLoading}
                />
            )}
        </>
    );
}
