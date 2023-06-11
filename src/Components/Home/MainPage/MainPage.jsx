import React from 'react';
import Header from "./Header";
import HeroArea from "./HeroArea";
import About2 from "./About2";
import Project from "./Project";
import Campaigns from "./Campaigns"
import Footer from "./Footer";
import Partners from "./Partners";
import Counter from "./Counter";
import "../../../style/homePage.css"
import Cards from "./Cards";

function MainPage() {

    return (
        <>
            <Header/>
            <HeroArea/>
            <About2/>
            <Cards/>
            <Campaigns/>
            <Counter/>
            <Partners/>
            <Footer/>
        </>
    );
}

export default MainPage