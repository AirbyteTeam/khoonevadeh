import React from "react";
import Logo from "../../../assets2/img/1_FINAL_EDITED.png"
import {Link} from "react-router-dom"
import {UilTimes, UilUserPlus} from '@iconscout/react-unicons'


function Sidebar() {
    const closeSidebar = () => {
        let sidebar = document.querySelector("#sidebar");
        sidebar.classList.toggle("close");
    }
    return (
        <>

            <div className='sidebar-dashboard close' id='sidebar'>
                <div id='close_sidebar_mobile' onClick={closeSidebar}>
                    <UilTimes/>
                    بستن
                </div>
                <div className="logo">
                    <img src={Logo}/>
                </div>
                <div className="sidebar-list mt-4">
                    <Link to="/manager/admins" className='w-100'>
                        <div className="d-flex flex-row align-items-center sidebar-list-item">
                            <UilUserPlus/>
                            <div className="sidebar-list-item-title">
                                ادمین ها
                            </div>
                        </div>
                    </Link>


                    <Link onClick={() => localStorage.clear()} to="/" className={"w-100"}>
                        <div className="d-flex flex-row align-items-center sidebar-list-item">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" width='24' height='24'>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                            </svg>
                            <div className="sidebar-list-item-title">
                                خروج
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Sidebar;