import React, {useState} from "react";
import {BsList} from 'react-icons/bs';
import Dropdown from 'react-bootstrap/Dropdown';
import {UilUser, UilLightbulbAlt, UilMoneyBill} from '@iconscout/react-unicons'
import {Link} from "react-router-dom"


function Navbar() {
    const toggleSidebar = () => {
        let sidebar = document.querySelector("#sidebar");
        sidebar.classList.toggle("close");
    }
    return (
        <div className="navbar-dashboard">

            <div className='d-flex flex-row align-items-center'>
                <button className='btn ms-3' onClick={toggleSidebar}>
                    <BsList/>
                </button>
            </div>
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
                        <Link to='/dashboard/account'>
                            حساب کاربری
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to='/'>
                            صفحه اصلی
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to='/dashboard'>
                            پنل کاربری
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to='/'>
                            خروج از حساب
                        </Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default Navbar;