import Hero from "../components/Hero"
import BigLink from "../components/BigLink"
import Container from "../components/Container"
import HeroBg from '/src/assets/images/mainpage_herobackground.webp'
import BlogIcon from '/src/assets/images/blogicon.webp'
import ResumeIcon from '/src/assets/images/resumeicon.webp'
import GuestbookIcon from '/src/assets/images/guestbookicon.webp'
import ContactIcon from '/src/assets/images/contacticon.webp'

const MainPage = () => {
//todo fix the navbar and buttons that are off screen for 400px wide
    return (
        <div className="">
            <div fetchPriority="high" className="px-0 lg:px-8 xl:px-16 bg-cover bg-center bg-no-repeat bg-stone-100/75" style={{ backgroundImage: `url(${HeroBg})` }}>
                <div className="max-w-6xl mx-auto">
                <Hero/>
                </div>
            </div>
            <div className="flex justify-center items-center w-full p-8">
                <div className="text-center text-lg">
                    Welcome to my website. It is a full-stack application using ReactJS, Java/Spring Boot and PostgreSQL.
                    <br/>
                    Use the navigation bar at the top or these buttons below to explore!
                </div>
            </div>
            <div className="pb-8">
                <Container>
                    <div className="flex justify-center items-center w-full min-h-60 block">
                        <div className="max-lg:flex-col md:flex md:justify-center md:items-center md:w-full">                    
                            <div className="my-4 lg:mx-4">
                                <BigLink target="/about" text="About Jacob Ryan" image={ResumeIcon}/>
                            </div>
                             <div className="md:">
                                <BigLink target="/contact" text="Get in touch" image={ContactIcon}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full min-h-60 block mb-8">
                        <div className="max-lg:flex-col md:flex md:justify-center md:items-center md:w-full">                    
                            <div className="my-4 lg:mx-4">
                                <BigLink target="/blog" text="Visit the blog" image={BlogIcon}/>
                            </div>
                            <div className="max-md:my-4">
                                <BigLink target="/guestbook" text="Sign the guestbook" image={GuestbookIcon}/>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default MainPage
