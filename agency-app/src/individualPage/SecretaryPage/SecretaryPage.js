import React, {useEffect, useState} from 'react';
import "../../cssForIndividualPage/animate.css";
import "../../cssForIndividualPage/icomoon.css";
import "../../cssForIndividualPage/simple-line-icons.css";
import "../../cssForIndividualPage/magnific-popup.css";
import "../../cssForIndividualPage/style.css";
import axios from "axios";
import authHeader from "../../auth/header";

const styles = {
    input: {
        fontSize: '16px',
        color: '#000000',
        lineHeight: '1.2',
        height: '62px',
        background: 'transparent',
        padding: '0 20px 0 23px'
    },
    divEnterData: {
        marginBottom: '20px',
        position: 'relative',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '20px'
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
        textAlign: 'left',
        fontFamily: 'sans-serif',
        width: '100%',
        paddingRight: '15px',
        paddingLeft: '15px',
        border: '1px solid white',
        borderRadius: '5px',
        fontSize: '1.5em',
        color: 'white',
        backgroundColor: 'transparent'
    },
    tableButton: {
        marginRight: 'auto',
        marginLeft: 'auto',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        width: '100%',
        paddingRight: '5px',
        paddingLeft: '5px',
        border: '1px solid black',
        borderRadius: '5px',
        color: 'black',
        backgroundColor: 'transparent'
    },
    popUp: {
        top: '410px',
        width: '90%',
        position: 'absolute',
        zIndex: '999',
        margin: '0 0 0 -45%',
        left: '50%',
        display: 'none',
        paddingLeft: '30px',
        paddingTop: '5px',
        paddingBottom: '10px',
        paddingRight: '30px'
    },
    smallPopUp: {
        top: '80px',
        width: '80%',
        position: 'absolute',
        zIndex: '999',
        margin: '0 0 0 -40%',
        left: '50%',
        display: 'none',
        paddingLeft: '30px',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingRight: '30px'
    }
}


function SecretaryPage() {
    const agencyName = JSON.parse(localStorage.getItem('response')).agency.name;
    const personEmail = JSON.parse(localStorage.getItem('response')).email;

    const [applications, setApplications] = useState({applications: []})
    const [employeeContracts, setEmployeeContracts] = useState({employeeContracts: []})
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getApplications();
        getEmployeeContracts();
    }, [])
    const getApplications = () => {
        axios
            .get("http://localhost:8080/employerApplication/getAllByStatus/" + 'NOT-REVIEWED', {headers: authHeader()})
            .then(data => {
                setApplications({applications: data.data})
                setLoading(false)
            })
            .catch(err => alert(err))

    }
    const getEmployeeContracts = () => {
        axios
            .get("http://localhost:8080/employeeContract/getAllByStatus/" + 'NOT-REVIEWED', {headers: authHeader()})
            .then(data => {
                console.log(data.data)
                setEmployeeContracts({employeeContracts: data.data})
                setLoading(false)
            })
            .catch(err => alert(err))

    }

    const [thisApp, setThisApp] = useState([])
    const getApp = (appId) => {
        axios
            .get("http://localhost:8080/employerApplication/" + appId, {headers: authHeader()})
            .then(data => {
                setThisApp(data.data)
            })
            .catch(err => alert(err))

    }
    const [thisContr, setThisContr] = useState([])
    const getContr = (contrId) => {
        axios
            .get("http://localhost:8080/employeeContract/" + contrId, {headers: authHeader()})
            .then(data => {
                setThisContr(data.data)
            })
            .catch(err => alert(err))

    }

    const updateApp = (idApp, newStatus) => {
        axios
            .put('http://localhost:8080/employerApplication/change-status/' + idApp + "/" + newStatus, null, {headers: authHeader()})
            .then()
            .catch((err) => alert(err))
    }

    const updateAllApp = (app) => {
        axios
            .put('http://localhost:8080/employerApplication/edit', app, {headers: authHeader()})
            .then()
            .catch((err) => alert(err))
    }

    const updateContr = (idContr, newStatus) => {
        axios
            .put('http://localhost:8080/employeeContract/change-status/' + idContr + "/" + newStatus, null, {headers: authHeader()})
            .then()
            .catch((err) => alert(err))
    }

    const updateAllContr = (contr) => {
        axios
            .put('http://localhost:8080/employeeContract/edit', contr, {headers: authHeader()})
            .then()
            .catch((err) => alert(err))
    }
    const sendEmail = (subject, message) => {
        setLoading(true)
        const email = ['mariaz_email@mail.ru', subject, message]
        axios
            .post('http://localhost:8080/email/send', email, {headers: authHeader()})
            .then(() => {
                setLoading(false)
            })
            .catch((err) => alert(err))
    }

    if (loading) {
        return (
            <div className="spinner-border text-primary spinner" role="status">
                <span className="sr-only">Loading...</span>
                <br/><br/>
            </div>
        )
    }
    let appId;
    let application;
    let contract;
    let contrId;
    let index = 1;
    let index2 = 1;
    return (
        <div>
            <link
                href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600,400italic,700'
                rel='stylesheet' type='text/css'/>

            <div className="wrap-login100" id="application" style={styles.smallPopUp}>

                <form className="login100-form validate-form">
                    <div className="cl-btn-7" onClick={function () {
                        // updateApp(appId, "NOT-REVIEWED");
                        document.getElementById("application").style.display = "none";
                    }}/>
                    <br/>
                    <span className="login100-form-title p-b-37"
                          style={styles.span}>Не рассмотренные заявки работодателей</span>

                    <div style={styles.divEnterData}>
                        <input type="text" style={styles.input} value='Тип занятости: ' readOnly="readOnly"/>
                        <input type="text" style={styles.input} id='appEmploymentTypeName' value=''
                               readOnly="readOnly"/>
                        <span className="focus-input100"/>
                    </div>
                    <div style={styles.divEnterData}>
                        <input type="text" style={styles.input} value={"Зарплата: "} readOnly="readOnly"/>
                        <input type="text" style={styles.input} id='appSalary' value='' readOnly="readOnly"/>
                        <span className="focus-input100"/>
                    </div>
                    <div style={styles.divEnterData}>
                        <input type="text" style={styles.input} value={'Специальность: '} readOnly="readOnly"/>
                        <input type="text" style={styles.input} id='appProfession' value='' readOnly="readOnly"/>
                        <span className="focus-input100"/>
                    </div>
                    <div style={styles.divEnterData}>
                        <input type="text" style={styles.input} value={"Необходимый опыт: "} readOnly="readOnly"/>
                        <input type="text" style={styles.input} id='appExperience' value='' readOnly="readOnly"/>
                        <span className="focus-input100"/>
                    </div>
                    <div style={styles.divEnterData}>
                        <input type="text" style={styles.input} value={'Возрастные ограничения: '} readOnly="readOnly"/>
                        <input type="text" style={styles.input} id='appAge' value='' readOnly="readOnly"/>
                        <span className="focus-input100"/>
                    </div>
                    <div style={styles.divEnterData}>
                        <input type="text" style={styles.input} value={'Локация: '} readOnly="readOnly"/>
                        <input type="text" style={styles.input} id='appLocation' value='' readOnly="readOnly"/>
                        <span className="focus-input100"/>
                    </div>
                    <div className="container-login100-form-btn">
                        <button type='button' className="login100-form-btn"
                                style={{marginRight: '20px', marginBottom: '10px'}}
                                onClick={function () {
                                    document.getElementById('application').style.display = "none";
                                    // if () {
                                    //     updateApp(appId, "ACCEPTED");
                                    //     sendEmail('Ваша заявка одобрена', 'Здравствуйте! Ваша заявка номер ' + appId + ' о поиске соискателя ' +
                                    //         'одобрена. Стоимость услуг: ' + document.getElementById('cost').value + '. ' +
                                    //         'Подтвердите согласие в вашем личном кабинете.');
                                    // } else
                                    document.getElementById('appOk').style.display = "block";
                                }}>Принять заявку
                        </button>
                        <button type='button' className="login100-form-btn"
                                style={{marginRight: '20px', marginBottom: '10px'}}
                                onClick={function () {
                                    document.getElementById('application').style.display = "none";
                                    document.getElementById('appNotOk').style.display = "block";
                                }}>Отказать в заявке
                        </button>
                    </div>
                </form>
            </div>

            <div className="wrap-login100" id='appOk' style={styles.popUp}>
                <form className="login100-form validate-form">
                    <div className="cl-btn-7" onClick={function () {
                        //updateApp(appId, "NOT-REVIEWED");
                        document.getElementById("appOk").style.display = "none";
                    }}/>
                    <br/>
                    <span className="login100-form-title p-b-37" style={styles.span}>Назначить стоимость услуг:</span>
                    <div style={styles.divEnterData}>
                        <input className="input100" id="cost" type="text" style={styles.input}
                               placeholder='Введите стоимсть'/>
                        <span className="focus-input100"/>
                    </div>
                    <div className="container-login100-form-btn">
                        <button type='button' className="login100-form-btn" onClick={function () {

                            application.id = appId;
                            application.statusName = "ACCEPTED";
                            application.price = document.getElementById('cost').value;
                            updateAllApp(application);
                            //updateApp(appId, "ACCEPTED");
                            sendEmail('Ваша заявка одобрена', 'Здравствуйте! Ваша заявка номер ' + appId + ' о поиске соискателя ' +
                                'одобрена. Стоимость услуг: ' + document.getElementById('cost').value + '. ' +
                                'Подтвердите согласие в вашем личном кабинете.');
                            document.getElementById('appOk').style.display = 'none';
                        }}>Принять заявку
                        </button>
                        <br/>
                    </div>
                </form>
            </div>
            <div className="wrap-login100" id='appNotOk' style={styles.popUp}>
                <form className="login100-form validate-form">
                    <div className="cl-btn-7" onClick={function () {
                        //updateApp(appId, "NOT-REVIEWED");
                        document.getElementById("appNotOk").style.display = "none";
                    }}/>
                    <br/>
                    <span className="login100-form-title p-b-37" style={styles.span}>Отказ в заявке:</span>
                    <div style={styles.divEnterData}>
                        <input className="input100" type="text" style={styles.input} id='rejectionReason'
                               placeholder='Введите причину отказа'/>
                        <span className="focus-input100"/>
                    </div>
                    <div className="container-login100-form-btn">
                        <button type='button' className="login100-form-btn" onClick={function () {
                            updateApp(appId, "REJECTED");
                            sendEmail('Ваша заявка отклонена', 'Здравствуйте! Ваша заявка номер ' + appId + ' о поиске соискателя ' +
                                'отклонена по следующей причине: ' + document.getElementById('rejectionReason').value);
                            document.getElementById('appNotOk').style.display = 'none';
                        }}>Отказать в заявке
                        </button>
                        <br/>
                    </div>
                </form>
            </div>


            <div className="wrap-login100" id="searchApplication" style={styles.popUp}>

                <form className="login100-form validate-form">
                    <div className="cl-btn-7" onClick={function () {
                        document.getElementById("searchApplication").style.display = "none";
                    }}/>
                    <br/>
                    <span className="login100-form-title p-b-37" style={styles.span}>Employers applications were not considered</span>
                    <br/>
                    <table className="table list">
                        <thead style={{
                            color: 'white', backgroundColor: '#17a2b8db', border: '1px solid transparent',
                            borderRadius: '5px',
                        }}>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Creation date</th>
                            <th scope="col">Profession</th>
                            <th scope="col">Check</th>
                        </tr>
                        </thead>
                        <tbody>
                        {applications.applications.map(app => (

                            <tr key={app.id}>
                                <th scope="row">{index++}</th>
                                <td>{app.creationDate}</td>
                                <td>{app.professionName}</td>
                                <td>
                                    <button type='button' style={styles.tableButton} onClick={
                                        function () {
                                            document.getElementById("searchApplication").style.display = "none";
                                            //updateApp(app.id, "CONSIDERED");
                                            application = app;
                                            appId = app.id;
                                            document.getElementById("appEmploymentTypeName").value = app.employmentTypeName;
                                            document.getElementById("appSalary").value = app.salary;
                                            document.getElementById("appProfession").value = app.professionName;
                                            document.getElementById("appExperience").value = app.experience;
                                            document.getElementById("appAge").value = app.ageRestriction;
                                            document.getElementById("appLocation").value = app.countryName + ', ' + app.cityName;
                                            document.getElementById("application").style.display = 'block';
                                        }}>Рассмотреть
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </form>
            </div>


            <div className="wrap-login100" id="employeeContr" style={styles.smallPopUp}>

                <form className="login100-form validate-form">
                    <div className="cl-btn-7" onClick={function () {
                        //updateApp(appId, "NOT-REVIEWED");
                        document.getElementById("employeeContr").style.display = "none";
                    }}/>
                    <br/>
                    <span className="login100-form-title p-b-37"
                          style={styles.span}>Не рассмотренные заявки соискателей</span>

                    <div style={styles.divEnterData}>
                        <input type="text" style={styles.input} value='Name: ' readOnly="readOnly"/>
                        <input type="text" style={styles.input} id='contrNameSurname' value=''
                               readOnly="readOnly"/>
                        <span className="focus-input100"/>
                    </div>
                    <div style={styles.divEnterData}>
                        <input type="text" style={styles.input} value={"Min salary: "} readOnly="readOnly"/>
                        <input type="text" style={styles.input} id='contrSalary' value='' readOnly="readOnly"/>
                        <span className="focus-input100"/>
                    </div>
                    <div style={styles.divEnterData}>
                        <input type="text" style={styles.input} value={'Profession: '} readOnly="readOnly"/>
                        <input type="text" style={styles.input} id='contrProfession' value='' readOnly="readOnly"/>
                        <span className="focus-input100"/>
                    </div>
                    <div style={styles.divEnterData}>
                        <input type="text" style={styles.input} value={"Experience: "} readOnly="readOnly"/>
                        <input type="text" style={styles.input} id='contrExperience' value='' readOnly="readOnly"/>
                        <span className="focus-input100"/>
                    </div>
                    <div style={styles.divEnterData}>
                        <input type="text" style={styles.input} value={'Age: '} readOnly="readOnly"/>
                        <input type="text" style={styles.input} id='contrAge' value='' readOnly="readOnly"/>
                        <span className="focus-input100"/>
                    </div>
                    <div style={styles.divEnterData}>
                        <input type="text" style={styles.input} value={'Локация: '} readOnly="readOnly"/>
                        <input type="text" style={styles.input} id='contrLocation' value='' readOnly="readOnly"/>
                        <span className="focus-input100"/>
                    </div>
                    <div className="container-login100-form-btn">
                        <button type='button' className="login100-form-btn"
                                style={{marginRight: '20px', marginBottom: '10px'}}
                                onClick={function () {
                                    document.getElementById('employeeContr').style.display = "none";
                                    document.getElementById('contractOk').style.display = "block";
                                }}>Принять заявку
                        </button>
                        <button type='button' className="login100-form-btn"
                                style={{marginRight: '20px', marginBottom: '10px'}}
                                onClick={function () {
                                    document.getElementById('employeeContr').style.display = "none";
                                    document.getElementById('contractNotOk').style.display = "block";
                                }}>Отказать в заявке
                        </button>
                    </div>
                </form>
            </div>

            <div className="wrap-login100" id='contractOk' style={styles.popUp}>
                <form className="login100-form validate-form">
                    <div className="cl-btn-7" onClick={function () {
                        //updateApp(appId, "NOT-REVIEWED");
                        document.getElementById("contractOk").style.display = "none";
                    }}/>
                    <br/>
                    <span className="login100-form-title p-b-37" style={styles.span}>Назначить стоимость услуг:</span>
                    <div style={styles.divEnterData}>
                        <input className="input100" id="costContr" type="text" style={styles.input}
                               placeholder='Введите стоимсть'/>
                        <span className="focus-input100"/>
                    </div>
                    <span className="login100-form-title p-b-37" style={styles.span}>Назначить компенсацию:</span>
                    <div style={styles.divEnterData}>
                        <input className="input100" id="compensationContr" type="text" style={styles.input}
                               placeholder='Введите компенсацию'/>
                        <span className="focus-input100"/>
                    </div>
                    <div className="container-login100-form-btn">
                        <button type='button' className="login100-form-btn" onClick={function () {

                            contract.id = contrId;
                            contract.statusId = 4;
                            //contract.statusId = "ACCEPTED";
                            contract.account_usd = document.getElementById('costContr').value;
                            contract.compensation = document.getElementById('compensationContr').value;
                            updateAllContr(contract);
                            //updateContr(contrId, "ACCEPTED");
                            sendEmail('Ваша заявка одобрена', 'Здравствуйте! Ваша заявка на контракт номер ' + contrId + ' о поиске работы ' +
                                'одобрена. Стоимость услуг: ' + document.getElementById('costContr').value + '. ' +
                                'Компенсация в случае не найденной работы:' + document.getElementById('compensationContr').value + '. В случае согласия, обратитесь в наш офис для заключения контракта.');
                            document.getElementById('contractOk').style.display = 'none';
                        }}>Принять заявку
                        </button>
                        <br/>
                    </div>
                </form>
            </div>
            <div className="wrap-login100" id='contractNotOk' style={styles.popUp}>
                <form className="login100-form validate-form">
                    <div className="cl-btn-7" onClick={function () {
                        //updateApp(appId, "NOT-REVIEWED");
                        document.getElementById("contractNotOk").style.display = "none";
                    }}/>
                    <br/>
                    <span className="login100-form-title p-b-37" style={styles.span}>Отказ в заявке:</span>
                    <div style={styles.divEnterData}>
                        <input className="input100" type="text" style={styles.input} id='rejectionReason'
                               placeholder='Введите причину отказа'/>
                        <span className="focus-input100"/>
                    </div>
                    <div className="container-login100-form-btn">
                        <button type='button' className="login100-form-btn" onClick={function () {
                            updateApp(appId, "REJECTED");
                            sendEmail('Ваша заявка на контракт отклонена', 'Здравствуйте! Ваша заявка на контракт номер ' + contrId + ' о поиске работы ' +
                                'отклонена по следующей причине: ' + document.getElementById('rejectionReason').value);
                            document.getElementById('contractNotOk').style.display = 'none';
                        }}>Отказать в заявке
                        </button>
                        <br/>
                    </div>
                </form>
            </div>

            <div className="wrap-login100" id="searchEmployeeContracts" style={styles.popUp}>
                <form className="login100-form validate-form">
                    <div className="cl-btn-7" onClick={function () {
                        document.getElementById("searchEmployeeContracts").style.display = "none";
                    }}/>
                    <br/>
                    <span className="login100-form-title p-b-37" style={styles.span}>View not reviewed applications from employers</span>
                    <br/>
                    <table className="table list">
                        <thead style={{
                            color: 'white', backgroundColor: '#17a2b8db', border: '1px solid transparent',
                            borderRadius: '5px',
                        }}>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Employee name</th>
                            <th scope="col">Profession id</th>
                            <th scope="col">Check</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employeeContracts.employeeContracts.map(contr => (

                            <tr key={contr.id}>
                                <th scope="row">{index2++}</th>
                                <td>{contr.name + ' ' + contr.surname}</td>
                                <td>{contr.professionId}</td>
                                <td>
                                    <button type='button' style={styles.tableButton} onClick={
                                        function () {
                                            document.getElementById("searchEmployeeContracts").style.display = "none";
                                            //updateContr(contr.id, "CONSIDERED");
                                            contrId = contr.id;
                                            contract = contr;
                                            document.getElementById("contrNameSurname").value = contr.name + " " + contr.surname;
                                            document.getElementById("contrSalary").value = contr.salary;
                                            document.getElementById("contrProfession").value = contr.professionId;
                                            document.getElementById("contrExperience").value = contr.experienceId;
                                            document.getElementById("contrAge").value = Date.now() - contr.birthDate;
                                            document.getElementById("contrLocation").value = contr.cityId;
                                            document.getElementById("employeeContr").style.display = 'block';
                                        }}>Рассмотреть
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </form>
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
                                    <h1 className="to-animate">Secretary</h1>
                                    <h2 className="to-animate"> Agency: {agencyName}</h2>
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
                            <h2 className="to-animate">Choose an action</h2>
                        </div>
                    </div>
                    <br/><br/>
                    <button type="submit" className="btn-block  btn-primary"
                            style={styles.button} onClick={function () {
                        document.getElementById("searchApplication").style.display = "block";
                    }}>1. Просмотреть не рассмотренные заявки работодателей
                    </button>
                    <button type="submit" className="btn-block  btn-primary"
                            style={styles.button} onClick={function () {
                        document.getElementById("searchEmployeeContracts").style.display = "block";
                    }}>2. Просмотреть не рассмотренные заявки соискателей
                    </button>
                </div>

            </section>
        </div>

    )
}

export default SecretaryPage;