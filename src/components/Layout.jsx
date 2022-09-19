import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full min-h-screen bg-slate-200 dark:bg-primary-800 '>
        {children}
    </div>
  )
}

export default Layout