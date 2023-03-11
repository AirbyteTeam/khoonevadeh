import React from "react";
import Navbar from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import Admins from './../../Dashboard Manager/Pages/Admins'
import "../../../style/dashboard/dashboard.css"
import { Outlet } from "react-router-dom";

function DashboardManager() {
    return (
        <>
            <div className="d-flex flex-column" dir="rtl">
                <Sidebar />
                <Navbar />
                <div className="main">
                    <Admins />
                </div>
                <Footer />

            </div>
        </>

    );
}

export default DashboardManager