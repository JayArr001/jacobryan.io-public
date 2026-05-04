import {NavLink} from 'react-router-dom'
const linkStyling = 
  "flex flex-col flex-shrink-0 items-center bg-blue-200 hover:bg-sky-200 " +
  "rounded-lg w-2xs min-h-64 max-h-64 shadow-xl/20 overflow-hidden hover:scale-[1.05] transition-transform duration-200";

const BigLink = ({target, text, image=null}) => {
  return (
    <div className = "items-center">
        <NavLink className={linkStyling} to={target}>
          <div className="flex-[6] w-full">
            {image ? (
              <img
                src={image}
                alt={text}
                className="w-full h-50 object-fill"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>

          <div className="flex-[4] flex items-center justify-center text-center text-xl font-medium p-3">
            {text}
          </div>
        </NavLink>
    </div>
  )
}

export default BigLink
