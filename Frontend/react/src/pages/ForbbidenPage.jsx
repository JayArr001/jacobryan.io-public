import React from 'react'
import ReturnHomeButton from '../components/ReturnHomeButton'

const ForbbidenPage = () => {
  return (
      <div>
        <div className="pt-4 text-red-600 font-semibold flex justify-center items-center w-full">
            <p>You don't have permission to perform this action.</p>
        </div>
        <div className="p-2 flex justify-center items-center w-full">
            <ReturnHomeButton/>
        </div>
      </div>
  )
}

export default ForbbidenPage
