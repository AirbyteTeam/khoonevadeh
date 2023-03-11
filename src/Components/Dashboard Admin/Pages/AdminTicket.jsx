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

function AdminTicket(props) {
    useEffect(() => {
        if (localStorage.getItem('role') !== "ADMIN") {
            localStorage.clear()
            props.history.push("/sign-in")
        }
    }, [props.history]);

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const constructor = () => {
        if (constructorHasRun) return;
        // const navigate = useNavigate();
        if (localStorage.getItem('role') !== "ADMIN") {
            localStorage.clear()
            window.location = ("/sign-in")
        }
        setConstructorHasRun(true);
    };
    constructor()
    const [tickets,setTickets] = useState([])
    // const [open, setOpen] = React.useState(false);
    const getTickets = async () => {
        const getTicketsResponse = await api.get(`ticket`)
        setTickets(getTicketsResponse.data)
    }

    useEffect(() => {
        getTickets()
    }, []);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    //
    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <>
            {/*<Link to='chat'>
                <button>ثبت تیکت جدید</button>
            </Link>*/}
            <div className="ticket-box">
                <div className="ticket-box-header">
                    <div className="ticket-box-title">سوابق تیکت ها</div>
                    {/*<button  variant="outlined" onClick={handleClickOpen}>ثبت تیکت جدید</button>*/}
                    {/*<Dialog open={open} onClose={handleClose}>*/}
                    {/*    <DialogTitle>عنوان تیکت</DialogTitle>*/}
                    {/*    <DialogContent>*/}
                    {/*        <DialogContentText>*/}
                    {/*            لطفا عنوان تیکت خود را وارد کنید*/}
                    {/*        </DialogContentText>*/}
                    {/*        <TextField*/}
                    {/*            autoFocus*/}
                    {/*            margin="dense"*/}
                    {/*            id="name"*/}
                    {/*            label=""*/}
                    {/*            type="text"*/}
                    {/*            fullWidth*/}
                    {/*            variant="standard"*/}
                    {/*        />*/}
                    {/*    </DialogContent>*/}
                    {/*    <DialogActions>*/}
                    {/*        <Link to='chat'>*/}
                    {/*            <button className='MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-1e6y48t-MuiButtonBase-root-MuiButton-root'>*/}
                    {/*                ثبت تیکت*/}
                    {/*            </button>*/}
                    {/*        </Link>*/}
                    {/*        /!*<Button onClick={handleClose}>ثبت تیکت</Button>*!/*/}
                    {/*        <Button onClick={handleClose}>بستن</Button>*/}
                    {/*    </DialogActions>*/}
                    {/*</Dialog>*/}
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
                                    <td>{
                                        t.status === "pending" ? "در حال بررسی" : t.status === "answered" ? "پاسخ داده شده" : null
                                    }
                                    </td>
                                    <td>{t.date}</td>
                                    <td>
                                        <Link to={t.id}>
                                            <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor"  className='ms-1' width='16' height='16'>
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
        </>
    );
}
export default AdminTicket