import React, {useState} from 'react';
import "../../cssForIndividualPage/animate.css";
import "../../cssForIndividualPage/icomoon.css";
import "../../cssForIndividualPage/simple-line-icons.css";
import "../../cssForIndividualPage/magnific-popup.css";
import "../../cssForIndividualPage/style.css";
import 'react-datepicker/dist/react-datepicker.css'
import format from "date-fns/format";
import DatePicker from "react-datepicker"
import axios from "axios";
import {toast} from "react-toastify";
import {Notification} from "../AdminPage/components/Notification";


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
        // alignItems: 'center',
        zIndex: 100


    },

    nav: {
        backgroundColor: 'white',
        position: 'fixed',
        top: '0',
        right: '0',
        left: '0',
        zIndex: '1030'
    },
    span: {
        paddingBottom: '30px',
        display: 'block',
        fontSize: '30px',
        color: 'black',
        lineHeight: '1.2',
        textAlign: 'center'
    },
    divSign: {
        zIndex: '999',
        height: '500px',
        width: '600px',
        position: 'absolute',
        margin: '100px 0 0 -250px',
        left: '50%',
        display: 'block',
        paddingLeft: '30px',
        paddingRight: '10px',
        paddingTop: '5px',
        paddingBottom: '30px'
    },


    divEnterData: {
        marginBottom: '20px',
        position: 'relative',
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: '20px',
        paddingRight: '20px'
    },
    txt: {
        fontSize: '16px',
        lineHeight: '1.4',
        color: '#999999'
    }

}


export const ModalCreateReport = ({toggleModalIsOpen}) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate,setEndDate] = useState(new Date());


    console.log(format(startDate,'yyyy-MM-dd'));
    console.log(format(endDate,'yyyy-MM-dd'));
    const errorNotify = (error) => {
        toast.error(error, {position: toast.POSITION.TOP_RIGHT});
    }

    // const handleSubmit = event => {
    //     event.preventDefault()
    //     getReportPDF()
    // }
    const getReportPDF = () => {

        setAddPdfLoading(true);
        axios
            .get('http://localhost:8080/api/report/PDF?start='+format(startDate,'yyyy-MM-dd')+'&end='+format(endDate,'yyyy-MM-dd'), {responseType: 'arraybuffer'})
            .then((result) => {
                let file = new Blob([result.data], {type: 'application/pdf'});
                let fileURL = URL.createObjectURL(file);
                setAddPdfLoading(false)
                window.open(fileURL, '_blank', '');
                toggleModalIsOpen(false)
            })

            .catch((err) => {
                toggleModalIsOpen(false)
                setAddPdfLoading(false)
                console.log(err.response.data.error)
                errorNotify(err.response.data.error)})
    }
    const getReportPDFForAllPeriod = () => {

        setAddPdfLoading(true);
        axios
            .get('http://localhost:8080/api/report/PDF/all', {responseType: 'arraybuffer'})
            .then((result) => {
                let file = new Blob([result.data], {type: 'application/pdf'});
                let fileURL = URL.createObjectURL(file);
                setAddPdfLoading(false)
                window.open(fileURL, '_blank', '');
                toggleModalIsOpen(false)
            })

            .catch((err) => {
                toggleModalIsOpen(false)
                setAddPdfLoading(false)
                console.log(err.response.data.error)
                errorNotify(err.response.data.error)})
    }
    const [addPdfLoading, setAddPdfLoading] = useState(false);

    return (

        <div style={styles.popupFade}>
            {addPdfLoading &&
            <div style={styles.popupFade}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            }
            <link
                href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600,400italic,700'
                rel='stylesheet' type='text/css'/>
            <div className="wrap-login100 animate__animated animate__backInLeft " id="interviewForm"
                 style={styles.divSign}>
                <form className="login100-form validate-form" >
                    <Notification/>
                    {/*<div className="cl-btn-7"*/}
                    {/*     onClick={toggleModalIsOpen}*/}
                    {/*/>*/}
                    <br/>
                    <span style={styles.span}>
					            Report criteria
                    </span>
                    <div style={{display: 'flex'}}>
                        <div style={styles.divEnterData}>


                            <DatePicker selected={startDate} onChange={date => setStartDate(date)}/>
                            <span className="focus-input100"/>
                        </div>
                        <div style={styles.divEnterData}>


                            <DatePicker selected={endDate} onChange={date => setEndDate(date)}/>
                            <span className="focus-input100"/>
                        </div>
                    </div>

                    <p style={{marginTop:"20px"}}>
                                <p>  Information! </p>
                        We will generate a profit report for the time you
                        specified in .pdf format, if you need a report in .xls
                        format return to the main menu and click "Create report .xls"
                    </p>

                </form>
                <div style={{display: 'flex',marginTop:'100px'}}>
                    <div className="container-login100-form-btn">
                        <button className="login100-form-btn"
                           onClick={getReportPDF}
                        >
                            Create
                        </button>
                    </div>
                    <div className="container-login100-form-btn">
                        <button type='button'
                                className="login101-form-btn"
                                onClick={getReportPDFForAllPeriod}
                        >
                            Get for all period
                        </button>
                    </div>
                    <div className="container-login100-form-btn">
                        <button type='button'
                                className="login101-form-btn"
                                onClick={toggleModalIsOpen}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
