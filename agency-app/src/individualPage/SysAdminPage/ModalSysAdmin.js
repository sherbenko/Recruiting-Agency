import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.min.css'
import "../../cssForIndividualPage/animate.css";
import "../../cssForIndividualPage/icomoon.css";
import "../../cssForIndividualPage/simple-line-icons.css";
import "../../cssForIndividualPage/magnific-popup.css";
import "../../cssForIndividualPage/style.css";


import axios from "axios";
import authHeader from "../../auth/header";
import {toast} from "react-toastify";
import {Notification} from "../AdminPage/components/Notification";
import validator from "validator/es";

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
    input: {
        fontSize: '16px',
        color: '#000000',
        lineHeight: '1.2',
        height: '25px',
        background: 'transparent',
        padding: '0 20px 0 23px'
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
        paddingBottom: '5px',
        display: 'flex',
        fontSize: '15px',
        color: 'black',
        lineHeight: '1.0',
        textAlign: 'left'
    },
    divSign: {
        paddingTop: '0px',
        marginTop: '5%',
        backgroundColor: 'white',
        width: '500px',
        height: '88%',
        marginBottom: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },


    divEnterData: {
        marginBottom: '20px',
        position: 'relative',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '20px',

    },
    divEnterDataError: {
        marginBottom: '20px',
        position: 'relative',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '20px',
        borderColor: 'red',
        borderStyle: "solid",
        borderWidth: "1px"
    },

    txt: {
        fontSize: '16px',
        lineHeight: '1.4',
        color: '#999999'
    },
    select100: {
        height: '45px',
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
    divFacebookGoogle: {
        display: 'flex',
        justifyContent: 'center'
    }
}

export const ModalSysAdmin = ({
                                  closeModal, submitHandler, getCitiesByCountryId, allCountries,
                                  allCities, buttonName, id, warnEnterAllFieldsNotify, errorNotify, deleteAgency
                              }) => {

    const initialFormState = {
        id: null,
        name: '',
        cityId: '',
        countryId: '',
        addressId: '',
        street: "",
        building: "",
        apartment: "",
        regularPayment: "",
        deposit: ""

    };


    const [agency, setAgency] = useState(initialFormState);

    useEffect(() => {
        if (id) {
            getAgencyById(id)
        }
    }, [id]);

    const getAgencyById = (agencyId) => {
        axios
            .get('http://localhost:8080/api/agency/' + agencyId, {headers: authHeader()})
            .then((res) => setAgency(res.data))
            .catch((err) => errorNotify(err.response.data.error))
    };

    const [isValid, setIsValid] = useState(!!id);
    const handleSubmit = event => {
        event.preventDefault();

        // if (!isValid) {
        //     warnEnterAllFieldsNotify("You entered incorrect data!");
        //     return;
        // }
        if(emailError){
            warnEnterAllFieldsNotify(emailError);
            return;
        }
        if(nameError){
            warnEnterAllFieldsNotify(nameError);
            return;
        }
        if(paymentError){
            warnEnterAllFieldsNotify(paymentError);
            return;
        }
        if(addressError){
            warnEnterAllFieldsNotify(addressError);
            return;
        }

        if(numberError){
            warnEnterAllFieldsNotify(numberError);
            return;
        }
        if(buildingError){
            warnEnterAllFieldsNotify(buildingError);
            return;
        }

        if (!agency.name || !agency.countryId || !agency.cityId
            || !agency.street || !agency.building || !agency.apartment || !agency.regularPayment)
            warnEnterAllFieldsNotify("Fields cannot be empty!");
        else {
            submitHandler({...agency, deposit: agency.deposit});
            closeModal();
        }


    }

   const [emailError,setEmailError]=useState('');

    const validateEmail = (e) => {

        validator.isEmail(e.target.value) && validator.isLength(e.target.value, {min: 9, max: 70}) ?
            setEmailError('')
            :
            setEmailError('Email is incorrect!');

        handleInputChange(e);
    };


    const [nameError,setNameError]=useState('');

    const validateName = (e) => {
        let name = e.target.value.trim();
        validator.isLength(name, {min: 2, max: 20}) ?
            setNameError('')
            :
            setNameError('Name is incorrect (size: 2-20)') ;

        handleInputChange(e);
    };
    const [addressError,setAddressError]=useState('');

    const validateAddress = (e) => {
        let name = e.target.value.trim();
        validator.isLength(name, {min: 2, max: 20}) ?
            setAddressError('')
            :
            setAddressError('Address is incorrect (size: 2-20)') ;

        handleInputChange(e);
    };

    const [numberError,setNumberError]=useState('');
    const validateNumber = (e) => {

        validator.isInt(e.target.value, {min: 1, max: 20}) ? setNumberError('') : setNumberError('Name is incorrect (size: 1-20)');

        handleInputChange(e);
    };
    const [paymentError,setPaymentError]=useState('');
    const validatePayment = (e) => {

        validator.isInt(e.target.value, {min: 1, max: 100000}) ? setPaymentError('') : setPaymentError('Payment is incorrect, should be integer (size: 1-100000)');

        handleInputChange(e);
    };

    const [buildingError,setBuildingError]=useState('');

    const validateBuilding = (e) => {

        validator.isLength(e.target.value, {min: 1, max: 5}) ? setBuildingError('') : setBuildingError('Building should be integer  (size: 1-5)') ;
        handleInputChange(e);
    };


    const handleInputCountryChange = event => {
        getCitiesByCountryId(event.currentTarget.value);
        const {name, value} = event.currentTarget;
        setAgency({...agency, [name]: value})

    }
    const handleInputChange = event => {
        const {name, value} = event.currentTarget;
        setAgency({...agency, [name]: value})

    }

    const deleteAg = (event) => {
        event.preventDefault();
        deleteAgency(id);
        closeModal();

    }


    return (
        <div style={styles.popupFade}>
            <Notification/>

            <link
                href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600,400italic,700'
                rel='stylesheet' type='text/css'/>
            <div className="animate__animated animate__backInLeft" id="interviewForm" style={styles.divSign}>

                <form className="login100-form validate-form " onSubmit={handleSubmit} style={{marginTop: '-20px'}}>
                    <button type="button" className="cl-btn-7" style={{top: '10px', left: '-30px'}}
                            onClick={closeModal}
                    />
                    <br/>


                    <span style={styles.span}>
                            {buttonName} Agency
                        </span>

                    <div id='email'
                        style={styles.divEnterData}
                    >
                        <input className="input101" type="text" style={styles.input}
                               name="name"
                               placeholder="Agency Name "
                               value={agency.name}
                               onChange={validateName}
                        />
                        <span className="focus-input100"/>
                    </div>


                    <div style={styles.select100}>
                        <select style={styles.select100} name="countryId"
                                value={agency.countryId}
                                onChange={handleInputCountryChange}
                        >
                            <option value="" disabled selected>Countries</option>
                            {allCountries.map(country =>
                                <option style={styles.option100} key={country.id} value={country.id}
                                >{country.name}</option>)}
                        </select>
                        <span className="focus-input100"/>
                    </div>

                    <div style={styles.select100}>
                        <select style={styles.select100} name="cityId"
                                value={agency.cityId}
                                onChange={handleInputChange}
                        >
                            <option value="" disabled selected>City</option>
                            {allCities.map(city =>
                                <option style={styles.option100} key={city.id} value={city.id}
                                >{city.name}</option>)}
                        </select>
                        <span className="focus-input100"/>
                    </div>

                    {!id &&

                    <div>
                    <span style={styles.span}>
					             Owner
                    </span>

                        <div style={styles.divEnterData}>
                            <input
                                // className="input100"
                                type="text"
                                style={{height: '35px'}}
                                name="ownerEmail"
                                placeholder="Enter owner email"
                                onChange={validateEmail}
                            />
                            <span className="focus-input100"/>
                        </div>
                        <span style={styles.span}>
					             Admin
                    </span>
                        <div style={styles.divEnterData}>
                            <input
                                // className="input100"
                                type="text"
                                style={{height: '35px'}}
                                name="adminEmail"
                                placeholder="Enter admin email "
                                onChange={validateEmail}
                            />
                            <span className="focus-input100"/>
                        </div>

                    </div>

                    }

                    <div style={styles.divEnterData}>
                        <input
                            // className="input100"
                            type="text"
                            style={{height: '35px'}}
                            name="regularPayment"
                            placeholder="Regular payment"
                            value={agency.regularPayment}
                            onChange={validatePayment}
                        />
                        <span className="focus-input100"/>
                    </div>


                    <span style={styles.span}>
					             ADDRESS
                    </span>


                    <div style={styles.divEnterData}>
                        <input className="input101" type="text" style={styles.input}
                               name="street"
                               placeholder="Street"
                               value={agency.street}
                               onChange={validateAddress}
                        />
                        <span className="focus-input100"/>
                    </div>

                    <div style={styles.divEnterData}>
                        <input className="input101" type="text" style={styles.input}
                               name="building"
                               placeholder="Building"
                               value={agency.building}
                               onChange={validateBuilding}
                        />
                        <span className="focus-input100"/>
                    </div>
                    <div style={styles.divEnterData}>
                        <input className="input101" type="text" style={styles.input}
                               name="apartment"
                               placeholder="Apartment"
                               value={agency.apartment}
                               onChange={validateBuilding}
                        />
                        <span className="focus-input100"/>
                    </div>

                    {
                        id &&
                        <div className="container-login100-form-btn">
                            <button type='button' className="login101-form-btn" onClick={(event) => deleteAg(event)}
                                    style={{marginBottom: '10px'}}>
                                Deactivate
                            </button>
                        </div>
                    }
                    <div style={{display: 'flex'}}>
                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn"
                                // style={{marginBottom: '10px'}}
                            >
                                {buttonName}
                            </button>
                        </div>


                        <div className="container-login100-form-btn">
                            <button type='button'
                                    className="login101-form-btn"
                                    onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>


                </form>
            </div>
        </div>
    )

}
