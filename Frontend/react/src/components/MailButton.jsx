import mailLogo from '/src/assets/images/mailicon.webp'

const MailButton = () => {
  const styling = "flex items-center gap-2 block transition duration-300 ease-in-out hover:scale-110 hover:text-shadow-lg";
  return (
    <a href="mailto:jryan5685@gmail.com" target="_blank" rel="noopener noreferrer" className={styling}>
        <img className="lg:block h-10 w-auto" src={mailLogo} alt="Email"/>
        <span className="underline">
          Email me at jryan5685@gmail.com ↗
        </span>
    </a>
  );
}

export default MailButton
