import React, {useEffect, useState} from 'react';
import logo from "../../../assets/img/1_FINAL_EDITED.png"
import logoWhite from "../../../assets/img/1-EDITED_Footer.png"
import "./../../../style/header.css"
import {NavLink, Link, useNavigate} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import {UilUser} from "@iconscout/react-unicons";
import LoginApi from "../../../api/LoginApi";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Header() {
    const navigate = useNavigate()
    const [isMobile,setIsMobile] = useState(false);
    const[isOpen,setIsOpne] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const toggleSidebar = () => {
        let sidebar = document.querySelector("#sidebar");
        sidebar.classList.toggle("close");
    }
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
                                        <a href="#">معرفي خونواده</a>
                                    </li>
                                    <li>
                                        <NavLink  to="/projects" activeClassName='active'>پـروژه ها</NavLink>
                                    </li>
                                    <li><NavLink  to="/contact-us" activeClassName='active'>ارتباط بـا مـا</NavLink></li>
                                </ul>
                            </div>
                            <div className="navbar-extra d-flex align-items-center">
                                {
                                    localStorage.getItem("phoneNumber") && localStorage.getItem("password") && localStorage.getItem("role") && localStorage.getItem("Authorization")

                                        ? <>
                                            <Button
                                                id="navbar-dropdown-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                                sx={{color: '#000'}}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                     stroke="currentColor" width='24' height='24'>
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                                                </svg>
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem>
                                                    <Link to='/'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                             stroke="currentColor" width='16' height='16' className="ms-1">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                                                        </svg>
                                                        صفحه اصلی
                                                    </Link>
                                                </MenuItem>
                                                <MenuItem>
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
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                             stroke="currentColor" width='16' height='16' className="ms-1">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                        </svg>
                                                        پنل کاربری
                                                    </div>
                                                </MenuItem>
                                                <MenuItem>
                                                    <Link to='/' onClick={() => {
                                                        localStorage.clear()
                                                    }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                             stroke="currentColor" width='16' height='16' className="ms-1">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                                                        </svg>
                                                        خروج از حساب
                                                    </Link>
                                                </MenuItem>
                                            </Menu>
                                        </>
                                        : <Link to="/sign-in" className="main-btn nav-btn d-none d-sm-inline-block">
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
                            <a href="#">معرفي خونواده</a>
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