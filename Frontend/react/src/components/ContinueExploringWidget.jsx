import BlogIcon from '/src/assets/images/blogicon.webp'
import GuestbookIcon from '/src/assets/images/guestbookicon.webp'
import BigLink from "./BigLink"

const ContinueExploringWidget = () => {
    return (
        <div className="flex flex-col">
            <h2 className="text-2xl text-center font-semibold pb-4">Continue exploring</h2>
            <div className="max-lg:flex-col md:flex md:justify-center md:items-center md:w-full lg:space-x-4">                    
                <div className="my-4 ">
                    <BigLink target="/blog" text="Visit the blog" image={BlogIcon}/>
                </div>
                <div className="max-md:my-4">
                    <BigLink target="/guestbook" text="Sign the guestbook" image={GuestbookIcon}/>
                </div>
            </div>
        </div>
    );
}

export default ContinueExploringWidget
