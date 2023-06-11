import React from 'react';
import img1 from "../../../assets2/img/divarmehrabani.jpg"
import ProgressBar from "react-bootstrap/ProgressBar";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import Comment from "./Comment";
import Report from "./Report";
import FormControl from "@mui/material/FormControl";
import {FilledInput, InputAdornment, OutlinedInput} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {CacheProvider} from '@emotion/react';
import {numberSlicer} from "../../../helper/numberSlicer";
import {LazyLoadImage} from "react-lazy-load-image-component";
import ReactDOMServer from 'react-dom/server';

function Details(props) {
    const [value, setValue] = React.useState('1');
    const reactString = '<div>Hello, world!</div>';
    const htmlString = ReactDOMServer.renderToString(React.createElement('div', { dangerouslySetInnerHTML: { __html: reactString } }));


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    const styles = theme => ({
        indicator: {
            backgroundColor: 'white',
        },
    })

    return (
        <>
            <section className="project-details-area section-gap-extra-bottom">
                <div className="container">
                    <div className="row align-items-start justify-content-center">
                        <div className="col-lg-6 col-md-10">
                            <div className="project-thumb mb-md-50">
                                <img className={"thumb"} src={props.project.profileId}
                                               alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="project-summery">
                                {/*<a href="#" className="category">هدفون</a>*/}
                                <h3 className="project-title">
                                    {props.project.title}
                                </h3>
                                <div className="meta">
                                    <a href="#" className="date"><i className="far fa-calendar-alt"></i>{props.project.startDate}</a>
                                </div>
                                <div className="project-funding-info justify-content-center d-flex">
                                    <div className="info-box w-100">
                                        <span>{numberSlicer(props.project.expectedBudge.toString())} ریال</span>
                                        <span className="info-title">هدف</span>
                                    </div>
                                    {/*<div className="info-box">*/}
                                    {/*    <span>9</span>*/}
                                    {/*    <span className="info-title">حامی</span>*/}
                                    {/*</div>*/}
                                    {/*<div className="info-box">*/}
                                    {/*    <span>29</span>*/}
                                    {/*    <span className="info-title">روز باقی مانده</span>*/}
                                    {/*</div>*/}
                                </div>
                                <div className="project-raised clearfix">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="raised-label">
                                            <span style={{color: "#696969"}}>مبلغ جمع آوری شده:</span>
                                            <span className="mx-3">{props.project.prepareBudge} ریال</span>
                                        </div>
                                        <div className="percent-raised">{props.project.progress}%</div>
                                    </div>
                                    <div className="bar mt-4" data-value="">
                                        <ProgressBar variant="success" now={props.project.progress} label={`${props.project.progress}%`}/>
                                    </div>
                                </div>
                                <div className="project-form">
                                    <div>
                                        <h6 className={"mx-2"}>لطفا مبلغ حمایت خود را معین کنید</h6>
                                        <div className={"mb-2"}>
                                            <CacheProvider value={cacheRtl}>
                                                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                                    <InputLabel sx={{fontFamily:"dana"}} htmlFor="filled-adornment-amount">مبلغ</InputLabel>
                                                    <FilledInput
                                                        id="filled-adornment-amount"
                                                        endAdornment={<InputAdornment position="end">ریال</InputAdornment>}
                                                    />
                                                </FormControl>
                                            </CacheProvider>
                                        </div>
                                        {/*<ul className="donation-amount">*/}
                                        {/*    <li>50,000</li>*/}
                                        {/*    <li>100,000</li>*/}
                                        {/*    <li>200,000</li>*/}
                                        {/*    <li>500,000</li>*/}
                                        {/*</ul>*/}
                                        <button className="main-btn">هم اکنون کمک کنید <i
                                            className="far fa-arrow-left"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">

                            <TabContext value={value}>
                                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                    <Tabs TabIndicatorProps={{style: {background: '#38ab1e'}}} value={value}
                                          onChange={handleChange}>
                                        <Tab label="توضیحات" value="1"/>
                                        <Tab label="نظرات" value="2"/>
                                        <Tab label="گزارشات" value="3"/>
                                    </Tabs>
                                </Box>
                                <TabPanel value="1">
                                    <div className="project-details-tab">
                                        <div className="row justify-content-center">
                                            {/*<h4 className="description-title">چرا باید از محصول ما حمایت
                                                کنید</h4>*/}
                                            <div>
                                                {
                                                    <div dangerouslySetInnerHTML={{ __html: props.project.description }}>
                                                    </div>
                                                }
                                            {/*    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                                                با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                                                و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                                                تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                                                کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                                            </p>
                                            <ul className="description-list">
                                                <li>لورم ایپسوم متن ساختگی با</li>
                                                <li>لورم ایپسوم متن ساختگی با</li>
                                                <li>لورم ایپسوم متن ساختگی با</li>
                                                <li>لورم ایپسوم متن ساختگی با</li>
                                            </ul>
                                            <p>
                                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                                                با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                                                و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی*/}
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value="2">
                                    <Comment comments={props.comments}/>
                                </TabPanel>
                                <TabPanel value="3">
                                    <Report reports={props.reports} profiles={props.reportProfiles}/>
                                </TabPanel>
                            </TabContext>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}

export default Details