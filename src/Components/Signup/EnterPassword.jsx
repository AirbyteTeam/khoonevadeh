import * as React from 'react';
import "./../../style/Signup.css"
import SignInImage from "../../assets2/img/SignUp/login.jpg"
import {createTheme} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../../api/api";
import LoginApi from "../../api/LoginApi";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const theme = createTheme({
    direction: 'rtl',
});
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function EnterPassword() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleEnterPassword = async () => {
        setLoading(true)
        await LoginApi({
            password: password
        }).then(() => {
            if (localStorage.getItem("role") === "ADMIN") {
                navigate("/admin/crowd-funding")
            } else if (localStorage.getItem("role") === "USER") {
                navigate("/dashboard/projects")
            } else if (localStorage.getItem("role") === "MANAGER") {
                navigate("/manager/admins")
            }
        }).catch(() => {
            setError(["رمز عبور نامعتبر است."])
            setLoading(false)
        })
    }
    const handleResetPassword = async () => {
        const forgotPasswordResponse = await api.post("register/forgotPassword", {phoneNumber: localStorage.getItem("phoneNumber")})
        if (forgotPasswordResponse.data.status === "OTPSent") {
            localStorage.setItem("forgotPassword", "true")
            navigate("/OTP");
        } else if (forgotPasswordResponse.data.status === "newUser") {
            navigate("/sign-in")
        }
    }

    return (
        <>
            <div className="container-signup d-flex justify-content-center align-items-center w-100 h-100">
                <div className="signup-box">
                    <div className="d-flex flex-md-row flex-column">
                        <div className="col-md-6 col-12">
                            <div className="signup-box-content">
                                <h2 className='signup-box-title'>رمز عبور</h2>
                                <CacheProvider value={cacheRtl}>
                                    <div className="d-flex flex-column px-3">
                                        <FormControl sx={{ m: 1}} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">رمز عبور</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </FormControl>
                                        {
                                            error.map((err, index) =>
                                                <small className={"text-danger"} key={index}>{err}</small>
                                            )
                                        }
                                        <div
                                            onClick={handleResetPassword}
                                            style={{
                                                fontSize: '12px',
                                                color: '#444',
                                                margin: '.5rem 0',
                                                cursor: "pointer"
                                            }}
                                        >
                                            رمز عبور خود را فراموش کرده اید ؟
                                        </div>
                                        {
                                            loading === true ? (
                                                <LoadingButton
                                                    className='login-btn'
                                                    loading
                                                    loadingPosition="start"
                                                    startIcon={<SaveIcon/>}
                                                    variant="outlined"
                                                >
                                                    ورود
                                                </LoadingButton>
                                            ) : (
                                                <button className='login-btn'
                                                        onClick={handleEnterPassword}>ورود</button>
                                            )
                                        }
                                        <div className='text-center mt-4 btn' onClick={() => {navigate("/")}}>
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

export default EnterPassword