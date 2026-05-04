import heroImg from '/src/assets/images/mainpage_heroimage.webp'
import mobileBg from '/src/assets/images/mobilebackground.webp'

const heroP1 = "I am a Full Stack Software Engineer freelancing out of Phoenix, AZ. I love using my skills to overcome complex and tricky challenges. I graduated with honors from Arizona State University's highly prestigious school of business, WP Carey, with a business degree and electives in computer science. This provides me a strong perspective in business, finance, and operational sides of organizations plus strong foundational knowledge in computer architecture/engineering.";
const heroP2 = "One skill I am proud of is my ability to craft creative solutions for whatever problem I encounter. A favorite quote of mine is \"restrictions breed creativity\" and thus far in my career, truer words have not been spoken; especially in our modern world with such nuanced situations. When I’m not at work, I’m often at home experimenting in the kitchen, crafting new recipes and perfecting old favorites.";
const hero3New = "One skill I am proud of is my ability to craft creative solutions for whatever problem I encounter. The truth is that there are many great programmers in the world, but not so many great problem solvers. In our modern world with such nuanced situations, my skill has been invaluable. When I’m not at work, I’m often at home experimenting in the kitchen, crafting new recipes and perfecting old favorites.";
const headerText = "Hello world! I'm Jacob";

const Hero = () => {
  return (
    <div className="">
        <div className="flex flex-col md:flex-row">

            {/* HERO IMAGE */}
            <div className="md:w-1/2 flex justify-center">
                <img
                    src={heroImg}
                    fetchPriority="high"
                    alt="Heroic!"
                    className="
                    h-[50vh]
                    md:h-full
                    object-cover
                    "
                />
            </div>

            {/* DESKTOP TEXT (right side) */}
            <div className="
            hidden md:flex
            items-center
            md:w-1/2
            lg:pl-0
            lg:pr-16
            lg:pl-2
            ">
                <div className="max-w-[65ch] md:py-4 px-8 md:rounded-xl md:bg-stone-100/60 md:shadow-2xl md:shadow-stone-100">
                    <h1 className="text-4xl font-bold mb-4">
                        {headerText}
                    </h1>
                    <p className="mb-4 leading-relaxed">
                        {heroP1}
                    </p>
                    <p className="leading-relaxed">
                        {hero3New}
                    </p>
                </div>
            </div>
        </div>

    {/* MOBILE TEXT SECTION (with its own background image) */}
        <div className="
            md:hidden
            bg-cover
            bg-center
            bg-no-repeat
            px-8
            py-12
        " style={{ backgroundImage: `url(${mobileBg})` }}>
            <div className="max-w-[65ch] mx-auto">
                <h1 className="text-3xl font-bold mb-4">
                    {headerText}
                </h1>
                <p className="mb-4 leading-relaxed">
                    {heroP1}
                </p>
                <p className="leading-relaxed">
                    {heroP2}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Hero
