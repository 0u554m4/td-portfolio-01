import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Github, Linkedin, Globe } from "lucide-react";

import { navLinks } from "../constants";
import { useLanguage } from "../utils/i18n";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { language, setLanguage, t, isRtl } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      className={`sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-50 transition-all duration-300 ${
        scrolled ? "glassmorphism-navbar py-3" : "bg-transparent"
      }`}
    >
      <div className='w-full flex sm:grid sm:grid-cols-[1fr_auto_1.5fr] justify-between items-center max-w-7xl mx-auto relative'>
        <div className='flex items-center gap-2 justify-start'>
          <Link
            to='/'
            className='flex items-center gap-2'
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <div className='w-10 h-10 rounded-full flex items-center justify-center bg-white/10 glassmorphism'>
              <span className='text-[18px] font-bold text-white'>A</span>
            </div>
            <p className='text-white text-[18px] font-bold cursor-pointer flex '>
              oussama &nbsp;
              <span className='sm:block hidden'> | Developer</span>
            </p>
          </Link>
        </div>

        {/* Centered Language Switcher (Always Visible) */}
        <div className='absolute left-1/2 top-1/2 sm:static sm:left-auto sm:top-auto -translate-x-1/2 -translate-y-1/2 sm:translate-x-0 sm:translate-y-0 flex gap-1 items-center bg-white/5 border border-white/10 rounded-2xl px-2 py-1 glassmorphism z-50 shadow-lg shadow-black/20'>
          {['en', 'fr', 'ar'].map((lang) => (
             <button
               key={lang}
               onClick={() => setLanguage(lang)}
               className={`text-[12px] sm:text-[14px] uppercase font-bold transition-all px-3 py-1.5 rounded-xl ${
                 language === lang ? 'bg-[#915eff] text-white shadow-md' : 'text-secondary hover:text-white hover:bg-white/10'
               }`}
             >
               {lang}
             </button>
          ))}
        </div>

        <ul className='list-none hidden sm:flex flex-row gap-5 lg:gap-8 items-center justify-end'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[17px] lg:text-[18px] font-medium cursor-pointer transition-colors duration-300 whitespace-nowrap`}
              onClick={() => {
                setActive(nav.title);
                const element = document.getElementById(nav.id);
                if (element) {
                   const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
                   window.scrollTo({top: y, behavior: 'smooth'});
                }
              }}
            >
              {t(`nav.${nav.id}`)}
            </li>
          ))}
          <li className={`flex gap-4 items-center ${isRtl ? 'mr-4 border-r pr-4' : 'ml-4 border-l pl-4'} border-white/10`}>
            <a href='https://github.com/oussahmane' target='_blank' rel='noreferrer' className='text-secondary hover:text-white transition-colors'>
              <Github size={20} />
            </a>
            <a href='https://www.linkedin.com/in/oussahmane/' target='_blank' rel='noreferrer' className='text-secondary hover:text-white transition-colors'>
              <Linkedin size={20} />
            </a>
          </li>
        </ul>

        {/* Mobile Menu */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <div className='w-[28px] h-[28px] flex items-center justify-center cursor-pointer z-[110] relative'>
            {toggle ? (
              <X className='text-white' onClick={() => setToggle(!toggle)} />
            ) : (
              <Menu className='text-white' onClick={() => setToggle(!toggle)} />
            )}
          </div>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 glassmorphism absolute top-20 ${isRtl ? 'left-0' : 'right-0'} mx-4 my-2 min-w-[200px] z-[100] rounded-2xl border border-white/10 shadow-2xl shadow-black/50 animate-in fade-in zoom-in duration-300`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-5'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-semibold cursor-pointer text-[18px] w-full py-2 border-b border-white/5 last:border-0 ${
                    active === nav.title ? "text-white" : "text-secondary"
                  } hover:text-white transition-colors text-start`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                    const element = document.getElementById(nav.id);
                    if (element) {
                       const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
                       window.scrollTo({top: y, behavior: 'smooth'});
                    }
                  }}
                >
                  {t(`nav.${nav.id}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
