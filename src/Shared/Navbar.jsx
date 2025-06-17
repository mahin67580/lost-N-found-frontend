
import { Link, NavLink } from 'react-router';
import navlogo from '../assets/ani4.gif'
import usericon from '../assets/profile.png'
 
import { AuthContext } from '../Provider/AuthContext';
import { use, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
// import { Tooltip as ReactTooltip } from "react-tooltip";

const Navbar = () => {


    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-profile')) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const { user, logout } = use(AuthContext)



    const handleLogout = () => {

        logout()
            .then(() => {

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logout  successful",
                    showConfirmButton: false,
                    timer: 1500
                });

            }).catch(() => {
                // console.log(error);
            });
    }




    const Links = <>
        <NavLink to={'/'} className={' btn    text-base-content mr-5 '}>Home</NavLink>
        <NavLink to={'/LostFoundItemsPage'} className={'btn     text-base-content mr-5'}>Lost & Found Items </NavLink>
        {/* <NavLink to={'/BrowseListing'} className={'btn  text-base-content mr-5'}>Browse Listing</NavLink> */}
        {/* <NavLink to={'/myItems'} className={'btn     text-base-content mr-5'}>My Items</NavLink> */}
        {
            user ? (<NavLink to={'/myprofile'} className="btn     text-base-content mr-5 "> My profile </NavLink  >) : ''
        }
        <button
            onClick={toggleTheme}
            className="btn btn-sm btn-primary   mt-1 " data-tooltip-id="my-tooltip-2"
        >
            Toggle {theme === 'light' ? '🌙' : '☀️'}
        </button>
    </>

    const handledropdown = () => {
        setShowDropdown(prev => !prev);
    }



    return (
        <div>

            <div className="navbar bg-base-100 shadow-sm  ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content space-y-4   bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                            {
                                Links
                            }

                        </ul>
                    </div>
                    <div className='flex items-center'>

                        {
                            <Link to={'/'}><p className="btn btn-ghost text-xl text-primary">
                                WHERE<span className="text-base-content">LIST</span>
                            </p>

                            </Link>
                        }
                        <img className='w-9' src={navlogo} alt="" />
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 ">
                        {
                            Links
                        }


                    </ul>
                </div>
                <div className="navbar-end">
                    {/* <p>{user && user.email}</p> */}
                    {/* just disply pic and name */}

                    {/* <div className="relative group flex flex-row-reverse  items-center mr-3  ">
                        <div onClick={handledropdown} className="ring-primary ring-offset-base-100 w-12 h-12 rounded-full ring-2 ring-offset-2 overflow-hidden">
                            <img src={user ? user.photoURL : usericon} className="object-cover w-full h-full" />
                        </div>

                        <span className=" text-sm font-medium mr-4   opacity-0 group-hover:opacity-100 transition-opacity">
                            {user?.displayName}
                        </span>
                    </div> */}


                    {/* dropdown with display pic and name */}
                    <div className=" dropdown-profile  relative group flex flex-row-reverse items-center mr-3">
                        <div onClick={handledropdown} className="cursor-pointer ring-primary ring-offset-base-100 w-12 h-12 rounded-full ring-2 ring-offset-2 overflow-hidden">
                            <img src={user ? user.photoURL : usericon} className="object-cover w-full h-full" />
                        </div>

                        <span className="text-sm font-medium mr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            {user?.displayName}
                        </span>

                        {showDropdown && (
                            <div className="absolute right-0 top-14 bg-base-100 shadow-lg rounded-box p-4 z-50 w-48 space-y-2">
                                <NavLink to="/AddItem" className="block   p-2 rounded btn  text-base-content">Add Item </NavLink>
                                <NavLink to="/allRecovered" className="block  btn  text-base-content p-2 rounded">Recovered Items </NavLink>
                                <NavLink to="/myItems" className="block btn  text-base-content  p-2 rounded">My Items </NavLink>
                            </div>
                        )}
                    </div>


                    {
                        user ? (<Link to={'/'}><button onClick={handleLogout} className="btn bg-primary text-white">Logout</button></Link>) : (<Link to={'/login'} className="btn bg-primary text-white "> Login </Link  >)
                    }

                </div>
            </div>
            {/* <ReactTooltip
                id="my-tooltip-2"
                place="bottom"
                content="Toggle Theme"
            /> */}
        </div>
    );
};

export default Navbar;