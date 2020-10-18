import React, {useEffect, useState} from 'react';
import "../../cssForIndividualPage/animate.css";
import "../../cssForIndividualPage/icomoon.css";
import "../../cssForIndividualPage/simple-line-icons.css";
import "../../cssForIndividualPage/magnific-popup.css";
import "../../cssForIndividualPage/style.css";
import "../../startPage/SignIn.css";
import axios from "axios";
import authHeader from "../../auth/header";
import EmployerItem from "./EmployerItem";
import EmployerApplication from "./EmployerApplication";

const styles = {
    select100: {
        height: '62px',
        border: 'none',
        outline: 'none',
        marginBottom: '20px',
        position: 'relative',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '20px'
    },
    divEnterData: {
        marginBottom: '20px',
        position: 'relative',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '20px'
    },
    input: {
        fontSize: '16px',
        color: '#000000',
        lineHeight: '1.2',
        height: '62px',
        background: 'transparent',
        padding: '0 20px 0 23px'
    },
    span: {
        paddingBottom: '30px',
        display: 'block',
        fontSize: '30px',
        color: 'black',
        lineHeight: '1.2',
        textAlign: 'center'
    },
    button: {
        marginRight: 'auto',
        marginLeft: 'auto',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        width: '400px',
        paddingRight: '15px',
        paddingLeft: '15px',
        border: '3px solid white',
        borderRadius: '99px',
        fontSize: '2em',
        color: 'white',
        backgroundColor: 'transparent'
    },
    choiceButton: {
        display: 'none',
        fontFamily: 'sans-serif',
        border: '3px solid #17a2b8db',
        borderRadius: '99px',
        color: '#17a2b8db',
        backgroundColor: 'white'
    }
};


function request() {
    document.getElementById("request").style.display = "block";

}

function requestNone() {
    document.getElementById("request").style.display = "none";
}

function EmployerPage(props) {
    const lang = props.lang;
    let langConst = [];
    if (lang === 'en') {
        langConst.push('Request');
        langConst.push('Requests');
        langConst.push('Status');
        langConst.push('Contracts');
        langConst.push('Contract');
        langConst.push('Submit your application');
    } else {
        langConst.push('Заявка');
        langConst.push('Заявки');
        langConst.push('Статус');
        langConst.push('Контракты');
        langConst.push('Контракт');
        langConst.push('Подать заявку');
    }

    const id = 1;
    let isSuspended;
    const [contract, setContract] = useState({contract: []})
    const [professions, setProfessions] = useState({professions: []})

    const [applications, setApplications] = useState([])
    const [employer, setEmployer] = useState({employer: [], isLoading: true})

    useEffect(() => {
        getEmployer();
        getContract();
        getProfessions();
        getApplications();
    }, [])
    let agencyName = JSON.parse(localStorage.getItem('response')).agency.name;
    let personEmail = JSON.parse(localStorage.getItem('response')).email;
    const getEmployer = () => {
        axios
            .get("http://localhost:8080/employer/" + id, {headers: authHeader()})
            .then(data => {
                setEmployer({employer: data.data, isLoading: false})
            })
            .catch(err => alert(err))
    }

    const getContract = () => {
        axios
            .get("http://localhost:8080/employer-contract/" + id, {headers: authHeader()})
            .then(data => {
                setContract({contract: data.data})
            })
            .catch(err => alert(err))

    }
    const getProfessions = () => {
        axios
            .get("http://localhost:8080/profession/all", {headers: authHeader()})
            .then(data => {
                setProfessions({professions: data.data})
            })
            .catch(err => alert(err))

    }
    const getApplications = () => {
        axios
            .get("http://localhost:8080/employerApplication/all", {headers: authHeader()})
            .then(data => {
                setApplications(data.data)
            })
            .catch(err => alert(err))

    }

    const downloadContract = () => {
        axios
            .get("http://localhost:8080/employer-contract/download/1.docx", {headers: authHeader()})
            .then()
            .catch(err => alert(err))
    }
    if (contract.contract.isSuspended === true)
        isSuspended = 'Контракт приостановлен';
    else isSuspended = 'Контракт действителен';
    return (

        <div>

            <link
                href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600,400italic,700'
                rel='stylesheet' type='text/css'/>
            <div className=" section-0">

                <div className="wrap-login100" id="request" style={{
                    top: '80px', width: '360px', position: 'absolute', zIndex: '999',
                    margin: '0 0 0 -180px', left: '50%', display: 'none',
                    paddingLeft: '30px', paddingTop: '5px', paddingBottom: '30px', paddingRight: '30px'
                }}>

                    <form className="login100-form validate-form">
                        <div className="cl-btn-7" onClick={requestNone}/>
                        <EmployerApplication endDate={contract.contract.contractEndDate}/>
                    </form>

                </div>
                <div id="dropDownSelect1"/>
                <script src="../../jquery-3.2.1.min.js"/>
            </div>
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
                            <h2 className="to-animate">{langConst[1]}</h2>
                        </div>
                    </div>
                    <br/><br/>
                    <div className="row row-bottom-padded-sm">
                        {applications.map(app => (<EmployerItem app={app} key={app.id}/>))}
                    </div>
                    <br/><br/>
                    <button type="submit" className="btn-block  btn-primary"
                            style={styles.button} onClick={request}>{langConst[5]}</button>
                </div>

            </section>

            <section id="fh5co-work" className="section section-6" data-section="work">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 section-heading text-center">
                            <h2 className="to-animate">{langConst[4]}</h2>
                        </div>
                    </div>
                    <br/><br/>
                    <div className="row row-bottom-padded-sm">
                        <div>
                            <a className="fh5co-project-item image-popup to-animate" onClick={downloadContract}>
                                <div style={{
                                    color: "black",
                                    textAlign: 'left',
                                    paddingBottom: '20px',
                                    paddingLeft: '20px',
                                    paddingRight: '20px'
                                }}>
                                    <br/>
                                    <h6><b>{isSuspended}</b></h6>
                                    <h10> Дата создания контракта: {contract.contract.contractCreationDate}</h10>
                                    <br/>
                                    <h10> Дата окончания контракта: {contract.contract.contractEndDate}</h10>
                                    <br/>
                                    <h10> Тип контракта: {contract.contract.contractTypeId}</h10>

                                </div>
                            </a>
                        </div>
                        <div className="clearfix visible-sm-block"/>
                    </div>
                    <text>Нажмите на контракт для скачивания файла с подробным описанием</text>
                </div>
            </section>
        </div>

    )
}

export default EmployerPage;