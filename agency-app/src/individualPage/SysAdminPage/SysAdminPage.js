import React, {useEffect, useState} from "react";
import {ModalSysAdmin} from "./ModalSysAdmin";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css'
import axios from "axios";
import authHeader from "../../auth/header";
import {toast} from "react-toastify";
import {Notification} from "../AdminPage/components/Notification";
import {saveAs} from 'file-saver';
import {ModalCreateReport} from "./ModalCreateReport";


const styles = {
    popupFade: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
    },
    img: {
        width: '100px'
    },
    a: {
        display: 'inline-block',
        color: 'black'
    },
    nav: {
        backgroundColor: 'aqua',
        position: 'fixed',
        top: '0',
        right: '0',
        left: '0',
    },
    span: {
        paddingBottom: '30px',
        display: 'flex',
        fontSize: '30px',
        color: 'black',
        lineHeight: '1.2',
        textAlign: 'center'
    },
    divSign: {
        paddingTop: '0px',
        marginTop: '5%',
        backgroundColor: 'white',
        width: '30%',
        height: '85%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    divFacebookGoogle: {
        display: 'flex',
        justifyContent: 'center'
    },
    divEnterData: {
        marginBottom: '20px',
        position: 'relative',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '20px'
    },
    txt: {
        fontSize: '16px',
        lineHeight: '1.4',
        color: '#999999'
    },
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
    option100: {
        border: '20px solid #ffffff',
        outline: 'none',
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
    }
}
export const SysAdminPage = () => {
    let personEmail = JSON.parse(localStorage.getItem('response')).email;
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [allAgencies, setAllAgencies] = useState([]);
    const [allCountries, setAllCountries] = useState([]);
    const [allCities, setAllCities] = useState([]);
    const [idForEditing, setForEditing] = useState();
    const [loading, setLoading] = useState(true);
    const [pdfFileLoading, setPdfFileLoading] = useState(false);
    const [xlsFileLoading, setXlsFileLoading] = useState(false);
    const [modalIsOpen,setModalIsOpen]=useState(false);

    const toggleModalIsOpen = () => setModalIsOpen(!modalIsOpen);




    const toggleShowModal = () => setShowModal(!showModal);
    const toggleShowEditModal = () => setEditing(!editing);
    useEffect(() => {
        getAllAgencies();
        getAllCountries();
        getAllCities();
    }, []);

    const getAllAgencies = () => {

        axios
            .get('http://localhost:8080/api/agency', {headers: authHeader()})
            .then((data) => {
                setAllAgencies(data.data)
                setLoading(false);
            })
            .catch((err) => errorNotify(err.response.data.error))
    };
    const getAllCountries = () => {
        axios
            .get('http://localhost:8080/api/country', {headers: authHeader()})
            .then((data) => setAllCountries(data.data))
            .catch((err) => errorNotify(err.response.data.error))
    };
    const getAllCities = () => {
        axios
            .get('http://localhost:8080/api/city', {headers: authHeader()})
            .then((data) => setAllCities(data.data))
            .catch((err) => errorNotify(err.response.data.error))
    };

    const getCitiesByCountryId = (countryId) => {
        axios
            .get('http://localhost:8080/api/city/' + countryId, {headers: authHeader()})
            .then((data) => {
                setAllCities(data.data)
            })
            .catch((err) => errorNotify(err.response.data.error))
    };


    const saveAgency = (agency) => {
        setAddAgencyLoading(true);
        axios
            .post('http://localhost:8080/api/agency', agency, {headers: authHeader()})
            .then((result) => {
                setAddAgencyLoading(false);
                setAllAgencies([...allAgencies, result.data])
                successNotify("Agency  created successfully " + result.data.name);
            })

            .catch((err) => {
                setAddAgencyLoading(false);
                errorNotify(err.response.data.error)})
    };

    const getReportPDF = () => {
        setPdfFileLoading(true);

        axios
            .get('http://localhost:8080/api/report/PDF', {responseType: 'arraybuffer'})
            .then((result) => {
                let file = new Blob([result.data], {type: 'application/pdf'});
                let fileURL = URL.createObjectURL(file);
                window.open(fileURL, '_blank', '');
                setPdfFileLoading(false);

            })

            .catch((err) => {
                setPdfFileLoading(false);

                errorNotify(err.response.data.error)})
    }
    const getReportXls = () => {
        setXlsFileLoading(true)
        axios
            .get('http://localhost:8080/api/report/XLS', {responseType: 'arraybuffer'})
            .then((result) => {
                let file = new Blob([result.data], {type: 'application/xls'});
                // let fileURL = URL.createObjectURL(file);
                saveAs(file, "agenciesPaymentReport.xls");
                // window.open(fileURL, '_blank', '');
                setXlsFileLoading(false);
            })

            .catch((err) => errorNotify(err.response.data.error))


    }
    const updateAgency = (agency) => {
        axios
            .put('http://localhost:8080/api/agency', agency, {headers: authHeader()})
            .then((result) => {
                setAllAgencies(allAgencies.map(agency => (agency.id === result.data.id ? result.data : agency)))
                successNotify("Agency  updated successfully");
            })
            .catch((err) => errorNotify(err.response.data.error))
    };
    /*!*/
    const deleteAgency = (id) => {
        axios
            .delete('http://localhost:8080/api/agency/' + id, {headers: authHeader()})
            .then((result) => {
                setAllAgencies(allAgencies.map(agency => (agency.id === id ? result.data : agency)))
                successNotify("Agency deactivated successfully")
            })
            .catch((err) => errorNotify(err.response.data.error))
    };


    const addAgency = (agency) => {
        console.log(agency);
        saveAgency(agency);

    }
    const errorNotify = (error) => {
        toast.error(error, {position: toast.POSITION.TOP_RIGHT});
    }
    const successNotify = (message) => {
        toast.success(message, {position: toast.POSITION.TOP_RIGHT});
    }
    const warnEnterAllFieldsNotify = (message) => {
        toast.warn(message, {position: toast.POSITION.TOP_RIGHT});
    }

    const editAgency = (id) => {
        setForEditing(id);
        toggleShowEditModal()
    }
    const [addAgencyLoading, setAddAgencyLoading] = useState(false);

    return (

        <div>
            {modalIsOpen && <ModalCreateReport toggleModalIsOpen={toggleModalIsOpen}/>}

            {addAgencyLoading &&
            <div style={styles.popupFade}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            }
            <div>
                <link
                    href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600,400italic,700'
                    rel='stylesheet' type='text/css'/>
                <section id="fh5co-home" className="section section-6" data-section="home"
                         style={{backgroundImage: 'url(images/full_image_2.jpg)', paddingTop: '20px'}}
                         data-stellar-background-ratio="0.5">
                    <Notification/>
                    <div className="gradient"/>
                    <div className="container">
                        <div className="text-wrap">
                            <div className="text-inner">
                                <div className="row">
                                    <div className="col-md-8"
                                         style={{marginLeft: 'auto', marginRight: 'auto', textAlign: 'left'}}>
                                        <h1 className="to-animate">SYSADMIN</h1>
                                        <h2 className="to-animate"> Email: {personEmail}</h2>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            {
                showModal &&
                <ModalSysAdmin closeModal={toggleShowModal} submitHandler={addAgency}
                               getCitiesByCountryId={getCitiesByCountryId}
                               allCountries={allCountries}
                               allCities={allCities}
                               warnEnterAllFieldsNotify={warnEnterAllFieldsNotify}
                               errorNotify={errorNotify}
                               buttonName={'Create'}


                />
            }
            {
                editing &&
                <ModalSysAdmin closeModal={toggleShowEditModal} submitHandler={updateAgency}
                               getCitiesByCountryId={getCitiesByCountryId}
                               allCountries={allCountries}
                               allCities={allCities}
                               id={idForEditing}
                               warnEnterAllFieldsNotify={warnEnterAllFieldsNotify}
                               errorNotify={errorNotify}
                               deleteAgency={deleteAgency}
                               buttonName={'Update'}


                />
            }


            <section id="fh5co-work" className="section section-6" data-section="work">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 section-heading text-center">
                            <h2 className="to-animate">Agencies</h2>
                        </div>
                    </div>
                    <br/><br/>
                    {loading &&

                    <div className="spinner-border text-primary spinner" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    }
                    <div className="row row-bottom-padded-sm">

                        {allAgencies.map(agency =>

                            <div className="col-md-4 col-sm-6" key={agency.id}>
                                <a className="fh5co-project-item image-popup to-animate"
                                   onClick={() => editAgency(agency.id)}>
                                    <div className="fh5co-text">
                                        <h2 style={{color: "black"}}>{agency.name}</h2>
                                        <span>Deposit: {agency.deposit}</span>
                                        <br/>
                                        <span>Active: {agency.isDeleted ? ' Not active' : 'active'} </span>
                                    </div>
                                </a>
                            </div>
                        )}


                        <div className="clearfix visible-sm-block"/>
                    </div>
                    <br/><br/>
                    <button type="button" className="btn-block  btn-primary" onClick={toggleShowModal}
                            style={styles.button}>Add agency
                    </button>
                    <br/>
                    <div style={{display: 'flex'}}>
                        <button type="button" className="btn-block  btn-primary"
                                // onClick={getReportPDF}
                            onClick={toggleModalIsOpen}
                                style={styles.button}>
                            {pdfFileLoading && (
                                <span className="spinner-border spinner-border-sm"/>
                            )}
                            Create report .pdf
                        </button>
                        <button type="button" className="btn-block  btn-primary"
                                onClick={getReportXls}
                                style={styles.button}>
                            {xlsFileLoading && (
                                <span className="spinner-border spinner-border-sm"/>
                            )}
                            Create report .xls
                        </button>
                    </div>
                    {/*<DatePicker selected={startDate} onChange={date => setStartDate(date)} />*/}
                </div>

            </section>


        </div>


    )
    // return (
    //     <div className='container' style={{backgroundColor:"white"}}>
    //             <p>SysAdmin</p>
    //     </div>
    // );
};

