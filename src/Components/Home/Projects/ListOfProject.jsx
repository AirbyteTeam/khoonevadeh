import React, {useEffect, useState} from 'react';
import img1 from "../../../assets2/img/project/project-list-01.jpg"
import img2 from "../../../assets2/img/project/project-list-03.jpg"
import {BsCash, BsHeart, BsHeartFill} from "react-icons/bs";
import {GiCash} from "react-icons/gi";
import ProgressBar from "react-bootstrap/ProgressBar";
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import {AiOutlineSearch} from 'react-icons/ai'
import api from "../../../api/api";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Link} from "react-router-dom";
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import {SeparateNumber} from "../../../helper/SeparateNumber";



const currencies = [
    {
        value: 'new',
        label: 'جديد ترين',
    },
    {
        value: 'popular',
        label: 'مشهور ترين',
    },
    {
        value: 'old',
        label: 'قديمی ترين',
    },
];


function ListOfProject() {

    const [isLiked, setIsLiked] = useState(false);
    const [projects, setProjects] = useState([]);
    const [profileList, setProfileList] = useState([]);
    const getProjects = async () => {
        const projectsResponse = await api.get("project")
        setProjects(projectsResponse.data)
        let profileUrls = []
        for (let i = 0; i < projectsResponse.data.length; i++) {
            const getProfileResponse = await api.get(`file/${projectsResponse.data[i].profileId}`, {responseType: 'blob'}).then(response => response.data)
                .then((data) => {
                    profileUrls.push(URL.createObjectURL(data));
                })
        }
        setProfileList([...profileUrls])
    }
    useEffect(() => {
        getProjects()
    }, []);

    function toggleLikeBtn() {
        if (isLiked) {
            setIsLiked(false)
        } else {
            setIsLiked(true)
        }
    }

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    return (
        <>
            <div className="container mt-5">
                {/*<div className="row mb-5" style={{border:"2px solid #e5e7eb",borderRadius:"1rem",padding:"1.5rem"}}>*/}
                {/*    <CacheProvider value={cacheRtl}>*/}
                {/*        <div className="col-2">*/}
                {/*            <TextField*/}
                {/*                labelId="demo-simple-select-label"*/}
                {/*                id="demo-simple-select"*/}
                {/*                select*/}
                {/*                label="مرتب سازي براساس"*/}
                {/*                defaultValue="new"*/}
                {/*                InputProps={{style: {fontFamily: "dana"}}}*/}
                {/*                InputLabelProps={{*/}
                {/*                    style: {*/}
                {/*                        fontFamily: "dana",*/}
                {/*                        fontSize: "0.9rem"*/}
                {/*                    }*/}
                {/*                }} // font size of input label*/}
                {/*                className="w-100 "*/}
                {/*            >*/}
                {/*                {currencies.map((option) => (*/}
                {/*                    <MenuItem key={option.value} value={option.value}>*/}
                {/*                        {option.label}*/}
                {/*                    </MenuItem>*/}
                {/*                ))}*/}
                {/*            </TextField>*/}

                {/*        </div>*/}
                {/*        <div className="col-6">*/}
                {/*            <TextField id="outlined-basic" className="w-100 " label="جـستوجـو..." variant="outlined"*/}
                {/*                       InputLabelProps={{style: {fontFamily: "dana", fontSize: "0.9rem"}}}*/}
                {/*                       InputProps={{style:{fontFamily:"dana"},endAdornment: (*/}
                {/*                               <InputAdornment position="start">*/}
                {/*                                   <AiOutlineSearch fontSize="1.3rem"/>*/}
                {/*                               </InputAdornment>*/}
                {/*                           )}}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    </CacheProvider>*/}
                {/*</div>*/}
                <div className="row project-items project-style-three justify-content-center">
                    {
                        projects.map((project, index) =>
                            <div className="col-sm-12 col-md-6 col-lg-4 mx-4 my-4">
                                <div className="bg-white shadow-2xl flex flex-col rounded-2xl">
                                    <div className="w-full">
                                        <img className="rounded-tl-2xl rounded-tr-2xl object-cover w-full h-72"
                                             src={profileList[index]}
                                             alt="project"/>
                                    </div>
                                    <div className="p-4">
                                        <div className="font-bold text-[1.3rem]">
                                            <a href={`https://halalfund.ir/projectDetail/${project.code}`}>{project.title}</a>
                                        </div>
                                        <div className="flex flex-col sm:flex-row justify-around mt-4">
                                            <div className="flex flex-col items-center my-1 sm:my-0">
                                                <i className="far fa-calendar-alt text-[1.9rem] text-[#4eb801]" ></i>
                                                <span className="mt-1 text-neutral-700"> باقی مانده</span>
                                                <span className="mt-1 text-black font-bold">{project.endDate}</span>
                                            </div>
                                            <div className="flex flex-col items-center my-1 sm:my-0">
                                                <BsCash fontSize="1.9rem" color="#4eb801"/>
                                                <span className="mt-1 text-neutral-700"> مبلغ مورد نياز</span>
                                                <span className="mt-1 text-black font-bold">{EnglishToPersian(SeparateNumber(project.expectedBudge.toString()))}<span className="mx-1">ریال</span></span>
                                            </div>
                                            <div className="flex flex-col items-center my-1 sm:my-0">
                                                <GiCash fontSize="1.9rem" color="#4eb801"/>
                                                <span className="mt-1 text-neutral-700"> مبلغ حمايت شده</span>
                                                <span className="mt-1 text-black font-bold">{EnglishToPersian(SeparateNumber(project.prepareBudge.toString()))}<span className="mx-1">ریال</span></span>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="d-flex justify-content-end">
                                                <span>{EnglishToPersian(project.progress.toString())}%</span>
                                            </div>
                                            <ProgressBar style={{height: "0.7rem"}} now={project.progress}/>
                                        </div>
                                        <div className="mt-5 d-flex justify-content-between">
                                            <Link to={`/project-details/${project.id}`} className={"main-btn"}
                                                  style={{padding: "0.7rem 4.5rem"}}>حمايت ميكنم</Link>
                                            <div className="d-flex align-items-center">
                                                <span className="mx-1" style={{color: "#000"}}>{project.likeCount}</span>
                                                <button onClick={toggleLikeBtn}>{isLiked ?
                                                    <BsHeartFill color="#dc3545" fontSize="1.2rem"/> :
                                                    <BsHeart fontSize="1.2rem" color={"#000"}/>}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default ListOfProject