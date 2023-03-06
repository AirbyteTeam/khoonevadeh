import React, {useEffect, useState} from 'react';
import logo from "../../../assets/img/1_FINAL_EDITED.png"
import logoWhite from "../../../assets/img/1-EDITED_Footer.png"

import {NavLink,Link} from "react-router-dom";
function Header() {
    const [isMobile,setIsMobile] = useState(false);
    const[isOpen,setIsOpne] = useState(false);

    useEffect(() => {
        if(window.innerWidth <= 768){
            setIsMobile(true)
        }else {
            setIsMobile(false)
        }
    }, []);

    function toggleNavbar (){
        if(isOpen){
            setIsOpne(false)
        }else {
            setIsOpne(true)
        }
    }

    return (
        <>
            <header className="site-header sticky-header transparent-header topbar-transparent mt-2">
                <div className={isMobile ? "navbar-wrapper breakpoint-on" : "navbar-wrapper"}>
                    <div className="container">
                        <div className="navbar-inner">
                            <div className="site-logo">
                                <Link to="/"><img src={logo} alt="Funden"/></Link>
                            </div>
                            <div className="nav-menu">
                                <ul>
                                    <li>
                                        <NavLink end to="/" activeClassName='active'>خـانـه</NavLink>
                                    </li>
                                    <li>
                                        <a href="#">معرفي کارستون</a>
                                    </li>
                                    <li>
                                        <NavLink  to="/projects" activeClassName='active'>پـروژه ها</NavLink>
                                    </li>
                                    <li><NavLink  to="/contact-us" activeClassName='active'>ارتباط بـا مـا</NavLink></li>
                                </ul>
                            </div>
                            <div className="navbar-extra d-flex align-items-center">
                                <Link to="/sign-in" className="main-btn nav-btn d-none d-sm-inline-block">
                                    ورود | ثبت نام <i className="far fa-arrow-left"></i>
                                </Link>
                                <a  onClick={()=>{toggleNavbar()}} className={isOpen ? "nav-toggler panel-opened" : "nav-toggler"}>
                                    <span></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={isOpen ? "mobile-menu-panel panel-opened" : "mobile-menu-panel"}>
                    <div className="panel-logo d-flex justify-content-center">
                        <Link to="/" className="d-flex justify-content-center"><img src={logoWhite} className={"w-50"} alt="Funden"/></Link>
                    </div>
                    <ul className="panel-menu">
                        <li>
                            <NavLink end to="/" activeClassName='active'>خـانـه</NavLink>
                        </li>
                        <li>
                            <a href="#">معرفي کارستون</a>
                        </li>
                        <li>
                            <NavLink  to="/projects" activeClassName='active'>پـروژه ها</NavLink>
                        </li>
                        <li><NavLink  to="/contact-us" activeClassName='active'>ارتباط بـا مـا</NavLink></li>
                    </ul>
                    <div className="panel-extra">
                        <Link to="/sign-in" className="main-btn btn-white">
                            ورود | ثبت نام <i className="far fa-arrow-left"></i>
                        </Link>
                    </div>
                    <a href="#" onClick={()=>{toggleNavbar()}} className="panel-close">
                        <i className="fal fa-times"></i>
                    </a>
                </div>
            </header>
        </>
    );
}

export default Header