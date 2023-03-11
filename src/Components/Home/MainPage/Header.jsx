import React, {useEffect, useState} from 'react';
import logo from "../../../assets/img/1_FINAL_EDITED.png"
import logoWhite from "../../../assets/img/1-EDITED_Footer.png"
import "./../../../style/header.css"
import {NavLink, Link, useNavigate} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import {UilUser} from "@iconscout/react-unicons";
import LoginApi from "../../../api/LoginApi";
function Header() {
    const navigate = useNavigate()
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
                                {
                                    localStorage.getItem("phoneNumber") && localStorage.getItem("password") && localStorage.getItem("role") && localStorage.getItem("Authorization") ?
                                        <Dropdown>
                                            <Dropdown.Toggle id="dropdown-basic">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                     stroke="currentColor" width='24' height='24'>
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                </svg>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <Link to='/'>
                                                        صفحه اصلی
                                                    </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <div onClick={ async () => {
                                                        await LoginApi()
                                                        if (localStorage.getItem("role") === "ADMIN") {
                                                            navigate("/admin/crowd-funding")
                                                        } else if (localStorage.getItem("role") === "USER") {
                                                            navigate("/dashboard/projects")
                                                        } else if (localStorage.getItem("role") === "MANAGER") {
                                                            navigate("/manager/admins")
                                                        } else {
                                                            localStorage.clear()
                                                            navigate("/")
                                                        }
                                                    }}>
                                                        پنل کاربری
                                                    </div>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <Link to='/' onClick={() => {localStorage.clear()}}>
                                                        خروج از حساب
                                                    </Link>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown> :
                                        <Link to="/sign-in" className="main-btn nav-btn d-none d-sm-inline-block">
                                            ورود | ثبت نام <i className="far fa-arrow-left"></i>
                                        </Link>
                                }
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
                    {
                        localStorage.getItem("phoneNumber") && localStorage.getItem("password") && localStorage.getItem("role") && localStorage.getItem("Authorization") ?
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                    <UilUser/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Link to='/'>
                                            صفحه اصلی
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <div onClick={ async () => {
                                            await LoginApi()
                                            if (localStorage.getItem("role") === "ADMIN") {
                                                navigate("/admin/crowd-funding")
                                            } else if (localStorage.getItem("role") === "USER") {
                                                navigate("/dashboard/projects")
                                            } else if (localStorage.getItem("role") === "MANAGER") {
                                                navigate("/manager/admins")
                                            } else {
                                                localStorage.clear()
                                                navigate("/")
                                            }
                                        }}>
                                            پنل کاربری
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Link to='/' onClick={() => {localStorage.clear()}}>
                                            خروج از حساب
                                        </Link>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> :
                            <div className="panel-extra">
                                <Link to="/sign-in" className="main-btn btn-white">
                                    ورود | ثبت نام <i className="far fa-arrow-left"></i>
                                </Link>
                            </div>
                    }
                    <a href="#" onClick={()=>{toggleNavbar()}} className="panel-close">
                        <i className="fal fa-times"></i>
                    </a>
                </div>
            </header>
        </>
    );
}

export default Header