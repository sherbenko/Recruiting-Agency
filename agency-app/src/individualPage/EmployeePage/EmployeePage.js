import React, {useEffect, useState} from 'react';
import "../../cssForIndividualPage/animate.css";
import "../../cssForIndividualPage/icomoon.css";
import "../../cssForIndividualPage/simple-line-icons.css";
import "../../cssForIndividualPage/magnific-popup.css";
import "../../cssForIndividualPage/style.css";
import EmployeeInterview from "./EmployeeInterview";
import axios from "axios";
import authHeader from "../../auth/header";


function EmployeePage() {
    const agencyName = JSON.parse(localStorage.getItem('response')).agency.name;
    const personEmail = JSON.parse(localStorage.getItem('response')).email;
    const userId = JSON.parse(localStorage.getItem('response')).userId;
    let isSuspended;
    const [contract, setContract] = useState({contract: []})
    const [interviews, setInterviews] = useState([]);
    const [contractStatus, setContractStatus] = useState([]);
    useEffect(() => {
        getContract();
    }, [])
    const getContract = () => {
        axios
            .get("http://localhost:8080/employeeContract/getByUserId/" + userId, {headers: authHeader()})
            .then(data => {
                setContract({contract: data.data})
                getAllInterviews(data.data.id)
                getStatus(data.data.statusId)
            })
            .catch(err => alert(err))
    }
    const getAllInterviews = (contractId) => {
        axios
            .get("http://localhost:8080/interview/get-by-contract-id/" + contractId, {headers: authHeader()}) //agency_id/expert_id/year/month/day
            .then(data => {
                setInterviews(data.data);
            })
            .catch(err => alert(err))
    }
    const getStatus = (statusId) => {
        axios
            .get("http://localhost:8080/status/" + statusId, {headers: authHeader()}) //agency_id/expert_id/year/month/day
            .then(data => {
                setContractStatus(data.data.name);
            })
            .catch(err => alert(err))
    }
    if (contract.contract.isDeleted === true)
        isSuspended = 'Контракт не дйствителен';
    else isSuspended = 'Контракт действителен';
    return (

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
                                    <h1 className="to-animate">{contract.contract.name + ' ' + contract.contract.surname}</h1>
                                    <h2 className="to-animate">Agency: {agencyName}</h2>
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
                            <h2 className="to-animate">Interviews</h2>
                        </div>
                    </div>
                    <br/><br/>
                    <div className="row row-bottom-padded-sm">
                        {interviews.map(interview => (
                            <EmployeeInterview interview={interview} key={interview.id}/>
                        ))}
                    </div>
                    <br/><br/>
                </div>

            </section>

            <section id="fh5co-work" className="section section-6" data-section="work">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 section-heading text-center">
                            <h2 className="to-animate">Contracts</h2>
                        </div>
                    </div>
                    <br/><br/>
                    <div className="row row-bottom-padded-sm">
                        <div className="col-md-4 col-sm-6 ">
                            <a className="fh5co-project-item image-popup to-animate">
                                <div style={{
                                    color: "black",
                                    textAlign: 'left',
                                    paddingBottom: '20px',
                                    paddingLeft: '20px',
                                    paddingRight: '20px'
                                }}>
                                    <br/>
                                    <h6><b>{isSuspended}</b></h6>
                                    <h7> Дата создания контракта: {contract.contract.creationDate}</h7>
                                    <br/>
                                    <h7> Дата окончания контракта: {contract.contract.endDate}</h7>
                                    <br/>
                                    <h7> Статус контракта: {contractStatus}</h7>

                                </div>
                            </a>
                        </div>
                        <div className="clearfix visible-sm-block"/>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default EmployeePage;