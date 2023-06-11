import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import {BsCash, BsHeart, BsHeartFill} from "react-icons/bs";
import {GiCash} from "react-icons/gi";
import ProgressBar from "react-bootstrap/ProgressBar";
import {Link} from "react-router-dom";
import api from "../../../api/api";
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import {SeparateNumber} from "../../../helper/SeparateNumber";

function Campaigns() {
    const [isLiked, setIsLiked] = useState(false);
    const [projects, setProjects] = useState([]);
    const [profileList, setProfileList] = useState([]);
    const getProjects = async () => {
        const projectsResponse = await api.get("project/search?priority=high")
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

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        draggable: true,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
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

    function toggleLikeBtn() {
        if (isLiked) {
            setIsLiked(false)
        } else {
            setIsLiked(true)
        }
    }

    return (
        <>
            <section className="emergency-project-with-cta">
                <div className="emergency-project-slider">
                    <div className="container">
                        <div className="common-heading text-center mb-20">
					<span className="tagline">
						<i className="fas fa-plus"></i>کمک کنید
						<span className="heading-shadow-text">پروژه های خیریه</span>
					</span>
                            <h2 className="title">نیاز فوری</h2>
                        </div>
                        <div className="row project-items project-style-three justify-content-center">
                            <Slider {...settings}>
                                {
                                    projects.map((project, index) =>
                                        <div className="px-4">
                                            <div className="bg-white flex flex-col sm:flex-row rounded-2xl">
                                                <div className="w-full sm:w-[65%]">
                                                    <img
                                                        className=" rounded-tl-2xl rounded-tr-2xl sm:rounded-tl-2xl sm:rounded-bl-2xl object-cover w-full h-72 sm:h-full"
                                                        src={profileList[index]}
                                                        alt="project"/>
                                                </div>
                                                <div className="p-4" style={{direction: "rtl"}}>
                                                    <div className="font-bold text-[1.1rem]">
                                                        <Link
                                                            to={`/project-details/${project.id}`}>{project.title}</Link>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row justify-around mt-4">
                                                        <div className="flex flex-col items-center my-1 sm:my-0">
                                                            <i className="far fa-calendar-alt text-[1.7rem] text-[#4eb801]"></i>
                                                            <span className="mt-1 text-neutral-700 text-[0.9rem]"> باقی مانده</span>
                                                            <span
                                                                className="mt-1 text-black font-bold text-[0.9rem]">{EnglishToPersian(project.endDate)}</span>
                                                        </div>
                                                        <div className="flex flex-col items-center my-1 sm:my-0">
                                                            <BsCash fontSize="1.7rem" color="#4eb801"/>
                                                            <span className="mt-1 text-neutral-700 text-[0.9rem]"> مبلغ مورد نياز</span>
                                                            <span
                                                                className="mt-1 text-black font-bold text-[0.9rem]">{EnglishToPersian(SeparateNumber(project.expectedBudge.toString()))}<span
                                                                className="mx-1">ریال</span></span>
                                                        </div>
                                                        <div className="flex flex-col items-center my-1 sm:my-0">
                                                            <GiCash fontSize="1.7rem" color="#4eb801"/>
                                                            <span className="mt-1 text-neutral-700 text-[0.9rem]"> مبلغ حمايت شده</span>
                                                            <span
                                                                className="mt-1 text-black font-bold text-[0.9rem]">{EnglishToPersian(SeparateNumber(project.prepareBudge.toString()))}<span
                                                                className="mx-1">ریال</span></span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4">
                                                        <div className="d-flex justify-content-end">
                                                            <span>{EnglishToPersian(project.progress.toString())}%</span>
                                                        </div>
                                                        <ProgressBar style={{height: "0.7rem"}} now={project.progress}/>
                                                    </div>
                                                    <div className="mt-4 d-flex justify-content-center">
                                                        <Link to="/project-details" className={"main-btn px-5"}>حمايت
                                                            ميكنم</Link>
                                                        <div className="d-flex align-items-center">
                                                        <span className="mx-1"
                                                              style={{color: "#000"}}>{project.likeCount}</span>
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
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Campaigns