import React, {useEffect, useState} from 'react';
import '../../../style/comment.css';
import {Alert} from "@mui/lab";
import Avatar from "@mui/material/Avatar";
import {deepOrange} from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import {prefixer} from "stylis";
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import TextField from '@mui/material/TextField';
import api from "../../../api/api";
import {useParams} from "react-router-dom";
import LoginApi from "../../../api/LoginApi";
import { AiFillLike} from "react-icons/ai"
import axios from "axios";

function Comment(props) {
    const {id} = useParams()
    const [done, setDone] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [likedComments, setLikedComments] = useState([]);

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    const getLikes = async () => {
        await api.get(`like/${localStorage.getItem("phoneNumber")}`).then((response) => {
            if (response.data.comments !== undefined) {
                setLikedComments(response.data.comments)
            }
        })
    }
    useEffect(() => {
        getLikes()
    }, []);

    const toggleLikeBtn = async (id, likeStatus) => {
        if (likeStatus) {
            try {
                await axios.delete(`http://localhost:8099/api/v1/like/${localStorage.getItem("phoneNumber")}`, {
                    headers: {
                        'Authorization': localStorage.getItem("Authorization"),
                    },
                    data: {
                        type: "comment",
                        username: localStorage.getItem("phoneNumber"),
                        id: id
                    }
                });
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    await LoginApi()
                    await axios.delete(`http://localhost:8099/api/v1/like/${localStorage.getItem("phoneNumber")}`, {
                        headers: {
                            'Authorization': localStorage.getItem("Authorization"),
                        },
                        data: {
                            type: "comment",
                            username: localStorage.getItem("phoneNumber"),
                            id: id
                        }
                    })
                } else {
                    console.log("error in main delete api")
                }
            }
        } else {
            await api.post("like", {
                type: "comment",
                username: localStorage.getItem("phoneNumber"),
                id: id
            })
        }
        getLikes()
    }

    const submitComment = async () => {
        await LoginApi().then(async (response) => {
            const userResponse = await api.get(`user/search?username=${localStorage.getItem("phoneNumber")}`)
            await api.post("comment", {
                senderName: userResponse.data[0].firstName + " " + userResponse.data[0].lastName,
                text: newComment,
                date: new Date().toLocaleDateString('fa-IR-u-nu'),
                likeCount: 0,
                disLikeCount: 0,
                projectId: id
            })
            setNewComment("")
            setDone(true)
        }).catch((error) => {
            if (error.status === 403) {
                localStorage.clear()
                setNewComment("")
            } else {
                setDone(false)
                setNewComment("")
            }
        })
    }
    return (
        <>

            <div class="container">
                <div className="be-comment-block">
                    <h1 class="comments-title">نظرات ({props.comments.length})</h1>
                    <div>
                        {
                            props.comments.map((comment, index) =>
                                <div key={index} class="be-comment row">
                                    <div className="col-sm-12 col-md-2 col-lg-1">
                                        <div class="be-img-comment">
                                            <Stack direction="row" spacing={2}>
                                                <Avatar sx={{bgcolor: deepOrange[500]}}
                                                >{comment.senderName.slice(0, 1)}</Avatar>
                                            </Stack>
                                            <span class="be-comment-name">{comment.senderName}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-10 col-lg-11">
                                        <div class="be-comment-content">
                                            <div className="be-time-container">
                                <span class="be-comment-time">
                                <i class="fa fa-clock-o"></i>{comment.date}  <AiFillLike color={likedComments.includes(comment.id) ? "#F7D55A" : null} size={20} onClick={() => toggleLikeBtn(comment.id, likedComments.includes(comment.id))}/></span>
                                            </div>
                                            <p class="be-comment-text">
                                                {comment.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div>
                            {
                                localStorage.getItem("phoneNumber") && localStorage.getItem("password") && localStorage.getItem("role") && localStorage.getItem("Authorization") ?
                                    null
                                    : <Alert severity="warning">برای ارسال نظر لطفا ابتدا وارد شوید.</Alert>
                            }
                            <div className={"my-4"}>
                                <CacheProvider value={cacheRtl}>
                                    <TextField id="outlined-basic" className="w-100 "
                                               label="دیدگاه خودتون رو بنویسید..."
                                               variant="outlined"
                                               fullWidth
                                               multiline
                                               minRows={3}
                                               disabled={!(localStorage.getItem("phoneNumber") && localStorage.getItem("password") && localStorage.getItem("role") && localStorage.getItem("Authorization"))}
                                               value={newComment}
                                               onChange={(e) => setNewComment(e.target.value)}
                                               InputLabelProps={{style: {fontFamily: "dana", fontSize: "0.9rem"}}}
                                               InputProps={{
                                                   style: {fontFamily: "dana"}
                                               }}/>
                                    <div className={"w-100 justify-content-end d-flex flex-column"}>
                                        <button onClick={submitComment} className={"main-btn mt-2 btn-sm"}
                                                disabled={!(localStorage.getItem("phoneNumber") && localStorage.getItem("password") && localStorage.getItem("role") && localStorage.getItem("Authorization"))}>ارسال
                                            نظر
                                        </button>
                                        {
                                            done === true ?
                                            <small className={"text-success text-sm"}>نظر شما با موفقیت ثبت شد.</small> :
                                                done === false ?
                                                    <small className={"text-danger text-sm"}>مشکلی رخ داد است. لطفا دوبار تلاش کید.</small> : null
                                        }
                                    </div>
                                </CacheProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comment