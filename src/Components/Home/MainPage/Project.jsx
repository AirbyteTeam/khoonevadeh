import React, {useEffect, useState} from 'react';
import projectImg1 from "../../../assets/img/my-wish-for-you-1600x900-1.jpg"
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

function Project() {
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
        getLikes()
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

    const getLikes = async () => {
        await api.get(`like/${localStorage.getItem("phoneNumber")}`).then((response) => {
            if (response.data.projects !== undefined) {
                setLikedProjects(response.data.projects)
            }
        })
    }
    const toggleLikeBtn = async (id, likeStatus) => {
        if (likeStatus) {
            try {
                await axios.delete(`http://api.khoonevadeh.com/api/v1/like/${localStorage.getItem("phoneNumber")}`, {
                    headers: {
                        'Authorization': localStorage.getItem("Authorization"),
                    },
                    data: {
                        type: "project",
                        username: localStorage.getItem("phoneNumber"),
                        id: id
                    }
                });
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    await LoginApi()
                    await axios.delete(`http://api.khoonevadeh.com/api/v1/like/${localStorage.getItem("phoneNumber")}`, {
                        headers: {
                            'Authorization': localStorage.getItem("Authorization"),
                        },
                        data: {
                            type: "project",
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
                type: "project",
                username: localStorage.getItem("phoneNumber"),
                id: id
            })
        }
        getLikes()
    }

    return (
        <>
            <section className="project-section project-section-extra-gap secondary-bg">
                <div className="container-fluid fluid-extra-padding">
                    <div className="common-heading text-center color-version-white mb-60">
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
                                    <div key={index}
                                         className="d-flex justify-content-center px-2 col-md-3 col-sm-4 col-xl-12">
                                        <div className="project-item" style={{maxWidth: "20rem"}}>
                                            <div className={"thumb"}>
                                                <img className={"thumb"} src={profileList[index]}
                                                     alt=""
                                                />
                                            </div>
                                            <div className="content">
                                                <h5 className="title">
                                                    <a href="">{project.title}</a>
                                                </h5>
                                                <div className="project-stats">
                                                    <div className="stats-value">
                                                        <span
                                                            className="value">{numberSlicer(project.expectedBudge.toString())} تومان</span>
                                                        <div className="d-flex align-items-center">
                                                            <span className="value-title mx-2">: مبلغ مورد نياز</span>
                                                            <BsCash color="#5f5f5f"/>
                                                        </div>
                                                    </div>
                                                    <div className="stats-value">
                                                        <span
                                                            className="value">{numberSlicer(project.prepareBudge.toString())} تومان</span>
                                                        <div className="d-flex align-items-center">
                                                            <span className="value-title mx-2">: مبلغ حمايت شده</span>
                                                            <GiCash color="#5f5f5f"/>
                                                        </div>
                                                    </div>

                                                    <div className="stats-bar mt-4" data-value="">
                                                        <div className="d-flex justify-content-end">
                                                            <span
                                                                style={{fontSize: "0.7rem"}}>{project.progress}%</span>
                                                        </div>
                                                        <ProgressBar style={{height: "0.3rem"}} variant="success"
                                                                     now={project.progress}/>
                                                    </div>
                                                </div>
                                                <div className="mt-5 d-flex justify-content-center">
                                                    <Link to={`/project-details/${project.id}`} className={"main-btn"}
                                                          style={{padding: "0.7rem 4.5rem"}}>حمايت ميكنم</Link>
                                                </div>
                                                <div className="mt-4  d-flex justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <button
                                                            onClick={() => toggleLikeBtn(project.id, likedProjects.includes(project.id))}
                                                            style={{marginTop: "4px"}}>{likedProjects.includes(project.id) ?
                                                            <BsHeartFill color="#dc3545" fontSize="1.2rem"/> :
                                                            <BsHeart fontSize="1.2rem"/>}</button>
                                                        <span className="mx-2 mt-1">{project.likeCount}</span>
                                                    </div>
                                                    <span className="date"><i
                                                        className="far fa-calendar-alt"></i>{project.startDate}</span>
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