import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate} from 'react-router-dom';
import {logout} from '../../features/auth/authSlice'
import { useDispatch } from 'react-redux';

// hooks
import useSideBarExtended from '../../hooks/useSideBarExtended';

import { BsPerson } from 'react-icons/bs';
import { FaReact } from 'react-icons/fa';
import { AiFillHome, AiOutlineContacts } from 'react-icons/ai';
import { MdOutlineCreate, MdLogin, MdOutlineDashboardCustomize } from 'react-icons/md';
import { TbLayoutSidebarRightExpand, TbLayoutSidebarLeftExpand } from 'react-icons/tb';


const SideBarNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector(state => state.auth)

    const [sideBarFull, setSideBarFull] = useSideBarExtended()
    const [logoutModalState, setLogoutModalState] = useState(false)
    // const myRef = useRef(null)

    const openProfileMenu = () => {
        setLogoutModalState(prevState => !prevState)
    }

    useEffect(()=> {
        if(!user) {
            navigate('/login');
        }
        // if(!myRef) return
        // if(!logoutModalState) return
        // console.log(myRef)
        // document.addEventListener('click', (e) => {
        //     if(e.target.classList.contains("profile-func")) return
        //     if(e.target.id !== myRef.current.id) {
        //         setLogoutModalState(false)
        //     }
        // })
    },[user])
// , logoutModalState, myRef

    const logOutUser = async() => {
        localStorage.removeItem('loto3000-user')
       //setLogoutModalState(false)

        dispatch(logout())
    }

    return (
        <nav className={`sticky top-0 left-0 min-h-full h-screen z-10 
                        flex flex-col
                        bg-white text-black
                         dark:bg-gray-900 dark:text-white shadow-lg
                        ${sideBarFull ? "w-50 md:w-52" : "w-24 md:w-24"}
                        `}>
            <div className='basis-11/12'>
                {/* Logo */}
                <NavLink to={'/'}>
                    <div className={`flex items-center justify-start
                                    hover:text-teal-500
                                    ${sideBarFull ? 'justify-start m-3' : 'justify-center m-0 mt-3'}
                                    `}>
                        <FaReact size={`${sideBarFull ? '30' : '50'}`}/>
                        <h1 className={`text-3xl  ${sideBarFull ? 'block' : 'hidden'}`}>Blog</h1>
                    </div>
                </NavLink>

                {/* Expand/Collapse */}
                <div className='flex justify-end'>
                    <div className='relative flex h-12 group'>
                        <button onClick={() => setSideBarFull(prevState => !prevState)}>
                            {sideBarFull ? <TbLayoutSidebarRightExpand size="30"/> : <TbLayoutSidebarLeftExpand size="30"/>}
                        </button>
                        <span className="sidebar-tooltip group-hover:scale-100">
                                {sideBarFull ? "Collapse": "Expand"}
                        </span>
                    </div>
                </div>

                {/*Navigation Links*/}
                <ul className='flex flex-col text-white overflow-visible custombp:overflow-y-auto '>
                    <SideBarLinks sideBarFull={sideBarFull} to={'/'} icon={<AiFillHome size="28"/>} text={"Home"}/>
                    { user ?
                        <SideBarLinks sideBarFull={sideBarFull} to={'/ticket'} icon={<MdOutlineCreate size="28"/>} text={"Ticket"}/> :
                        null
                    }
                    {
                        user?.role == "2" ?
                        <SideBarLinks sideBarFull={sideBarFull} to={'/dashboard'} icon={<MdOutlineDashboardCustomize size="28"/>} text={"Dasboard"}/> :
                        null
                    } 
                </ul>
            </div>
            {   
                user ?
                <div onClick={openProfileMenu}  className={`profile-func ${sideBarFull ? "sidebar-links-profile-full" : "sidebar-links-profile"} mb-6`}>
                    <div className='profile-func w-12 h-12'>
                        <img className='profile-func object-cover rounded-full h-full w-full' 
                            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            alt="user profile image" />
                    </div>
                    <span className={`profile-func text-2xl mx-2 ${sideBarFull ? "block" : "hidden"}`}>
                        {user.username}
                    </span>

                </div> :
                <NavLink to={'/login'} >
                    <div className={`${sideBarFull ? "sidebar-links-full" : "sidebar-links"} group mb-6`}>
                        <MdLogin size="28"/>
                        <span className={`text-2xl mx-2 ${sideBarFull ? "block" : "hidden"}`}>
                            Login
                        </span>
                        {
                            sideBarFull ? null :
                            <span className="sidebar-tooltip group-hover:scale-100">
                                Login
                            </span>
                        }
                    </div>  
                </NavLink>
            }
            <div onClick={() => setLogoutModalState(false)} className={`w-screen h-screen absolute ${logoutModalState ? 'block' : 'hidden'} `}>
                {
                    user ?
                    <div id='modal-logout'  
                            className={`absolute bottom-14 border-2 w-48 bg-slate-300 text-center
                            text-black dark:bg-primary-500 dark:text-white
                            `}>
                        <p className='w-full'>Logged in as <span className='text-secondary-500'>{user.name}</span></p>
                        <button className='btn-solid-no-animation ' onClick={()=> logOutUser()}>Log Out</button>
                    </div> : null
                }
            </div>


        </nav>
    )
}

const SideBarLinks = ({ to, icon, text, sideBarFull}) => (
        <NavLink to={to} >
            <li className={`${sideBarFull ? "sidebar-links-full" : "sidebar-links"} group`}>
                {icon}
                <span className={`text-2xl mx-2 ${sideBarFull ? "block" : "hidden"}`}>
                    {text}
                </span>
                {
                    sideBarFull ? null :
                    <span className="sidebar-tooltip group-hover:scale-100">
                        {text}
                    </span>
                }
            </li>  
        </NavLink>
  );
  

export default SideBarNav



