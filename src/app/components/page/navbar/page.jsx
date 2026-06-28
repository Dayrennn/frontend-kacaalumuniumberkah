'use client';

import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="#home" className="flex items-center gap-2 group">
                        <span className="text-xl font-extrabold text-gray-900">
                            Berkah Kaca <span className="text-blue-600">Alumunium</span>
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
                        {['home', 'about', 'products', 'address', 'contact'].map((id) => (
                            <li key={id}>
                                <a href={`#${id}`} className="hover:text-blue-600 transition-colors capitalize">
                                    {id === 'about'
                                        ? 'Profile'
                                        : id === 'address'
                                          ? 'Address'
                                          : id.charAt(0).toUpperCase() + id.slice(1)}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-3">
                        <a
                            href="/login"
                            className="hidden md:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-sm transition-colors"
                        >
                            <i className="fa-solid fa-right-to-bracket text-xs"></i> Login
                        </a>
                        <button
                            onClick={toggleMenu}
                            id="menu-toggle"
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-gray-700 text-lg`}></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div id="mobile-menu" className={isOpen ? 'open' : ''}>
                    <ul className="flex flex-col gap-1 pb-4 text-sm font-medium text-gray-700">
                        {[
                            ['#home', 'Home'],
                            ['#about', 'Profile'],
                            ['#products', 'Products'],
                            ['#address', 'Address'],
                            ['#contact', 'Contact'],
                        ].map(([href, label]) => (
                            <li key={href}>
                                <a
                                    href={href}
                                    onClick={closeMenu}
                                    className="block px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a
                                href="/login"
                                onClick={closeMenu}
                                className=" items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-sm transition-colors"
                            >
                                Login
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
