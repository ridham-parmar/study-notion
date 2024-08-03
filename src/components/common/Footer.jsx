import React from 'react'
import LogoFullLight from '../../assets/Logo/Logo-Full-Light.png'
import { PiFacebookLogoFill, PiGoogleLogoFill, PiYoutubeLogoFill } from 'react-icons/pi'
import { TbBrandTwitterFilled } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'
import {FooterLink} from '../../data/footer-links'

const Footer = () => {

    const company = [
        {title:"About", link:"/about"},
        {title:"Careers", link:"/careers"},
        {title:"Affiliates", link:"/affiliates"}
    ]

    const resources = [
        {title:"Articles", link:"/articles"},
        {title:"Blog", link:"/blog"},
        {title:"Chart Sheet", link:"/chart-sheet"},
        {title:"Code Challenges", link:"/code-challenges"},
        {title:"Docs", link:"/docs"},
        {title:"Projects", link:"/projects"},
        {title:"Videos", link:"/videos"},
    ]

    const support = [
        {title:"Help Center", link:"/help-center"},
    ]

    const plans = [
        {title:"Paid Memberships", link:"/paid-memberships"},
        {title:"For Students", link:"/for-students"},
        {title:"Business Solutions", link:"/business-solutions"},
    ]

    const community = [
        {title:"Forums", link:"/forums"},
        {title:"Chapters", link:"/chapters"},
        {title:"Events", link:"/events"},
    ]

  return (
    <div className="w-full bg-richblack-800 border-t-[1px] border-richblack-600">
        <div className="flex flex-col gap-8 mx-auto w-11/12 max-w-maxContent py-[38px] sm:pt-[52px]">
            <div className="flex flex-col lg:flex-row gap-[52px]">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                    {/* first col */}
                    <div className="flex flex-col gap-3">
                        <NavLink to="/">
                            <img src={LogoFullLight} alt={LogoFullLight} className=" w-40 h-8 text-richblack-500" />
                        </NavLink>
                        <h3 className="text-base font-inter font-semibold not-italic text-richblack-100 tracking-wide">Company</h3>
                        <div className="flex flex-col gap-2">
                            {
                                company.map((link, index) => {
                                    return (
                                        <NavLink to={`${link.link}`} key={index}>
                                            <p className="text-sm font-inter font-normal not-italic text-richblack-400 tracking-wider hover:hover:text-richblack-50 transition-all duration-200">
                                                {link.title}
                                            </p>
                                        </NavLink>
                                    )
                                })
                            }
                        </div>
                        <div className="flex gap-3">
                            <PiFacebookLogoFill className="w-6 h-6 text-richblack-400"/>
                            <PiGoogleLogoFill className="w-6 h-6 text-richblack-400"/>
                            <TbBrandTwitterFilled className="w-6 h-6 text-richblack-400"/>
                            <PiYoutubeLogoFill className="w-6 h-6 text-richblack-400"   />
                        </div>
                    </div>

                    {/* second call */}
                    <div className="flex flex-col gap-9">
                        <div className="flex flex-col gap-3">
                            <h3 className="text-base font-inter font-semibold not-italic text-richblack-100 tracking-wide">Resources</h3>
                            <div className="flex flex-col gap-2">
                                {
                                    resources.map((link, index) => {
                                        return (
                                            <NavLink to={`${link.link}`} key={index}>
                                                <p className="text-sm font-inter font-normal not-italic text-richblack-400 tracking-wider hover:hover:text-richblack-50 transition-all duration-200">
                                                    {link.title}
                                                </p>
                                            </NavLink>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-base font-inter font-semibold not-italic text-richblack-100 tracking-wide">Support</h3>
                            <div className="flex flex-col gap-2">
                                {
                                    support.map((link, index) => {
                                        return (
                                            <NavLink to={`${link.link}`} key={index}>
                                                <p className="text-sm font-inter font-normal not-italic text-richblack-400 tracking-wider hover:hover:text-richblack-50 transition-all duration-200">
                                                    {link.title}
                                                </p>
                                            </NavLink>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    {/* third col */}
                    <div className="flex flex-row lg:flex-col lg:gap-9 col-[1_/_span_2] lg:col-auto">
                        <div className="flex flex-col w-[50%] lg:w-0 gap-3">
                            <h3 className="text-base font-inter font-semibold not-italic text-richblack-100 tracking-wide">Plans</h3>
                            <div className="flex flex-col gap-2">
                                {
                                    plans.map((link, index) => {
                                        return (
                                            <NavLink to={`${link.link}`} key={index}>
                                                <p className="text-sm font-inter font-normal not-italic text-richblack-400 tracking-wider hover:hover:text-richblack-50 transition-all duration-200">
                                                    {link.title}
                                                </p>
                                            </NavLink>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-base font-inter font-semibold not-italic text-richblack-100 tracking-wide">Community</h3>
                            <div className="flex flex-col gap-2">
                                {
                                    community.map((link, index) => {
                                        return (
                                            <NavLink to={`${link.link}`} key={index}>
                                                <p className="text-sm font-inter font-normal not-italic text-richblack-400 tracking-wider hover:hover:text-richblack-50 transition-all duration-200">
                                                    {link.title}
                                                </p>
                                            </NavLink>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[1px] h-[538px] bg-richblack-700 hidden lg:block"></div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                {
                        FooterLink.map((link, index) => {
                            return (
                                <div className="flex flex-col gap-3" key={index}>
                                    <h3 className="text-base font-inter font-semibold not-italic text-richblack-100 tracking-wide">
                                        {link.title}
                                    </h3>
                                    <div className="flex flex-col gap-2">
                                        {
                                            link.links.map((footerLink, index) => {
                                                return (
                                                    <NavLink to={`${footerLink.link}`} key={index}>
                                                        <p className="text-sm font-inter font-normal not-italic text-richblack-400 tracking-wider hover:hover:text-richblack-50 transition-all duration-200">
                                                            {footerLink.title}
                                                        </p>
                                                    </NavLink>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                }
                </div>
            </div>

            <div className="h-[1px] w-full bg-richblack-700"></div>

            <div className="w-full flex flex-col gap-1 lg:flex-row items-center justify-between">
                <div className="flex gap-2 items-center">
                    <NavLink to="/privacy-policy">
                        <p className="text-sm font-inter font-normal not-italic text-richblack-400 tracking-wider hover:hover:text-richblack-50 transition-all duration-200">
                            Privacy Policy
                        </p>
                    </NavLink>

                    <div className="h-3 w-[1px] bg-richblack-700"></div>

                    <NavLink to="/cookie-policy">
                        <p className="text-sm font-inter font-normal not-italic text-richblack-400 tracking-wider hover:hover:text-richblack-50 transition-all duration-200">
                            Cookie Policy
                        </p>
                    </NavLink>

                    <div className="h-3 w-[1px] bg-richblack-700"></div>

                    <NavLink to="/terms">
                        <p className="text-sm font-inter font-normal not-italic text-richblack-400 tracking-wider hover:hover:text-richblack-50 transition-all duration-200">
                            Terms
                        </p>
                    </NavLink>
                </div>

                <p className="text-sm text-center font-inter font-normal not-italic text-richblack-400 tracking-wider">
                    Made with ❤️ CodeHelp © 2023 Studynotion
                </p>
            </div>
        </div>

    </div>
  )
}

export default Footer