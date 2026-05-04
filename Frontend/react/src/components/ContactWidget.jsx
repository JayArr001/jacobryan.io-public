import MailButton from "../components/MailButton";
import GithubButton from "../components/GithubButton";
import LinkedinButton from "../components/LinkedinButton";

const ContactWidget = ({center = false}) => {
      const styling = center
    ? "w-full flex flex-col relative space-y-4 items-center"
    : "w-full flex flex-col relative space-y-4";

    return (
        <div className={styling}>
            <MailButton/>
            <LinkedinButton />
            <GithubButton />
        </div>
  );
}

export default ContactWidget
