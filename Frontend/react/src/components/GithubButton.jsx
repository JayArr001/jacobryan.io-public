import GithubImg from "/src/assets/images/githublogo.webp";

const GithubButton = () => {
  const styling = "flex items-center gap-2 block transition duration-300 ease-in-out hover:scale-110 hover:text-shadow-lg";
  return (
    <a href="https://github.com/JayArr001" target="_blank" rel="noopener noreferrer" className={styling}>
        <img className="lg:block h-10 w-auto" src={GithubImg} alt="Email"/>
        <span className="underline">
          Check out my GitHub ↗
        </span>
    </a>
  );
}
export default GithubButton