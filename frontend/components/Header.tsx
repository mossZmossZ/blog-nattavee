'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header" id="site-header">
            <div className="header-inner">
                <Link href="/" className="logo">
                    <span className="logo-icon">N</span>
                    Nattavee Blog
                </Link>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>

                <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                    <Link
                        href="/"
                        className={`nav-link ${pathname === '/' ? 'active' : ''}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/category"
                        className={`nav-link ${pathname.startsWith('/category') ? 'active' : ''}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Categories
                    </Link>
                    <Link
                        href="/admin"
                        className="nav-admin"
                        onClick={() => setMenuOpen(false)}
                    >
                        Admin
                    </Link>
                </nav>
            </div>
        </header>
    );
}
