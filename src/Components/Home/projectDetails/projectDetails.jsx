import React, {useEffect, useState} from 'react';
import Header2 from "../MainPage/Header2";
import Title from "../CommenPage/Title";
import Details from "./Details";
import Footer from "../MainPage/Footer";
import api from "../../../api/api";
import {useParams} from "react-router-dom";



function projectDetails() {
    const [reports, setReports] = useState([]);
    const [profileList, setProfileList] = useState([]);
    const [comments, setComments] = useState([]);
    const [project, setProject] = useState({
        title: "",
        description: "",
        status: "preparingBudge",
        expectedBudge: 0,
        prepareBudge: 0,
        startDate: "",
        endDate: "",
        priority: "low",
        profileId: ""

    });
    const {id} = useParams()
    const getProject = async () => {
        const getCommentsResponse = await api.get(`comment/project/${id}`)
        setComments(getCommentsResponse.data)

        const getReportsResponse = await api.get(`report/search?projectId=${id}`)
        setReports(getReportsResponse.data)
        let profileUrls = []
        for (let i = 0; i < getReportsResponse.data.length; i++) {
            await api.get(`file/${getReportsResponse.data[i].profileId}`, {responseType: 'blob'}).then(response => response.data)
                .then((data) => {
                    profileUrls.push(URL.createObjectURL(data));
                })
        }
        setProfileList([...profileUrls])

        const getProjectResponse = await api.get(`project/${id}`)
        const getProfileId = await api.get(`file/${getProjectResponse.data.profileId}`, {responseType: 'blob'})
        setProject({
            ...getProjectResponse.data,
            profileId: URL.createObjectURL(getProfileId.data)
        })
    }
    useEffect(() => {
        getProject()
    }, []);

    return (
        <>
            <Header2/>
            <Title name={project.title}/>
            <Details project={project} comments={comments} reports={reports} reportProfiles={profileList}/>
            <Footer/>
        </>
    );
}

export default projectDetails