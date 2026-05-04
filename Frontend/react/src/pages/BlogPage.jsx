import { useEffect, useState, useRef} from 'react';
import BlogSidebarWrapper from '../components/BlogSidebarWrapper';
import { Outlet } from 'react-router-dom';

const BlogPage = () => {
  const LARGE_DISPLAY_BREAKPOINT = 1024; //large display breakpoint pixels
  const isLargeWindow = () => {
    if (window.innerWidth >= LARGE_DISPLAY_BREAKPOINT) {
      return true;
    } 
    else {
      return false;
    }
  }
  const [isMobile, setMobile] = useState(() => {return !isLargeWindow()});
  const [sideOpen, setSideOpen] = useState(() => {return !isMobile;});
  const prevIsMobile = useRef(isMobile);

  const navRef = useRef(null)

  //close the sidebar on clicking some link that isn't the current page
  //if the user is on desktop then the sidebar will stay open because we set the initial value on render
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setSideOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleResize = () => {
    const newIsMobile = !isLargeWindow();

    if (newIsMobile === prevIsMobile.current) return;

    if (newIsMobile) {
      setSideOpen(false);
    } else {
      setSideOpen(true);
    }

    setMobile(newIsMobile);
    prevIsMobile.current = newIsMobile;
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  })

  const archiveButtonStyling = (sideOpen) ? "hidden pointer-events-none" : 
  "bg-slate-700 my-4 p-2 text-stone-100 hover:shadow-xl rounded-md lg:hidden";

  const mainContentStyling = () => {
    if(isMobile && sideOpen)
    {
      return "hidden pointer-events-none";
    }
    else {
      return "flex-1 m-6 px-6 pb-6 pt-2 max-w-xl";
    }
  };

  const wrapperStyling = () => {
    if(isMobile && sideOpen)
    {
      return "w-screen items-stretch bg-zinc-300/25";
    }
    else if(isMobile && !sideOpen)
    {
      return "hidden";
    }
    else
    {
      return "flex bg-zinc-400/25";
    }
  };

  return (
    <div className="flex w-full justify-center">
      <div className={wrapperStyling()}>
        <BlogSidebarWrapper open = {sideOpen} setOpen = {setSideOpen} onMobile = {isMobile}/>
      </div>
      
      <main className={mainContentStyling()}>
        <div>
          <button className={archiveButtonStyling} onClick={() => {setSideOpen(true);}}>
            Blog Archive
          </button>
        </div>
        <Outlet/> {/*Blog content displayed via outlet*/}
      </main>
    </div>
  );
};

export default BlogPage;
