import ContactWidget from "../components/ContactWidget";
import ContinueExploringWidget from "../components/ContinueExploringWidget";

const ContactPage = () => {
    return (
      <div className="px-8 pt-4 flex flex-col items-center gap-8 max-w-[80ch] mx-auto h-screen max-lg:mb-28">
        <div>
          <h1 className="text-3xl">
            Let's connect!
          </h1>
          <div className="flex items-center mb-4">
            <hr className="max-lg:w-full max-lg:max-w-[185px] lg:w-[185px] border-b"/>
          </div>
          <p className="pb-4">
            I love connecting with people and am always up for a chat! Feel free to contact me via your method of choice:
          </p>
          <ContactWidget />
        </div>

        <hr className="min-w-[170px] w-[80%]"/>
        <div className="">
          <ContinueExploringWidget/>
        </div>        
      </div>
    );
}

export default ContactPage
