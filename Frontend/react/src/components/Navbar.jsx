import logo from '/src/assets/images/homelogo.webp'
import defaultAv from '/src/assets/images/defaultavatar.webp'
import googleLogo from '/src/assets/images/googleicon.webp'
import GoogleLogin from './GoogleLogin';
import {NavLink} from 'react-router-dom'
import { useState, useRef, useEffect } from "react"
import { useUser } from '../UserContext';
import Spinner from './Spinner';

const Navbar = () => {
  const {user, isLoggedIn, loadingUser } = useUser();
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(googleLogo);

  useEffect(() => {
    if (!user?.picture) return;

    const img = new Image();
    img.src = user.picture;

    img.onload = () => setImgSrc(user.picture);
    img.onerror = () => setImgSrc(defaultAv);
  }, [user?.picture]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, []);

  useEffect(() => {
    function handleScroll() {
      setOpen(false)
    }

    if (open) {
      window.addEventListener("scroll", handleScroll)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [open]);

  const linkClass = ({isActive}) => isActive ? 'text-center bg-white hover:shadow-xl rounded-md px-3 py-2' :
      'text-center text-gray-100 hover:bg-blue-500 hover:shadow-xl rounded-md px-3 py-2';

  const hamburgerStyling = "block w-10 h-1 bg-stone-300";

  const NavbarLinks = ({ linkClass }) => (
  <>
    <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>About me</NavLink>
    <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>Contact</NavLink>
    <NavLink to="/blog" className={linkClass} onClick={() => setOpen(false)}>Blog</NavLink>
    <NavLink to="/guestbook" className={linkClass} onClick={() => setOpen(false)}>Guestbook</NavLink>
  </>
  )


  return (
    <nav ref={navRef} className="bg-slate-700">
      <div className="mx-auto lg:max-w-6xl px-2 lg:px-8">
        <div className="flex h-20 items-center px-4">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start flex-shrink-0">
            <NavLink className="flex flex-shrink-0 items-center" to="/" onClick={() => setOpen(false)}>
              <img className="lg:block h-10 w-auto" src={logo} alt="Logo" />
              <span className="lg:block text-white text-2xl font-bold ml-2 hover:text-blue-100">
                Home
              </span>
            </NavLink>
            <div className="lg:ml-auto flex-grow flex justify-end relative">
              {/* Hamburger (mobile only) */}
              <button
                className="hover:bg-slate-600 rounded-md md:hidden p-2"
                onClick={() => setOpen(!open)}>
                <div className="space-y-1">
                  <span className={hamburgerStyling}></span>
                  <span className={hamburgerStyling}></span>
                  <span className={hamburgerStyling}></span>
                </div>
              </button>
              <div className="md:hidden border-r-2 border-stone-100 pr-3 mr-4"></div>
              {/* Mobile dropdown */}
              <div className={`md:hidden fixed left-0 right-0 top-16 bg-slate-700 shadow-lg flex flex-col space-y-4 py-16 px-8 z-50 transition-all overflow-hidden ${
                  open ? "max-h-96 opacity-100 duration-300" : "max-h-0 opacity-0 duration-200 pointer-events-none"
                }`}
              >
                <NavbarLinks linkClass={linkClass} closeMenu={() => setOpen(false)}/>
              </div>

            </div>
          </div>

          <div className="flex items-center flex-shrink-0">
            {/*Desktop linkbar*/}
            <div className="hidden md:flex space-x-3 px-3 mr-3 md:border-r-2 md:border-stone-100">
              <NavbarLinks linkClass={linkClass} closeMenu={() => setOpen(false)}/>
            </div>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <img src={imgSrc} alt="profile" className="h-8 w-8 rounded-full"/>
                <span className="text-white hidden sm:inline">
                  {user?.name}
                </span>
                <a
                  href="/logout"
                  className="ml-4 underline text-white transition"
                >
                  Logout
                </a>
              </div>
            ) : (
              <div className="flex flex-shrink-0 items-center hover:shadow-xl/50">
                <GoogleLogin />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar