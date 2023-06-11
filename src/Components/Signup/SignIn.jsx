import * as React from 'react';
import "./../../style/Signup.css"
import SignInImage from "../../assets2/img/SignUp/login.jpg"
import TextField from '@mui/material/TextField';
import {createTheme} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../../api/api";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';


const theme = createTheme({
    direction: 'rtl',
});
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function SignIn() {
    const [phoneNumber, updatePhoneNumber] = useState('')
    const [error, updateError] = useState('')
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    /*function convertNumbers2English(input) {
        const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
        return input.replace(/[\u06F0-\u06F90]/g, function (m) {
            return persianDigits.indexOf(m);
        });
    }*/

    const handleGetPhoneNumber = async () => {
        const regex = new RegExp('^(\\+98|0)?9\\d{9}$');
        let result = regex.test(phoneNumber);
        setLoading(true)
        if (result === true) {
            const verifyResponse = await api.post("register/verify", {phoneNumber: phoneNumber})
            localStorage.setItem("phoneNumber", phoneNumber)
            if (verifyResponse.data.status === "exist") {
                navigate("/enter-password");
            } else if (verifyResponse.data.status === "newUser") {
                navigate("/OTP");
            }
        } else {
            updateError('شماره موبایل نامعتبر است')
            setLoading(false)
        }

    }

    return (
        <>
            <div className="container-signup d-flex justify-content-center align-items-center w-100 h-100">
                <div className="signup-box">
                    <div className="d-flex flex-md-row flex-column">
                        <div className="col-md-6 col-12">
                            <div className="signup-box-content">
                                <h2 className='signup-box-title'>ورود</h2>
                                <CacheProvider value={cacheRtl}>
                                    <div className="d-flex flex-column px-3">
                                        <TextField label="شماره موبایل" type='number'
                                                   className='mb-3 text-left'
                                                   sx={{textAlign: 'left'}}
                                                   onChange={(e) => updatePhoneNumber(e.target.value)}
                                        />
                                        {
                                            error.length !== 0
                                                ? (
                                                    <div className='error-message'>{error}</div>
                                                )
                                                : (null)
                                        }

                                        {
                                            loading === true ? (
                                                <LoadingButton
                                                    className='login-btn'
                                                    loading
                                                    loadingPosition="start"
                                                    startIcon={<SaveIcon/>}
                                                    variant="outlined"
                                                >
                                                    ورود/عضویت
                                                </LoadingButton>
                                            ) : (
                                                <button className='login-btn' onClick={handleGetPhoneNumber}>
                                                    ورود/عضویت
                                                </button>
                                            )
                                        }

                                        <div className='text-center mt-4 btn' onClick={() => {
                                            navigate("/")
                                        }}>
                                            بازگشت به سایت
                                            <KeyboardBackspaceIcon className="me-2"/>
                                        </div>
                                    </div>
                                </CacheProvider>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="signup-box-image" style={{backgroundImage: `url(${SignInImage})`}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn