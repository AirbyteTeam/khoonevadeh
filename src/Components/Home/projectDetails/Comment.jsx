import React from 'react';
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
import { InputAdornment } from '@mui/material';
import {AiOutlineSearch} from "react-icons/ai";

function Comment(props) {

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

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
                                <i class="fa fa-clock-o"></i>{comment.date}</span>
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
                            <Alert severity="warning">برای ارسال نظر لطفا ابتدا وارد شوید.</Alert>
                            <div className={"my-4"}>
                                <CacheProvider value={cacheRtl}>
                                    <TextField id="outlined-basic" className="w-100 " label="دیدگاه خودتون رو بنویسید..."
                                               variant="outlined"
                                               fullWidth
                                               multiline
                                               minRows={3}
                                               InputLabelProps={{style: {fontFamily: "dana", fontSize: "0.9rem"}}}
                                               InputProps={{
                                                   style: {fontFamily: "dana"}
                                               }}/>

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