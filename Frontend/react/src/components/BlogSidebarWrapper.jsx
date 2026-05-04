import BlogSidebar from "./BlogSidebar";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogSidebarWrapper = ({open, setOpen, onMobile = true}) => {
    //the next task is to make the archive menu span across the screen
    //my concern is that somewhere in the layout hierarchy we're capping the width to half the screen

    //gotta figure out why max-lg:w-dvw is causing overflow off the screen
    //possibly re-check the navbar?
    return (
        <div className = {`${open ? "flex flex-col flex-stretch left-0 right-0 top-16 " +
            "max-lg:overflow-y-auto " + 
            "h-dvh " +
            "lg:p-6 lg:w-[40ch]" 
        : "hidden pointer-events-none"}`}>
            <div className="max-lg:w-full max-lg:border-b">
                <button className="text-stone-800 text-left hover:underline hover:shadow-xl py-4 w-full h-full lg:hidden max-lg:indent-[10%]" 
                onClick={() => setOpen(false)}>&#x2715; Close archive</button>
            </div>
            <div className="max-lg:w-full max-lg:border-b">
                <Link to="/blog" onClick={() => {if(onMobile){setOpen(false)}}} className={"block text-stone-800 max-lg:indent-[10%] text-left underline max-lg:hover:shadow-lg max-lg:py-4 w-full h-full " +
                    "lg:rounded-lg lg:hover:text-shadow-lg lg:py-2"
                }>
                    ← Return to blog home
                </Link>
            </div>
            <BlogSidebar setOpen={setOpen} onMobile={onMobile}/>
        </div>
    );
};

export default BlogSidebarWrapper;
