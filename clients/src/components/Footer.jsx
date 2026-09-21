import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaInstagram,
    FaLinkedin,
    FaEnvelope,
    FaMapMarkerAlt,
    FaUserTie,
    FaArrowUp
} from 'react-icons/fa';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const quickLinks = [
        ['About', '/about'],
        ['Projects', '/projects'],
        ['Blog', '/blog'],
        ['Calendar', '/calendar'],
        ['Gallery', '/gallery'],
        ['Membership', '/membership']
    ];

    const resources = [
        ['Research Papers', '/research-papers'],
        ['Tutorials', '/tutorials'],
        ['Documentation', '/documentation'],
        ['News & Updates', '/news-updates'],
        ['Community', '/community']
    ];

    return (
        <footer className="relative bg-gradient-to-br from-slate-900 to-slate-800 border-t border-[var(--aairo-border)] pt-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--aairo-orange)]/5 via-transparent to-[var(--aairo-red)]/5 pointer-events-none"></div>

            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--aairo-orange)]/50 to-transparent"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    className="absolute -top-6 right-4 sm:right-8 w-12 h-12 bg-gradient-to-r from-[var(--aairo-orange)] to-[var(--aairo-red)] rounded-full text-white text-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[var(--aairo-orange)]/30"
                >
                    <FaArrowUp />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    <div className="md:col-span-2 lg:col-span-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-[var(--aairo-orange)] to-[var(--aairo-red)] bg-clip-text text-transparent mb-2">
                            AAIRO
                        </h3>

                        <p className="text-slate-400 italic mb-4">
                            Automation with Artificial Intelligence and Robotics
                        </p>

                        <p className="text-slate-300 mb-6 leading-relaxed">
                            Inspiring the future through cutting-edge AI and robotics research, fostering innovation and technological advancement in the academic community.
                        </p>

                        <div className="flex justify-center md:justify-start space-x-4">
                            <a
                                href="https://www.instagram.com/aairo_adgips/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-12 h-12 flex items-center justify-center bg-[var(--aairo-orange)]/10 border-2 border-[var(--aairo-orange)]/30 rounded-xl text-[var(--aairo-orange)] text-xl transition-all duration-300 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--aairo-orange)]/30 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--aairo-orange)] to-[var(--aairo-red)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10"></div>
                                <FaInstagram />
                            </a>

                            <a
                                href="https://www.linkedin.com/company/108359386/admin/dashboard/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="w-12 h-12 flex items-center justify-center bg-[var(--aairo-orange)]/10 border-2 border-[var(--aairo-orange)]/30 rounded-xl text-[var(--aairo-orange)] text-xl transition-all duration-300 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--aairo-orange)]/30 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--aairo-orange)] to-[var(--aairo-red)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10"></div>
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="text-xl font-semibold text-slate-100 mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-[var(--aairo-orange)] to-[var(--aairo-red)] rounded-full"></span>
                        </h4>

                        <ul className="grid grid-cols-2 md:grid-cols-1 gap-3">
                            {quickLinks.map(([item, path]) => (
                                <li key={path} className="transition-all duration-300 hover:translate-x-1">
                                    <Link
                                        to={path}
                                        className="text-slate-400 flex items-center justify-center md:justify-start gap-2 py-2 transition-all duration-300 hover:text-[var(--aairo-orange)] hover:pl-2 rounded-md group"
                                    >
                                        <span className="w-0 h-0.5 bg-gradient-to-r from-[var(--aairo-orange)] to-[var(--aairo-red)] transition-all duration-300 group-hover:w-3"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="text-xl font-semibold text-slate-100 mb-6 relative inline-block">
                            Resources
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-[var(--aairo-orange)] to-[var(--aairo-red)] rounded-full"></span>
                        </h4>

                        <ul className="grid grid-cols-2 md:grid-cols-1 gap-3">
                            {resources.map(([item, path]) => (
                                <li key={path} className="transition-all duration-300 hover:translate-x-1">
                                    <Link
                                        to={path}
                                        className="text-slate-400 flex items-center justify-center md:justify-start gap-2 py-2 transition-all duration-300 hover:text-[var(--aairo-orange)] hover:pl-2 rounded-md group"
                                    >
                                        <span className="w-0 h-0.5 bg-gradient-to-r from-[var(--aairo-orange)] to-[var(--aairo-red)] transition-all duration-300 group-hover:w-3"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="text-xl font-semibold text-slate-100 mb-6 relative inline-block">
                            Contact
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-[var(--aairo-orange)] to-[var(--aairo-red)] rounded-full"></span>
                        </h4>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-4 bg-[var(--aairo-orange)]/5 rounded-xl border-l-4 border-[var(--aairo-orange)]/30 transition-all duration-300 hover:bg-[var(--aairo-orange)]/10 hover:border-[var(--aairo-orange)] hover:translate-x-1">
                                <FaEnvelope className="text-[var(--aairo-orange)] mt-1 flex-shrink-0" />
                                <span className="text-slate-300 text-sm">
                                    aairosociety@gmail.com
                                </span>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-[var(--aairo-orange)]/5 rounded-xl border-l-4 border-[var(--aairo-orange)]/30 transition-all duration-300 hover:bg-[var(--aairo-orange)]/10 hover:border-[var(--aairo-orange)] hover:translate-x-1">
                                <FaMapMarkerAlt className="text-[var(--aairo-orange)] mt-1 flex-shrink-0" />
                                <span className="text-slate-300 text-sm">
                                    Dr. Akhilesh Das Gupta Institute of Professional Studies, Shastri Park, New Delhi – 110053
                                </span>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-[var(--aairo-orange)]/5 rounded-xl border-l-4 border-[var(--aairo-orange)]/30 transition-all duration-300 hover:bg-[var(--aairo-orange)]/10 hover:border-[var(--aairo-orange)] hover:translate-x-1">
                                <FaUserTie className="text-[var(--aairo-orange)] mt-1 flex-shrink-0" />
                                <span className="text-slate-300 text-sm">
                                    Faculty Coordinator:
                                    <br />
                                    Yashpal Chopra
                                    <br />
                                    yashpalchopra@adgips.ac.in
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[var(--aairo-border)] py-8 text-center bg-slate-900/50 rounded-lg">
                    <p className="text-slate-500 text-sm">
                        &copy; 2026 AAIRO - Robotics & AI Society. All rights reserved. | Made with ❤️ for Innovation
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;