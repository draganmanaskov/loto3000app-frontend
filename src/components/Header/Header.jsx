import React from 'react'
import ThemeIcon from '../../components/ThemeIcon'

import useHeaderExtended from '../../hooks/useHeaderExtended';
import { TbLayoutSidebarRightExpand, TbLayoutSidebarLeftExpand } from 'react-icons/tb';

const Header = () => {
  const [headerFull, setHeaderFull] = useHeaderExtended()

  return (
    <div className="fixed top-0 right-0 h-14 z-100
                    flex items-center justify-end 
                    bg-primary-400 dark:bg-primary-800
                    shadow-lg rounded-bl-2xl z-50 pl-2">
        <div className='flex justify-end'>
            <div className='relative flex h-12 group text-white '>
                <button onClick={() => setHeaderFull(prevState => !prevState)}>
                    {headerFull ? <TbLayoutSidebarRightExpand size="30"/> : <TbLayoutSidebarLeftExpand size="30"/>}
                </button>
                <span className="header-tooltip group-hover:scale-100">
                        {headerFull ? "Collapse": "Expand"}
                </span>
            </div>
        </div>
        <ThemeIcon status={headerFull} />
    </div>
  )
}

export default Header