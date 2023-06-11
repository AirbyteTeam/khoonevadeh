import React from 'react';
import img1 from "../../../assets2/img/SignUp/login.jpg"

function About2() {
    return (
        <>
            <section className="about-section-one">
                <div className="container">
                    <div className="row align-items-center justify-content-lg-start justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-9">
                            <div className="about-img">
                                <img src={img1} alt="Image"/>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-7 col-md-8 order-xl-2">
                            <div className="about-text">
                                <div className="common-heading mb-30">
								<span className="tagline">
									<span className="float-right text-2xl"><i
                                        className="fas fa-plus"></i> ما که هستیم ؟</span>
									<span className="heading-shadow-text">درباره ما</span>
								</span>
                                </div>
                                <h2 className="text-right font-bold text-3xl mt-16">ما در  خونواده دست یاری شما هستیم…</h2>
                                <p className="text-l mt-7">
                                    ما اعضای یک خونواده ایم، باهم، کنار هم و حامی هم، که هدفمان توانمندسازی و اشتغال آفرینی اقشاریت که به نیاز دارند.
                                    ما تیمی دغدغه مند از دانشگاهیان دانشگاه هستیم که به تغییر زندگی انسان ها از طریق توانمندسازی اعتقاد داریم.
                                </p>
                                <a href="#" className="main-btn btn-dark mt-5">بیشتر بدانید <i
                                    className="far fa-arrow-left"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About2