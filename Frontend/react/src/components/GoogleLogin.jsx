import googleLogo from '/src/assets/images/googleicon.webp'

const GoogleLogin = ({textColor="black", bgColor="white", googleBg="white", forceText = false}) => {
  const textColors = {
    black: "text-black",
    white: "text-white"
  };

  const bgColors = {
    white: "bg-white",
    black: "bg-black",
    slate: "bg-slate-700"
  };

  const textStyle = forceText
    ? `text-${textColor} underline bg-${bgColor} rounded-lg p-2`
    : `hidden md:block text-${textColor} underline bg-${bgColor} rounded-lg p-2`;
 
  return (
    <a href="/oauth2/authorization/google" className={`flex items-center gap-2 rounded-xl bg-${googleBg}`}>
        <img className={forceText ? `pl-2 h-8 w-auto` : `max-md:m-1 md:pl-2 h-8 w-auto`} src={googleLogo} alt="googleLogo"/>
        <span className={textStyle}>
          Sign in with Google
        </span>
    </a>
  )
}

export default GoogleLogin
