import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css'
import axios from 'axios'
import {toast} from "react-toastify";
import {Notification} from "../AdminPage/components/Notification"
import authHeader from "../../auth/header";
import {UpdateInterviewModal} from "./components/UpdateInterviewModal"
import {ConductInterviewModal} from "./components/ConductInterviewModal"




export const ExpertPage = () => {

    const [unconfirmedInterviews, setUnconfirmedInterviews] = useState([])
    const [confirmedInterviews, setConfirmedInterviews] = useState([])
    const [isUpdateInterviewModalCreate, setIsUpdateInterviewModalCreate] = useState(true)
    const [updateStatusInterviewData, setUpdateStatusInterviewData] = useState({currentIntStatusId: null, interviewId: null });
    const [isConductInterviewModalCreate, setIsConductInterviewModalCreate] = useState(false)
    const [conductingInterviewId, setConductingInterviewId] = useState();

    useEffect(() => {
        getUnconfirmedInterviews();
        getConfirmedInterviews();
    }, []);
    let agencyName = JSON.parse(localStorage.getItem('response')).agency.name;
    let personEmail = JSON.parse(localStorage.getItem('response')).email;

    const getUnconfirmedInterviews = () => { //1,2
        let unconfirmedInterviews = [];
        axios
            .get("http://localhost:8080/interview/get-interview-for-expert/" +  JSON.parse(localStorage.getItem("response")).agency.id + "/" + JSON.parse(localStorage.getItem("response")).userId + "/1", {headers: authHeader()})
            .then(data => {
                unconfirmedInterviews = data.data;

                axios
                    .get("http://localhost:8080/interview/get-interview-for-expert/" +  JSON.parse(localStorage.getItem("response")).agency.id + "/" + JSON.parse(localStorage.getItem("response")).userId +"/2", {headers: authHeader()})
                    .then(data => {
                        unconfirmedInterviews = [...unconfirmedInterviews, ...data.data]
                        setUnconfirmedInterviews(unconfirmedInterviews);
                    })
                    .catch(err => toast.error("Expert has been added", {position: toast.POSITION.TOP_RIGHT})
                    )
            })
            .catch(err => alert(err))

    }
    const getConfirmedInterviews = () => { //Only 3
        let confirmedInterview = [];
        axios
            .get("http://localhost:8080/interview/get-interview-for-expert/" +  JSON.parse(localStorage.getItem("response")).agency.id + "/" + JSON.parse(localStorage.getItem("response")).userId + "/3", {headers: authHeader()})
            .then(data => {
                confirmedInterview = data.data;
                axios
                    .get("http://localhost:8080/interview/get-interview-for-expert/" +  JSON.parse(localStorage.getItem("response")).agency.id + "/" + JSON.parse(localStorage.getItem("response")).userId + "/7", {headers: authHeader()})
                    .then(data => {
                        confirmedInterview = [...confirmedInterview, ...data.data];
                        setConfirmedInterviews(confirmedInterview);
                    })
                    .catch(err => alert(err))

            })
            .catch(err => alert(err))
    }
    const refreshInterviews = () => {
        getUnconfirmedInterviews();
        getConfirmedInterviews();
    }

    const updateIntrvModalCreateClickHandler = (interviewId, interviewStatusId) => {
        setUpdateStatusInterviewData({currentIntStatusId: interviewStatusId, interviewId: interviewId });
        setIsUpdateInterviewModalCreate(false);
    }
    const updateIntrvModalCloseClickHandler = () => {
        setIsUpdateInterviewModalCreate(true);
        //myInterviewsShow === false ? getAllInterviews() : getMyInterviews()
        setUpdateStatusInterviewData(null);
    }

    const conductInterviewModalCreateClickHandler = (interviewId) => {
        setConductingInterviewId(interviewId);
        setIsConductInterviewModalCreate(true);
    }
    const conductInterviewModalCloseClickHandler = () => {
        setIsConductInterviewModalCreate(false);
    }

    return (
        <div>
            <Notification />
            {!isUpdateInterviewModalCreate &&
            <UpdateInterviewModal onModalCloseClick={updateIntrvModalCloseClickHandler} updateStatusInterviewData={updateStatusInterviewData} refreshInterviews={refreshInterviews}/>
            }
            {isConductInterviewModalCreate &&
            <ConductInterviewModal onModalCloseClick={conductInterviewModalCloseClickHandler} interviewId={conductingInterviewId} refreshInterviews={refreshInterviews}/>
            }


            <div>
                <link
                    href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600,400italic,700'
                    rel='stylesheet' type='text/css'/>
                <section id="fh5co-home" className="section section-6" data-section="home"
                         style={{backgroundImage: 'url(images/full_image_2.jpg)', paddingTop: '20px'}}
                         data-stellar-background-ratio="0.5">
                    <div className="gradient"/>
                    <div className="container">
                        <div className="text-wrap">
                            <div className="text-inner">
                                <div className="row">
                                    <div className="col-md-8"
                                         style={{marginLeft: 'auto', marginRight: 'auto', textAlign: 'left'}}>
                                        <h1 className="to-animate">{agencyName}</h1>
                                        <h2 className="to-animate"> Email: {personEmail}</h2>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="fh5co-work" className="section section-6" data-section="work">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 section-heading text-center">
                                <h2 className="to-animate">Unconfirmed Interview</h2>
                            </div>
                        </div>
                        <br/><br/>
                        <div className="row row-bottom-padded-sm">
                            {unconfirmedInterviews.map((interview) => {
                                return  <div className="col-md-4 col-sm-6">
                                    <div className="fh5co-project-item image-popup to-animate">
                                        <p>Expert name: {interview.expertName}</p>
                                        <p>Employee name: {interview.employeeSurname + " " + interview.employeeName}</p>
                                        <p>Interview status: {interview.interviewStatusName}</p>
                                        <p>Start: {interview.startDateTime.replace('T', ' ')}</p>
                                        <p>End: {interview.endDateTime.replace('T', ' ')}</p>
                                        <p>Manag. comment: {interview.managerComment}</p>
                                        <button style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: '5px' }} className="login100-form-btn" onClick={() => updateIntrvModalCreateClickHandler(interview.id, interview.interviewStatusId)}>{/*confirmInterview(interview.id, interview.interviewStatusId)*/}
                                            Approve
                                        </button>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    <br/><br/>
                </section>
                <section id="fh5co-work" className="section section-6" data-section="work">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 section-heading text-center">
                                <h2 className="to-animate">Confirmed Interview</h2>
                            </div>
                        </div>
                        <br/><br/>
                        <div className="row row-bottom-padded-sm">
                            { confirmedInterviews.length > 0 ? confirmedInterviews.map((interview) => {
                                return  <div className="col-md-4 col-sm-6">
                                    <div className="fh5co-project-item image-popup to-animate">
                                        <p>Expert name: {interview.expertName}</p>
                                        <p>Employee name: {interview.employeeSurname + " " + interview.employeeName}</p>
                                        <p>Interview status: {interview.interviewStatusName}</p>
                                        <p>Start: {interview.startDateTime.replace('T', ' ')}</p>
                                        <p>End: {interview.endDateTime.replace('T', ' ')}</p>
                                        <p>Manag. comment: {interview.managerComment}</p>
                                        <p>Exp. comment: {interview.expertComment}</p>
                                        <button style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: '5px' }} className="login100-form-btn" onClick={() => {conductInterviewModalCreateClickHandler(interview.id)}}>
                                            Conduct interview
                                        </button>
                                    </div>
                                </div>
                            }): false}
                        </div>
                    </div>
                    <br/><br/>
                </section>
            </div>
        </div>
    )
};
