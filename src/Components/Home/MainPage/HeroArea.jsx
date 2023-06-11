import React from 'react';
import {Link} from "react-router-dom";

function MainPage() {

    return (
        <>
            <section className="hero-area-two slide-background">
                <div className="text-container">
                    <div className="flex justify-content-center align-items-center" >
                        <div className="hero-text" style={{zIndex:"3"}}>
                            <h1 className="title text-center text-white">
                                ما در خونواده دست یاری شما هستیم…
                            </h1>
                            <ul className="flex justify-content-center">
                                <li className="" data-wow-delay="0.4s">
                                    <Link to='/projects' className="main-btn">
                                        اطلاعات بيشتر<i
                                        className="far fa-arrow-left"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MainPage