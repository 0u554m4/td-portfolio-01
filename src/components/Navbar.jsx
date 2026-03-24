import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Github, Linkedin } from "lucide-react";

import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

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
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
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
            Antigravity &nbsp;
            <span className='sm:block hidden'> | Developer</span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10 items-center'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer transition-colors duration-300`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          <li className='flex gap-4 items-center ml-4 border-l border-white/10 pl-4'>
            <a
              href='https://github.com'
              target='_blank'
              rel='noreferrer'
              className='text-secondary hover:text-white transition-colors'
            >
              <Github size={20} />
            </a>
            <a
              href='https://linkedin.com'
              target='_blank'
              rel='noreferrer'
              className='text-secondary hover:text-white transition-colors'
            >
              <Linkedin size={20} />
            </a>
          </li>
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <div className='w-[28px] h-[28px] flex items-center justify-center cursor-pointer'>
            {toggle ? (
              <X className='text-white' onClick={() => setToggle(!toggle)} />
            ) : (
              <Menu className='text-white' onClick={() => setToggle(!toggle)} />
            )}
          </div>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 glassmorphism absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl overflow-hidden`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
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
