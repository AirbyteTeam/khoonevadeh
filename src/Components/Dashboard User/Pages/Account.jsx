import React, {useState, useEffect} from 'react';
import "../../../style/dashboard/account.css"
import api from "../../../api/api";
import {createTheme,ThemeProvider} from "@mui/material/styles";
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import TextField from "@mui/material/TextField";
import {CacheProvider} from "@emotion/react";

const theme = createTheme({
    direction: 'rtl',
    typography: {
        "fontFamily": `"dana", sans-serif`
    }
});
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function UserAccount(props) {
    useEffect(() => {
        if (localStorage.getItem('role') !== "USER") {
            localStorage.clear()
            props.history.push("/sign-in")
        }
    }, [props.history]);

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const constructor = () => {
        if (constructorHasRun) return;
        // const navigate = useNavigate();
        if (localStorage.getItem('role') !== "USER") {
            localStorage.clear()
            window.location = ("/sign-in")
        }
        setConstructorHasRun(true);
    };
    constructor()
    const [user, updateUser] = useState({})

    useEffect(() => {
        const getUser = async () => {
            const userResponse = await api.get(`user/search?username=${localStorage.getItem("phoneNumber")}`)
            updateUser(userResponse.data[0])
        }
        getUser()
    }, []);

    const handleEditAccount = async () => {
        const userUpdateResponse = await api.put(`user/${localStorage.getItem("phoneNumber")}`, {
            ...user
        })
    }

    return (
        <>
            <div className="account-box">
                <div className="title-box">اطلاعات حساب کاربری</div>
                <div className="mt-4 account-box-content">
                    <div className="d-flex flex-row flex-wrap">
                        {/*Phone Number Input
                        <div className="col-md-6 col-12 my-2 px-2">
                            <label htmlFor="project-title" className="font-bold pr-1">
                                شماره موبایل
                            </label>
                            <input value={localStorage.getItem("phoneNumber")} disabled='true' type="text" tabIndex="1"
                                   placeholder="شماره موبایل"
                                   className="bg-white border-2 border-input rounded-md py-1.5 px-2 text-sm leading-6"
                            />
                        </div>
                        Name Input
                        <div className="col-md-6 col-12 my-2 px-2">
                            <label className="font-bold pr-1">
                                نام
                            </label>
                            <input
                                value={user.firstName}
                                onChange={(e) => updateUser(existingValues => ({
                                    ...existingValues,
                                    firstName: e.target.value
                                }))}
                                type="text" tabIndex="1" placeholder="نام"
                                className="bg-white border-2 border-input rounded-md py-1.5 px-2 text-sm leading-6"
                            />
                        </div>
                        Family Input
                        <div className="col-md-6 col-12 my-2 px-2">
                            <label className="font-bold pr-1">
                                نام خانوادگی
                            </label>
                            <input
                                value={user.lastName}
                                onChange={(e) => updateUser(existingValues => ({
                                    ...existingValues,
                                    lastName: e.target.value
                                }))}
                                type="text" tabIndex="1" placeholder="نام خانوادگی"
                                className="bg-white border-2 border-input rounded-md py-1.5 px-2 text-sm leading-6"
                            />
                        </div>
                        Password Number Input
                        <div className="col-md-6 col-12 my-2 px-2">
                            <label className="font-bold pr-1">
                                رمز عبور
                            </label>
                            <input
                                value={user.password}
                                onChange={(e) => updateUser(existingValues => ({
                                    ...existingValues,
                                    password: e.target.value
                                }))}
                                type="password" tabIndex="1" placeholder="رمز عبور"
                                className="bg-white border-2 border-input rounded-md py-1.5 px-2 text-sm leading-6"
                            />
                        </div>*/}
                        <CacheProvider value={cacheRtl} theme={theme}>
                            <ThemeProvider theme={theme}>
                                <div className="col-md-3 col-12 my-2 px-2">
                                    <TextField label="شماره موبایل" className='w-100'
                                               value={localStorage.getItem("phoneNumber")} disabled/>
                                </div>
                                <div className="col-md-3 col-12 my-2 px-2">
                                    <TextField label="نام" value={user.firstName} className='w-100'
                                               InputLabelProps={{shrink: true}}
                                               onChange={(e) => updateUser(existingValues => ({
                                                   ...existingValues,
                                                   firstName: e.target.value
                                               }))}/>
                                </div>
                                <div className="col-md-3 col-12 my-2 px-2">
                                    <TextField label="نام خانوادگی" value={user.lastName} className='w-100' InputLabelProps={{shrink: true}}
                                               onChange={(e) => updateUser(existingValues => ({
                                                   ...existingValues,
                                                   lastName: e.target.value
                                               }))}
                                               sx={{fontFamily: "'dana' !important"}}/>
                                </div>
                                <div className="col-md-3 col-12 my-2 px-2">
                                    <TextField label="رمز عبور" value={user.password} className='w-100' InputLabelProps={{shrink: true}}
                                               onChange={(e) => updateUser(existingValues => ({
                                                   ...existingValues,
                                                   password: e.target.value
                                               }))}
                                               sx={{fontFamily: 'dana'}}/>
                                </div>
                            </ThemeProvider>
                        </CacheProvider>
                        {/*Edit Account*/}
                        <div className="col-12 my-2 px-2">
                            <button className='edit-account-button' onClick={handleEditAccount}>ویرایش حساب کاربری
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserAccount;