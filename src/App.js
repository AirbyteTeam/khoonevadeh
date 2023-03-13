import React from 'react';
import MainPage from "./Components/Home/MainPage/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardUser from "./Components/Dashboard User/Template/master"
import DashboardAdmin from "./Components/Dashboard Admin/Template/master"
import SignIn from "./Components/Signup/SignIn";
import SignUp from "./Components/Signup/SignUp";
import CrowdFunding from "./Components/Dashboard Admin/Pages/Crowdfunding";
import CreateCrowdFunding from "./Components/Dashboard Admin/Pages/CreateCrowdFunding"
import ProjectUser from "./Components/Dashboard User/Pages/Project"
import UserAccount from "./Components/Dashboard User/Pages/Account"
import AdminTicket from "./Components/Dashboard Admin/Pages/AdminTicket"
import AdminChat from "./Components/Dashboard Admin/Pages/AdminChat"
import UserTicket from "./Components/Dashboard User/Pages/UserTicket"
import UserChat from "./Components/Dashboard User/Pages/UserChat"
import OTP from "./Components/Signup/OTP"
import EnterPassword from "./Components/Signup/EnterPassword"
import ResetPassword from "./Components/Signup/ResetPassword"
import EditCrowdFunding from "./Components/Dashboard Admin/Pages/EditCrowdFunding"
import ProjectDetails from "./Components/Home/projectDetails/projectDetails";
import Contact from "./Components/Home/Contact/Contact";
import Project from "./Components/Home/Projects/Project";
import MainManagerPage from "./Components/Dashboard Manager/Pages/main";
import DashboardManager from "./Components/Dashboard Manager/Template/master";
import Admins from "./Components/Dashboard Manager/Template/master";
import ProtectedLogin from "./Components/ProtectedLogin";
import ProtectedRoute from "./Components/protectedRoute";

function App() {
    window.onbeforeunload = function() {
        localStorage.clear();
    }
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={(<MainPage/>)}/>
                    <Route path="/manager/admins" element={(<ProtectedRoute><Admins/></ProtectedRoute>)}/>
                    <Route path="/admin" element={(<ProtectedRoute><DashboardAdmin/></ProtectedRoute>)}>
                        {/*<Route path="" element={<MainAdminPage />} />*/}
                        <Route path="crowd-funding" element={<ProtectedRoute><CrowdFunding/></ProtectedRoute>}/>
                        <Route path="create-crowd-funding" element={<ProtectedRoute><CreateCrowdFunding/></ProtectedRoute>}/>
                        <Route path="edit-crowd-funding/:id" element={<ProtectedRoute><EditCrowdFunding/></ProtectedRoute>}/>
                        <Route path="ticket" element={<ProtectedRoute><AdminTicket/></ProtectedRoute>}/>
                        <Route path="ticket/:id" element={<ProtectedRoute><AdminChat/></ProtectedRoute>}/>
                    </Route>
                    <Route path="/dashboard" element={(<ProtectedRoute><DashboardUser/></ProtectedRoute>)}>
                        {/*<Route path="" element={<MainUserPage />} />*/}
                        <Route path="account" element={<ProtectedRoute><UserAccount/></ProtectedRoute>}/>
                        <Route path="projects" element={<ProtectedRoute><ProjectUser/></ProtectedRoute>}/>
                        <Route path="ticket" element={<ProtectedRoute><UserTicket/></ProtectedRoute>}/>
                        <Route path="ticket/:id" element={<ProtectedRoute><UserChat/></ProtectedRoute>}/>
                    </Route>
                    <Route exact path="/sign-in" element={(<ProtectedLogin><SignIn/></ProtectedLogin>)}/>
                    <Route exact path="/sign-up" element={(<ProtectedLogin><SignUp/></ProtectedLogin>)}/>
                    <Route exact path="/OTP" element={(<ProtectedLogin><OTP/></ProtectedLogin>)}/>
                    <Route exact path="/enter-password" element={(<ProtectedLogin><EnterPassword/></ProtectedLogin>)}/>
                    <Route exact path="/reset-password" element={(<ProtectedLogin><ResetPassword/></ProtectedLogin>)}/>
                    <Route exact path="/projects" element={(<Project/>)}/>
                    <Route exact path="/project-details/:id" element={(<ProjectDetails/>)}/>
                    <Route exact path="/contact-us" element={(<Contact/>)}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
