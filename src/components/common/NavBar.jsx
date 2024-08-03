import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import LogoFullLight from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { IoIosArrowDown } from 'react-icons/io'
import { apiconnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { AiOutlineMenu } from 'react-icons/ai'

const NavBar = () => {
    const [ sublinks, setSublinks ] = useState() ;

    const location = useLocation() ;
    const { token } = useSelector( (state) => state.auth ) ;
    const { user } = useSelector( (state) => state.user ) ;
    console.log("accountype ", user) ;
    const { totalItem } = useSelector( (state) => state.cart ) ;
    
    const fetchCategories = async() => {
        try {
            const response = await apiconnector("GET", categories.CATEGORIES_API) ;
            // console.log("priting res : ", response?.data?.categories) ;
            setSublinks(response?.data?.categories) ;
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchCategories() ;
    }, []) ;

  return (
    <div className="border-b-[1px] bg-richblack-900 border-richblack-700 w-full z-50">
        <div className="w-11/12 relative h-14 max-w-maxContent mx-auto py-3 flex justify-between items-center">
            <NavLink to="/">
                <img src={LogoFullLight} alt={LogoFullLight} className="w-40 h-8 text-richblack-500" />
            </NavLink>

            <nav className="hidden md:block">
                <ul className="flex">
                    {
                        NavbarLinks.map((link, index) => (
                        <li key={index}>
                            { link.title === "Catalog" ? 
                                (
                                    <div className="group cursor-pointer relative">
                                        <p className="text-richblack-25 px-3 p-1 text-base font-inter font-normal not-italic flex items-center justify-center gap-1">
                                            {link.title}
                                            <IoIosArrowDown className="w-4 h-4 group-hover:rotate-180 transition-all duration-200"/>
                                        </p>
                                        {
                                            sublinks && 
                                            <>
                                                <div className="invisible opacity-0 group-hover:opacity-100 group-hover:visible z-10 absolute right-[7px] -bottom-[26px] rotate-45 translate-y-[1.65rem] group-hover:translate-y-0 transition-all duration-200 w-6 h-6 bg-richblack-5 rounded-sm"></div>
                                                <div className="invisible opacity-0 group-hover:opacity-100 group-hover:visible translate-y-[1.65rem] group-hover:translate-y-0 w-[300px] transition-all duration-200 top-[138%] absolute left-[42%] -translate-x-[50%] z-10 flex flex-col p-4 rounded-lg text-richblack-900 bg-richblack-5">
                                                    { 
                                                        sublinks.map((link, index) => {
                                                        return (
                                                                <NavLink key={index} 
                                                                to={'/catalog/'+(link?.name).toLowerCase().replace(" ", '-')} 
                                                                className="py-4 pl-4 hover:bg-richblack-50 rounded-md">
                                                                    <p>{link?.name}</p>
                                                                </NavLink>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </>
                                        }
                                    </div>
                                ) : 
                                (
                                    <NavLink to={link.path}>
                                        <p className={`${link.path === location.pathname ? "text-yellow-25" : "text-richblack-25"}
                                        px-3 p-1 text-base font-inter font-normal not-italic`}>
                                            {link.title}
                                        </p>
                                    </NavLink>
                                )
                            }
                        </li>
                    ))
                    }
                </ul>
            </nav>

            <div className="hidden md:flex  gap-4 items-center">
                {
                    token === null && (
                        <>
                            <NavLink to='/login'>
                                <button className="text-richblack-100 px-3 py-2 bg-richblack-800 border-[1px] border-richblack-700 rounded-lg">
                                    Log in
                                </button>
                            </NavLink>

                            <NavLink to='/signup'>
                                <button className="text-richblack-100 px-3 py-2 bg-richblack-800 border-[1px] border-richblack-700 rounded-lg">
                                    Sign up
                                </button>
                            </NavLink>
                        </>
                    )
                }
                {
                    user && user.accountType !== "Instructor" && (
                        <NavLink to='/dashboard/cart'>
                            <div className="relative">
                                <AiOutlineShoppingCart className="text-richblack-5"/>
                                {
                                    totalItem > 0 && (
                                        <span>
                                            {totalItem}
                                        </span>
                                    )
                                }
                            </div>
                        </NavLink>
                    )
                }
                {
                    token && (<ProfileDropDown/>)
                }
            </div>

            <button className="text-2xl md:hidden text-richblack-25">
                <AiOutlineMenu/>
            </button>
        </div>
    </div>
  )
}

export default NavBar