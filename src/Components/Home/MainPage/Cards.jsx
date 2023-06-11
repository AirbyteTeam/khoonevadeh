import React from 'react'
import aboutShape from "../../../assets2/img/about/about-shape.png";
import {FaCoins} from "react-icons/fa";

function Cards() {
    return (
        <>
            <div className="about-section-two py-20 px-10">
                <div className="common-heading text-center mb-20">
					<span className="tagline">
						<i className="fas fa-plus"></i>خدمات
						<span className="heading-shadow-text"> خدمات ما</span>
					</span>
                    <h2 className="title">ما چکار میکنیم ؟</h2>
                </div>
                <div className="flex justify-content-center items-center">
                    <div className="w-full md:w-[80%]">
                        <div className="cards row">
                            <div className="col-md-3 col-sm-6 col-lg-3">
                                <div className="py-10 px-2 flex justify-content-center flex-col  border-2 border-solid border-neutral-300 rounded-3xl hover:bg-mainGreen text-mainGreen hover:text-white">
                                    <div className="flex justify-content-center text-6xl my-10">
                                        <i class="fa fa-heartbeat" aria-hidden="true"></i>
                                    </div>
                                    <div className="text-center flex justify-content-center items-center flex-col">
                                        <h3 className="font-bold text-3xl mb-4">توامندسازی</h3>
                                        <p className="w-2/3 text-center text-black">
                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
                                            گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-lg-3">
                                <div className="py-10 px-2 flex justify-content-center flex-col  border-2 border-solid border-neutral-300 rounded-3xl hover:bg-mainGreen text-mainGreen hover:text-white">
                                    <div className="flex justify-content-center text-6xl my-10">
                                        <i class="fa fa-users" aria-hidden="true"></i>
                                    </div>
                                    <div className="text-center flex justify-content-center items-center flex-col">
                                        <h3 className="font-bold text-3xl mb-4">جذب و استخدام</h3>
                                        <p className="w-2/3 text-center text-black">
                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
                                            گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-lg-3">
                                <div className="py-10 px-2 flex justify-content-center flex-col  border-2 border-solid border-neutral-300 rounded-3xl hover:bg-mainGreen text-mainGreen hover:text-white">
                                    <div className="flex justify-content-center text-6xl my-10">
                                        <i class="fa fa-archive" aria-hidden="true"></i>
                                    </div>
                                    <div className="text-center flex justify-content-center items-center flex-col">
                                        <h3 className="font-bold text-3xl mb-4">تامین کالا</h3>
                                        <p className="w-2/3 text-center text-black">
                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
                                            گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-lg-3">
                                <div className="py-10 px-2 flex justify-content-center flex-col  border-2 border-solid border-neutral-300 rounded-3xl hover:bg-mainGreen text-mainGreen hover:text-white">
                                    <div className="flex justify-content-center text-6xl my-10">
                                        <FaCoins/>
                                    </div>
                                    <div className="text-center flex justify-content-center items-center flex-col">
                                        <h3 className="font-bold text-3xl mb-4">تامین مالی</h3>
                                        <p className="w-2/3 text-center text-black">
                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
                                            گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-shape">
                    <img src={aboutShape} alt="Shape"/>
                </div>
            </div>
        </>
    )
}

export default Cards