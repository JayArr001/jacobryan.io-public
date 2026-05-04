import {NavLink} from 'react-router-dom'

const Footer = () => {
  return (
    <div className="max-lg:mt-20">
      <div className="h-24 border-t bg-slate-400/15 flex justify-center">
        <div className="flex py-6 flex-col items-center lg:py-8 lg:flex-row">
          <div className="pr-4">
            jacobryan.io&#8482; All Rights Reserved
          </div>
          <NavLink to="/privacy" className="underline hover:text-shadow-lg">Privacy Policy →</NavLink>
        </div>
      </div>
    </div>

  );
}

export default Footer
