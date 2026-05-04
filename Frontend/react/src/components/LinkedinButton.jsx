import LinkedinImg from "/src/assets/images/linkedinlogo.webp";

const LinkedinButton = () => {
  const styling = "flex items-center gap-2 block transition duration-300 ease-in-out hover:scale-110 hover:text-shadow-lg";
  return (
    <a href="https://www.linkedin.com/in/jacobryan001/" target="_blank" rel="noopener noreferrer" className={styling}>
        <img className="lg:block h-10 w-auto" src={LinkedinImg} alt="LinkedIn"/>
        <span className="underline">
          Connect with me on Linkedin ↗
        </span>
    </a>
  );
}
export default LinkedinButton