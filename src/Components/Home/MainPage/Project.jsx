import React, {useEffect, useState} from 'react';
import projectImg1 from "../../../assets2/img/my-wish-for-you-1600x900-1.jpg"
import Slider from "react-slick";
import ProgressBar from 'react-bootstrap/ProgressBar';
import {Link} from "react-router-dom"
import {BsCash, BsHeart, BsHeartFill} from "react-icons/bs"
import {GiCash} from "react-icons/gi"
import api from "../../../api/api";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {numberSlicer} from "../../../helper/numberSlicer";
import LoginApi from "../../../api/LoginApi";
import axios from "axios";
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import {SeparateNumber} from "../../../helper/SeparateNumber";
import {maxWidth} from "@mui/system";

function Project() {
    const [isLiked, setIsLiked] = useState(false);
    const [countOfProject, setCountOfProject] = useState(0)
    const [likedProjects, setLikedProjects] = useState([]);
    const [projects, setProjects] = useState([]);
    const [profileList, setProfileList] = useState([]);
    const getProjects = async () => {
        const projectsResponse = await api.get("project")
        setProjects(projectsResponse.data)
        if (projectsResponse.data.length <= 4) {
            setCountOfProject(projectsResponse.data.length)
        } else {
            setCountOfProject(4)
        }
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
        //getLikes()
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: countOfProject,
        slidesToScroll: 1,
        draggable: true,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    // const getLikes = async () => {
    //     await api.get(`like/${localStorage.getItem("phoneNumber")}`).then((response) => {
    //         if (response.data.projects !== undefined) {
    //             setLikedProjects(response.data.projects)
    //         }
    //     })
    // }

    const toggleLikeBtn = async (id, likeStatus) => {
        // if (likeStatus) {
        //     try {
        //         await axios.delete(`http://localhost:8099/api/v1/like/${localStorage.getItem("phoneNumber")}`, {
        //             headers: {
        //                 'Authorization': localStorage.getItem("Authorization"),
        //             },
        //             data: {
        //                 type: "project",
        //                 username: localStorage.getItem("phoneNumber"),
        //                 id: id
        //             }
        //         });
        //     } catch (error) {
        //         if (error.response && error.response.status === 403) {
        //             await LoginApi()
        //             await axios.delete(`http://localhost:8099/api/v1/like/${localStorage.getItem("phoneNumber")}`, {
        //                 headers: {
        //                     'Authorization': localStorage.getItem("Authorization"),
        //                 },
        //                 data: {
        //                     type: "project",
        //                     username: localStorage.getItem("phoneNumber"),
        //                     id: id
        //                 }
        //             })
        //         } else {
        //             console.log("error in main delete api")
        //         }
        //     }
        // } else {
        //     await api.post("like", {
        //         type: "project",
        //         username: localStorage.getItem("phoneNumber"),
        //         id: id
        //     })
        // }
        // getLikes()
        if (isLiked) {
            setIsLiked(false)
        } else {
            setIsLiked(true)
        }
    }

    return (
        <>
            <section className="project-section project-section-extra-gap secondary-bg">
                <div className="container-fluid fluid-extra-padding">
                    <div className="common-heading text-center color-version-white mb-20">
				<span className="tagline">
					 پروژه های محبوب <i className="fas fa-plus"></i>
					<span className="heading-shadow-text">پروژه های ما</span>
				</span>
                        <h2 className="title">پروژه های ما را کاوش کنید</h2>
                    </div>
                    <div className="row project-slider-one project-items project-style-one no-shadow">
                        <Slider {...settings}>
                            {
                                projects.map((project, index) =>
                                    <div className="col-sm-12 col-md-6 col-lg-4 mx-4 my-4 p-10">
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
                                                        <span className="mt-1 text-neutral-700">تاریخ اتمام</span>
                                                        <span className="mt-1 text-black font-bold">{EnglishToPersian(project.endDate)}</span>
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
                                                    <div className="d-flex align-items-center">
                                                        <button onClick={toggleLikeBtn}>{isLiked ?
                                                            <BsHeartFill color="#dc3545" fontSize="1.2rem"/> :
                                                            <BsHeart fontSize="1.2rem" color={"#000"}/>}
                                                        </button>
                                                        <span className="mx-1"
                                                              style={{color: "#000"}}>{project.likeCount}</span>
                                                    </div>
                                                    <Link to={`/project-details/${project.id}`} className={"main-btn"}
                                                          style={{padding: "0.7rem 4.5rem"}}>حمايت ميكنم</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </Slider>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Project