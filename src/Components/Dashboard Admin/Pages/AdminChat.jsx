import React, {useEffect, useState} from "react";
import "./../../../style/dashboard/chat.css";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {useNavigate, useParams} from "react-router-dom";
import api from "../../../api/api";
import {deepOrange, deepPurple} from "@mui/material/colors";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

function AdminChat(props) {
    useEffect(() => {
        if (localStorage.getItem('role') !== "ADMIN") {
            localStorage.clear()
            props.history.push("/sign-in")
        }
    }, [props.history]);

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const [loading, setLoading] = useState(false)
    const constructor = () => {
        if (constructorHasRun) return;
        if (localStorage.getItem('role') !== "ADMIN") {
            localStorage.clear()
            window.location = ("/sign-in")
        }
        setConstructorHasRun(true);
    };
    constructor()
    const {id} = useParams()
    const getChat = async () => {
        setLoading(false)
        const chatResponse = await api.get(`ticket/${id}`)
        setChat(chatResponse.data)
    }
    useEffect(() => {
        getChat()
    }, []);

    const [chat, setChat] = useState({
        title: "",
        chatList: []
    })
    const [typedMessage, updateTypedMessage] = useState()


    const handleSendMessage = async () => {
        setLoading(true)
        await api.put(`ticket/${id}`, {
            status: "answered",
            chatList: [
                {
                    sender: "admin",
                    message: typedMessage
                }
            ]
        })
        updateTypedMessage("")
        getChat()
    }

    return (
        <>
            <div className="chat-box">
                <div className="chat-box-body">
                    <div className="d-flex justify-content-center">
                        <div className="chat-messenger">
                            <div className="chat-messenger-header">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="ms-1" width='16' height='16'>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
                                </svg>
                                {chat.title}
                            </div>
                            <div className="chat-messenger-body">
                                {
                                    chat.chatList.map((mes) => (
                                        mes.sender === 'admin'
                                            ? (
                                                <>
                                                    <div className="d-flex justify-content-center">
                                                        <div className='chat-messenger-time'>{mes.date}</div>
                                                    </div>
                                                    <div className="d-flex justify-content-end">
                                                        <div className="d-flex flex-column">
                                                            <div className='chat-messenger-item-info'>
                                                                <Stack direction="row" spacing={2}>
                                                                    <Avatar sx={{
                                                                        bgcolor: deepOrange[500],
                                                                        width: 24,
                                                                        height: 24,
                                                                        fontSize: '.8rem'
                                                                    }}
                                                                            className='ms-2'>پ</Avatar>
                                                                </Stack>
                                                                <span> پشتیبان</span>
                                                            </div>
                                                            <div className='chat-messenger-item admin-message'>
                                                                {mes.message}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>

                                            )
                                            : (
                                                <>
                                                    <div className="d-flex justify-content-center">
                                                        <div className='chat-messenger-time'>{mes.date}</div>
                                                    </div>
                                                    <div className="d-flex justify-content-start">
                                                        <div className="d-flex flex-column">
                                                        <span className='chat-messenger-item-info'>
                                                             <Stack direction="row" spacing={2}>
                                                                    <Avatar sx={{
                                                                        bgcolor: deepPurple[500],
                                                                        width: 24,
                                                                        height: 24,
                                                                        fontSize: '.8rem'
                                                                    }}
                                                                            className='ms-2'>{mes.sender.slice(0, 1)}</Avatar>
                                                                </Stack>
                                                            <span>{mes.sender}</span>
                                                        </span>
                                                            <div className='chat-messenger-item user-message'>
                                                                {mes.message}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                    ))
                                }
                            </div>
                            <div className="chat-messenger-footer">
                                <input type='text' placeholder='یک پیام تایپ کنید'
                                       onChange={(e) => updateTypedMessage(e.target.value)} value={typedMessage}/>




                                {
                                    loading === true ? (
                                        <LoadingButton
                                            className='send-message'
                                            loading
                                            loadingPosition="start"
                                            startIcon={<SaveIcon/>}
                                            variant="outlined"
                                        >
                                        </LoadingButton>
                                    ) : (
                                        <button className='send-message' onClick={handleSendMessage}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" width='24' height='24'>
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
                                            </svg>
                                        </button>
                                    )
                                }





                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminChat