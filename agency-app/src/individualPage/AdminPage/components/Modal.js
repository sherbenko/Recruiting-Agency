import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.min.css'
import "../../../cssForIndividualPage/animate.css";
import "../../../cssForIndividualPage/icomoon.css";
import "../../../cssForIndividualPage/simple-line-icons.css";
import "../../../cssForIndividualPage/magnific-popup.css";
import "../../../cssForIndividualPage/style.css";
import {Notification} from "./Notification";
import {toast} from "react-toastify";
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
        alignItems: 'center',
        zIndex: 100
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
    // span: {
    //     paddingBottom: '30px',
    //     display: 'flex',
    //     fontSize: '30px',
    //     color: 'black',
    //     lineHeight: '1.2',
    //     textAlign: 'center'
    // },
    span: {
        fontSize: '30px',
        color: 'black',
        lineHeight: '1.2',
        textAlign: 'center'
    },
    // divSign: {
    //     paddingTop: '0px',
    //     marginTop: '5%',
    //     backgroundColor: 'white',
    //     width: '30%',
    //     height: '85%',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    //
    // },
    // divSign: {
    //     paddingTop: '0px',
    //     marginTop: '5%',
    //     backgroundColor: 'white',
    //     width: '55%',
    //     height: '90%',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    //
    // },
    divSign: {
        paddingTop: '0px',
        marginTop: '5%',
        backgroundColor: 'white',
        width: '55%',
        height: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divFacebookGoogle: {
        display: 'flex',
        justifyContent: 'center'
    },
    // divEnterData: {
    //     marginBottom: '10px',
    //     position: 'relative',
    //     width: '100%',
    //     backgroundColor: '#fff',
    //     borderRadius: '20px'
    // },
    divEnterData: {
        margin: '20px 0',
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
    input: {
        fontSize: '16px',
        color: '#000000',
        lineHeight: '1.2',
        height: '40px',
        background: 'transparent',
        padding: '0 20px 0 23px'
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
    }
}


export const Modal = ({
                          submitHandler, onModalCloseClick, id = null, email = '', agencyId = '', roleIds = [], roles = [],
                          allRoles, allAgencies, buttonName, file = '', contractTypeId = '', dailyPayment = '', name = '', allEmployerContractTypes, contractId = ''
                      }) => {
    let currentAgencyId = JSON.parse(localStorage.getItem('response')).agency.id;
    const initialFormState = {id, email, agencyId, roleIds, roles};
    const [user, setUser] = useState(initialFormState)
    const [rolesIds] = useState([]);


    const initialContractState = {file, contractTypeId, dailyPayment, name, contractId}
    const [contract, setContract] = useState(initialContractState);
    const [employerContractModal, setEmployerContractModal] = useState(false);
    const [employeeContractModal, setEmployeeContractModal] = useState(false);
    const handleInputEmployerContractChange = event => {
        const {name, value} = event.currentTarget
        setContract({...contract, [name]: value})
        console.log(contract)


    }

    const isEmployerFields = () => setEmployerContractModal(!employerContractModal);
    const isEmployeeModalFields = () => setEmployeeContractModal(!employeeContractModal);

    const handleInputChange = event => {
        const {name, value} = event.currentTarget
        setUser({...user, [name]: value, roleIds: rolesIds})

    }


    const checkChangeHandler = roleId => {

        const result = toggleUserRole(user.roles, roleId);

        setUser({...user, roles: result, agencyId: currentAgencyId});
    }

    const hasRole = (roles, roleId) => roles.find(role => role.id === roleId);


    const toggleUserRole = (roles, roleId) => {

        if (hasRole(roles, roleId))
            return roles.filter(role => role.id !== roleId)
        return [...roles, allRoles.find(role => role.id === roleId)];
    }


    const handleSubmit = event => {
        event.preventDefault()

        if (!isValid) {
            warnEnterAllFieldsNotify("You entered incorrect data!");
            return
        }


        /*fix*/
        if (!user.email || !user.roles) {
            warnEnterAllFieldsNotify("Fields cannot be empty!");
            return;
        }

        if (user.roles.some(role => role.name === 'EMPLOYEE') && user.roles.some(role => role.name === 'EMPLOYER')) {
            warnEnterAllFieldsNotify("You cannot assign EMPLOYEE and EMPLOYER roles to the same user");
            return;
        }

        if (user.roles.some(role => role.name === "EMPLOYER")) {

            setEmployeeContractModal(false)
            isEmployerFields();
            if (id) {
                submitHandler(user)
            } else {
                if (!contract.file || !contract.contractTypeId || !contract.dailyPayment || !contract.name || !user.roles) {
                    setContract(initialContractState);
                    warnEnterAllFieldsNotify("Please fill out the contract for EMPLOYER!");
                } else {
                    submitHandler(user, contract);

                    setEmployerContractModal(false);

                }
            }
        }

        if (user.roles.some(role => role.name === "EMPLOYEE")) {
            setEmployerContractModal(false)
            isEmployeeModalFields();
            if (id) {
                submitHandler(user)
            } else {

                if (!contract.contractId) {
                    warnEnterAllFieldsNotify("Please fill out the contract for EMPLOYEE!");
                    setContract(initialContractState);

                } else {
                    submitHandler(user, contract);

                    setEmployeeContractModal(false);


                }
            }

        }

        if (!user.roles.some(role => role.name === "EMPLOYER") && !user.roles.some(role => role.name === "EMPLOYEE")) {

            submitHandler(user);

            setUser(initialFormState)

        }

    }

    const [isValid, setIsValid] = useState(!!id);

    const validateEmail = (e) => {

        validator.isEmail(e.target.value) && validator.isLength(e.target.value,{min:9,max:70}) ?
            setIsValid(true)
     :
            setIsValid(false);

        handleInputChange(e);
    };

    const validateName = (e) => {

        let name = e.target.value.trim();
        validator.isLength(name,{min:5,max:20}) && validator.isAlpha(name)?
        setIsValid(true)
    :
        setIsValid(false);

        handleInputEmployerContractChange(e);
    };

    const validateNumber = (e) => {

        setIsValid(validator.isInt(e.target.value,{min:5,max:20}));
        handleInputEmployerContractChange(e);
    };

    const validateDailyPayment = (e) => {

        setIsValid(validator.isFloat(e.target.value,{min:0.01,max:10000.00}));
        handleInputEmployerContractChange(e);
    }
    const validateEmployeeContractNumber = (e) => {

        setIsValid(validator.isInt(e.target.value,{min:1,max:20}));
        handleInputEmployerContractChange(e);
    }



    const warnEnterAllFieldsNotify = (message) => {
        toast.warn(message, {position: toast.POSITION.TOP_RIGHT, color: "black"});
    }


    return (
        <div style={styles.popupFade}>
            <Notification/>

            <link
                href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600,400italic,700'
                rel='stylesheet' type='text/css'/>
            <div className="animate__animated animate__backInLeft" id="interviewForm" style={styles.divSign}>

                {/*<form className="login100-form validate-form " onSubmit={handleSubmit}>*/}
                <form style={{padding: '40px 50px'}} className="login100-form validate-form " onSubmit={handleSubmit}>
                    <button type="button" className="cl-btn-7" onClick={onModalCloseClick}
                            style={{top: '-40px', left: '-80px'}}/>

                    <br/>
                    <span style={styles.span}>
					             {buttonName} user
                    </span>


                    <div style={styles.divEnterData}>
                        <input className="input100" type="text" style={styles.input}
                               name="email"
                               placeholder="Email"
                               value={user.email}
                               onChange={validateEmail}
                        />
                        <span className="focus-input100"/>
                    </div>


                    <div style={styles.divEnterData}>
                        <div style={{textAlign: 'left'}}>
                            {allRoles.map((role) =>

                                <div className="custom-control custom-checkbox" key={role.id}>
                                    <input name="box" type="checkbox" className="custom-control-input" id={role.id}
                                           checked={!!hasRole(user.roles, role.id)}
                                           value={role.id}
                                           onChange={() => checkChangeHandler(role.id)}
                                    />
                                    <label className="custom-control-label" htmlFor={role.id}
                                           style={{marginLeft: '3.5rem', color: 'black'}}>{role.name}</label>
                                </div>
                            )}
                        </div>
                    </div>
                    {employerContractModal && !id &&
                    <div>
                        <div style={styles.divEnterData}>
                            <input className="input100" type="text" style={styles.input}
                                   name="name"
                                   placeholder="Employer name"

                                   onChange={validateName}/>
                            <span className="focus-input100"/>
                        </div>
                        <div style={styles.divEnterData}>
                            <input className="input100" type="text" style={styles.input}
                                   name="file"
                                   placeholder="Contract number"

                                   onChange={validateNumber}/>
                            <span className="focus-input100"/>
                        </div>
                        <div style={styles.select100}>
                            <select style={styles.select100} name="contractTypeId"
                                    value={contract.contractTypeId}
                                    onChange={handleInputEmployerContractChange}
                            >
                                <option value="" disabled selected>Countries</option>
                                {allEmployerContractTypes.map(type =>
                                    <option style={styles.option100} key={type.id} value={type.id}
                                    >{type.name}</option>)}
                            </select>
                            <span className="focus-input100"/>
                        </div>
                        <div style={styles.divEnterData}>
                            <input className="input100" type="text" style={styles.input}
                                   name="dailyPayment"
                                   placeholder="Daily payment"
                                   onChange={validateDailyPayment}/>
                            <span className="focus-input100"/>
                        </div>
                    </div>
                    }
                    {employeeContractModal && !id &&

                    <div style={styles.divEnterData}>
                        <input className="input100" type="text" style={styles.input}
                               name="contractId"
                               placeholder="Employee contract number"

                               onChange={validateEmployeeContractNumber}/>
                        <span className="focus-input100"/>
                    </div>


                    }

                    <br/>

                    <div className="container-login100-form-btn">
                        <button className="login100-form-btn" style={{marginBottom: '5px'}}>
                            {buttonName}
                        </button>
                    </div>

                    <div className="container-login100-form-btn">
                        <button type='button' className="login101-form-btn" style={{marginBottom: '15px'}}
                                onClick={onModalCloseClick}>
                            Cancel
                        </button>
                    </div>


                </form>
            </div>
        </div>
    )

}
