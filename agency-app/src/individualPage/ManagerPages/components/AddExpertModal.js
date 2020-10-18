import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.min.css'
import "../../../cssForIndividualPage/animate.css";
import "../../../cssForIndividualPage/icomoon.css";
import "../../../cssForIndividualPage/simple-line-icons.css";
import "../../../cssForIndividualPage/magnific-popup.css";
import "../../../cssForIndividualPage/style.css";
import axios from "axios";
import authHeader from "../../../auth/header";
import {toast} from "react-toastify";
import {Notification} from "../../AdminPage/components/Notification"

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
        zIndex: 1000
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
        alignItems: 'center',
        flexDirection: 'column'

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
        border:'none',
        outline:'none',
        marginBottom: '20px',
        position: 'relative',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '20px'
    },
    option100:{
        border:'20px solid #ffffff',
        outline:'none',
    }
}

export const AddExpertModal = ({onModalCloseClick, getExperts}) => {

    const [expert, setExpert] = useState({agencyId: JSON.parse(localStorage.getItem('response')).agency.id})
    const handleInputChange = event => {
        const {name, value} = event.currentTarget
        setExpert({...expert, [name]: value});

    }

    const createExpert = () => {
        onModalCloseClick();
        axios
            .post("http://localhost:8080/expert", expert, {headers: authHeader()})
            .then(data => {
                toast.success("Expert has been added", {position: toast.POSITION.TOP_RIGHT})
                getExperts();
            })
            .catch(err => toast.error("Expert hasn't been added. Smth goes wrong", {position: toast.POSITION.TOP_RIGHT})
            )
    }
    return (
        <div>
            <Notification/>
        <div style={styles.popupFade} >

            <link
                href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600,400italic,700'
                rel='stylesheet' type='text/css'/>
            <div className="animate__animated animate__backInLeft wrap-login100"  id="interviewForm" style={styles.divSign}>

                <form className="login100-form validate-form "  >
                    <button className="cl-btn-7" onClick={onModalCloseClick} />
                    <br/>
                    <span style={styles.span}>
					             ADD EXPERT
                    </span>


                    <div style={styles.divEnterData} >
                        <input className="input100" type="email" style={styles.input}
                               name="email"
                               placeholder="Email"
                               onChange={handleInputChange}
                        />
                        <span className="focus-input100"/>
                    </div>

                    <div style={styles.divEnterData} >
                        <input className="input100" type="text" style={styles.input}
                               name="expertName"
                               placeholder="Expert full name"
                               onChange={handleInputChange}
                        />
                        <span className="focus-input100"/>
                    </div>

                    <br/>
                </form>
                <div className="container-login100-form-btn">
                    <button className="login100-form-btn"  onClick={createExpert} >
                        Save
                    </button>
                </div>

            </div>
        </div>
        </div>
    )

}