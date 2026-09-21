import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-95 backdrop-blur-md border-b border-[var(--aairo-border)] py-4 transition-all duration-300">
        <div className="max-w-[1500px] mx-auto px-4 w-full">
          <div className="flex items-center justify-between flex-wrap">

            <div className="flex flex-col z-50">
              <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[var(--aairo-orange)] to-[var(--aairo-red)] bg-clip-text text-transparent tracking-wide">
                <Link to="/" className="no-underline text-inherit">
                  AAIRO
                </Link>
              </span>

              <span className="text-xs md:text-sm text-slate-400 -mt-1 tracking-wide">
                <Link to="/" className="no-underline text-inherit">
                  Robotics & AI Society
                </Link>
              </span>
            </div>

            <div className="hidden md:flex gap-8 items-center">

              <Link to="/about" className="text-slate-200 font-medium text-base relative py-2 no-underline hover:text-[var(--aairo-orange)] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[var(--aairo-orange)] after:to-[var(--aairo-red)] after:transition-all after:duration-300 hover:after:w-full">
                About
              </Link>

              <Link to="/projects" className="text-slate-200 font-medium text-base relative py-2 no-underline hover:text-[var(--aairo-orange)] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[var(--aairo-orange)] after:to-[var(--aairo-red)] after:transition-all after:duration-300 hover:after:w-full">
                Projects
              </Link>

              <Link to="/council" className="text-slate-200 font-medium text-base relative py-2 no-underline hover:text-[var(--aairo-orange)] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[var(--aairo-orange)] after:to-[var(--aairo-red)] after:transition-all after:duration-300 hover:after:w-full">
                Council
              </Link>

              <Link to="/blog" className="text-slate-200 font-medium text-base relative py-2 no-underline hover:text-[var(--aairo-orange)] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[var(--aairo-orange)] after:to-[var(--aairo-red)] after:transition-all after:duration-300 hover:after:w-full">
                Blog
              </Link>

              <Link to="/event" className="text-slate-200 font-medium text-base relative py-2 no-underline hover:text-[var(--aairo-orange)] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[var(--aairo-orange)] after:to-[var(--aairo-red)] after:transition-all after:duration-300 hover:after:w-full">
                Events
              </Link>

              <Link to="/calendar" className="text-slate-200 font-medium text-base relative py-2 no-underline hover:text-[var(--aairo-orange)] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[var(--aairo-orange)] after:to-[var(--aairo-red)] after:transition-all after:duration-300 hover:after:w-full">
                Calendar
              </Link>

              <Link to="/news" className="text-slate-200 font-medium text-base relative py-2 no-underline hover:text-[var(--aairo-orange)] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[var(--aairo-orange)] after:to-[var(--aairo-red)] after:transition-all after:duration-300 hover:after:w-full">
                News
              </Link>

              <Link to="/accreditations" className="text-slate-200 font-medium text-base relative py-2 no-underline hover:text-[var(--aairo-orange)] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[var(--aairo-orange)] after:to-[var(--aairo-red)] after:transition-all after:duration-300 hover:after:w-full">
                Accreditations
              </Link>

              <Link to="/membership" className="text-slate-200 font-medium text-base relative py-2 no-underline hover:text-[var(--aairo-orange)] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[var(--aairo-orange)] after:to-[var(--aairo-red)] after:transition-all after:duration-300 hover:after:w-full">
                Membership
              </Link>

              <Link to="/gallery" className="text-slate-200 font-medium text-base relative py-2 no-underline hover:text-[var(--aairo-orange)] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[var(--aairo-orange)] after:to-[var(--aairo-red)] after:transition-all after:duration-300 hover:after:w-full">
                Gallery
              </Link>

              <Link to="/contact" className="text-slate-200 font-medium text-base relative py-2 no-underline hover:text-[var(--aairo-orange)] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[var(--aairo-orange)] after:to-[var(--aairo-red)] after:transition-all after:duration-300 hover:after:w-full">
                Contact
              </Link>

            </div>

            <button
              className="md:hidden bg-transparent border-none text-white text-2xl cursor-pointer z-50 transition-transform duration-300 p-2 rounded hover:scale-110 hover:bg-[var(--aairo-orange)] hover:bg-opacity-10"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <FaBars />
            </button>

          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-98 backdrop-blur-lg z-40 pt-24 px-6 pb-6 flex flex-col gap-0 transition-transform duration-400 ease-in-out transform -translate-x-full ${mobileMenuOpen ? 'translate-x-0' : ''} overflow-y-auto`}
      >

        <button
          className="absolute top-5 right-6 bg-transparent border-none text-white text-2xl cursor-pointer p-2 rounded transition-all duration-300 hover:text-[var(--aairo-orange)] hover:bg-[var(--aairo-orange)] hover:bg-opacity-10 hover:scale-110"
          onClick={closeMobileMenu}
          aria-label="Close mobile menu"
        >
          <FaTimes />
        </button>

        <Link
          to="/"
          className="text-slate-200 py-5 border-b border-[var(--aairo-border)] text-lg font-medium transition-all duration-300 no-underline hover:text-[var(--aairo-orange)] hover:pl-4 hover:bg-[var(--aairo-orange)] hover:bg-opacity-5"
          onClick={closeMobileMenu}
        >
          Home
        </Link>

        <Link
          to="/about"
          className="text-slate-200 py-5 border-b border-[var(--aairo-border)] text-lg font-medium transition-all duration-300 no-underline hover:text-[var(--aairo-orange)] hover:pl-4 hover:bg-[var(--aairo-orange)] hover:bg-opacity-5"
          onClick={closeMobileMenu}
        >
          About
        </Link>

        <Link
          to="/projects"
          className="text-slate-200 py-5 border-b border-[var(--aairo-border)] text-lg font-medium transition-all duration-300 no-underline hover:text-[var(--aairo-orange)] hover:pl-4 hover:bg-[var(--aairo-orange)] hover:bg-opacity-5"
          onClick={closeMobileMenu}
        >
          Projects
        </Link>

        <Link
          to="/council"
          className="text-slate-200 py-5 border-b border-[var(--aairo-border)] text-lg font-medium transition-all duration-300 no-underline hover:text-[var(--aairo-orange)] hover:pl-4 hover:bg-[var(--aairo-orange)] hover:bg-opacity-5"
          onClick={closeMobileMenu}
        >
          Council
        </Link>

        <Link
          to="/blog"
          className="text-slate-200 py-5 border-b border-[var(--aairo-border)] text-lg font-medium transition-all duration-300 no-underline hover:text-[var(--aairo-orange)] hover:pl-4 hover:bg-[var(--aairo-orange)] hover:bg-opacity-5"
          onClick={closeMobileMenu}
        >
          Blog
        </Link>

        <Link
          to="/event"
          className="text-slate-200 py-5 border-b border-[var(--aairo-border)] text-lg font-medium transition-all duration-300 no-underline hover:text-[var(--aairo-orange)] hover:pl-4 hover:bg-[var(--aairo-orange)] hover:bg-opacity-5"
          onClick={closeMobileMenu}
        >
          Events
        </Link>

        <Link
          to="/calendar"
          className="text-slate-200 py-5 border-b border-[var(--aairo-border)] text-lg font-medium transition-all duration-300 no-underline hover:text-[var(--aairo-orange)] hover:pl-4 hover:bg-[var(--aairo-orange)] hover:bg-opacity-5"
          onClick={closeMobileMenu}
        >
          Calendar
        </Link>

        <Link
          to="/news"
          className="text-slate-200 py-5 border-b border-[var(--aairo-border)] text-lg font-medium transition-all duration-300 no-underline hover:text-[var(--aairo-orange)] hover:pl-4 hover:bg-[var(--aairo-orange)] hover:bg-opacity-5"
          onClick={closeMobileMenu}
        >
          News
        </Link>

        <Link
          to="/accreditations"
          className="text-slate-200 py-5 border-b border-[var(--aairo-border)] text-lg font-medium transition-all duration-300 no-underline hover:text-[var(--aairo-orange)] hover:pl-4 hover:bg-[var(--aairo-orange)] hover:bg-opacity-5"
          onClick={closeMobileMenu}
        >
          Accreditations
        </Link>

        <Link
          to="/membership"
          className="text-slate-200 py-5 border-b border-[var(--aairo-border)] text-lg font-medium transition-all duration-300 no-underline hover:text-[var(--aairo-orange)] hover:pl-4 hover:bg-[var(--aairo-orange)] hover:bg-opacity-5"
          onClick={closeMobileMenu}
        >
          Membership
        </Link>

        <Link
          to="/gallery"
          className="text-slate-200 py-5 border-b border-[var(--aairo-border)] text-lg font-medium transition-all duration-300 no-underline hover:text-[var(--aairo-orange)] hover:pl-4 hover:bg-[var(--aairo-orange)] hover:bg-opacity-5"
          onClick={closeMobileMenu}
        >
          Gallery
        </Link>

        <Link
          to="/contact"
          className="text-slate-200 py-5 text-lg font-medium transition-all duration-300 no-underline hover:text-[var(--aairo-orange)] hover:pl-4 hover:bg-[var(--aairo-orange)] hover:bg-opacity-5"
          onClick={closeMobileMenu}
        >
          Contact
        </Link>

      </div>
    </>
  );
};

export default NavBar;