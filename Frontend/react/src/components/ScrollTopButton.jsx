import topicon from '/src/assets/images/topbutton.webp'
import { useState, useEffect } from 'react';

const ScrollTopButton = () => {
    const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if(window.scrollY > 200)
      {
        setIsScrolled(true);
      }
      else
      {
        setIsScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  const buttonLogic = (isScrolled) ? "transition-all duration-300 ease-in opacity-100" : 
    "pointer-events-none transition-all duration-300 ease-out opacity-0";

  const buttonStyling = "fixed bottom-4 right-4 z-50 " + buttonLogic;

  return (
    <div className={buttonStyling}>
        <input type="image" src={topicon} className="" onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsScrolled(false)}}/>
    </div>
  )
}

export default ScrollTopButton
