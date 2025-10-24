import React from 'react'

const Loader = () => {
  return (
    <div className={`flex items-center justify-center  `}>
        <div className={`border-b-2 rounded-full animate-spin border-purple-600 h-12 w-12`}></div>
    </div>
  )
}

export default Loader