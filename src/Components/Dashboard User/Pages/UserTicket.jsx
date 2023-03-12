import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./../../../style/dashboard/ticket.css"
import api from "../../../api/api";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {CacheProvider} from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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

function UserTicket(props) {
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
    const [title, setTitle] = useState("");
    const [open, setOpen] = React.useState(false);
    const [tickets, setTickets] = useState([])
    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const navigate = useNavigate();

    const getTickets = async () => {
        setOpenBackdrop(false);
        const getTicketsResponse = await api.get(`ticket/search?userId=${localStorage.getItem("phoneNumber")}`)
        setTickets(getTicketsResponse.data)
    }
    useEffect(() => {
        getTickets()
    }, []);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };
    const handleSubmitTicket = async () => {
        setOpenBackdrop(true);
        await api.post("ticket", {
            userId: localStorage.getItem("phoneNumber"),
            title: title,
            status: "pending"
        }).then((response) => {
            navigate(`/dashboard/ticket/${response.data.id}`)
        });
        getTickets()
        handleClose()
        setOpenSnackbar(true);
    }

    return (
        <>
            <div className="ticket-box">
                <div className="ticket-box-header">
                    <div className="ticket-box-title">سوابق تیکت ها</div>
                    <button variant="outlined" onClick={handleClickOpen}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className='ml-2' width='20' height='20'>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6"/>
                        </svg>
                        <span>تیکت جدید</span>
                    </button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>عنوان تیکت</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                لطفا عنوان تیکت خود را وارد کنید
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label=""
                                type="text"
                                fullWidth
                                variant="standard"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <button onClick={handleSubmitTicket}
                                    className='MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-1e6y48t-MuiButtonBase-root-MuiButton-root'>
                                ثبت تیکت
                            </button>
                            {/*<Button onClick={handleClose}>ثبت تیکت</Button>*/}
                            <Button onClick={handleClose}>بستن</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className="ticket-box-body">
                    <table>
                        <thead>
                        <tr>
                            <th>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" width='16' height='16'>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"/>
                                </svg>
                            </th>
                            <th>عنوان</th>
                            <th>وضعیت</th>
                            <th>تاریخ</th>
                            <th>عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            tickets.map((t, i) => (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{t.title}</td>
                                    <td width="1%">{
                                        t.status === "pending"
                                            ? (
                                                <div className='d-flex flex-row align-items-center'>
                                                    <div className="ticket-status-pending">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                             strokeWidth={1.5} stroke="currentColor" width='16' height='16'
                                                             className='ms-1'>
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                                                        </svg>
                                                    </div>
                                                    <span>در حال برسی</span>
                                                </div>
                                            )
                                            : t.status === "answered"
                                                ? (
                                                    <div className='d-flex flex-row align-items-center'>
                                                        <div className="ticket-status-answered">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                                 width='16' height='16' className='ms-1'>
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"/>
                                                            </svg>
                                                        </div>
                                                        پاسخ داده شده
                                                    </div>
                                                )
                                                : null
                                    }
                                    </td>
                                    <td>{t.date}</td>
                                    <td>
                                        <Link to={t.id}>
                                            <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className='ms-1' width='16'
                                                     height='16'>
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                </svg>
                                                <span>مشاهده</span>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <CacheProvider value={cacheRtl} theme={theme}>
                <ThemeProvider theme={theme}>
                    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                        <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: '100%'}}>
                            تیکت با موفقیت ثبت شد
                        </Alert>
                    </Snackbar>
                </ThemeProvider>
            </CacheProvider>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default UserTicket