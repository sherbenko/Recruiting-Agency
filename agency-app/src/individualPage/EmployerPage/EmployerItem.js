import React, {useState} from 'react';
import "../../cssForIndividualPage/animate.css";
import "../../cssForIndividualPage/icomoon.css";
import "../../cssForIndividualPage/simple-line-icons.css";
import "../../cssForIndividualPage/magnific-popup.css";
import "../../cssForIndividualPage/style.css";
import "../../startPage/SignIn.css";
import axios from "axios";
import authHeader from "../../auth/header";

const styles = {
    input0: {
        width: '180px',
        fontSize: '16px',
        color: '#000000',
        lineHeight: '1.2',
        height: '62px',
        background: 'transparent',
        padding: '0 20px 0 23px'
    },
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
    popUp: {
        overflowY: 'auto',
        height: '500px',
        top: '100px',
        //width: '60%',
        position: 'fixed',
        zIndex: '999',
        //margin: '0 0 0 -30%',
        //left: '50%',
        display: 'none',
        paddingLeft: '30px',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingRight: '30px'
    },
    smallPopUp: {
        marginLeft: '50%',
        top: '10px',
        position: 'absolute',
        zIndex: '999',
        display: 'none',
        paddingLeft: '30px',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingRight: '30px'
    },
    smallButton: {
        width: '100px',
        height: '40px',
        marginRight: '20px',
        marginBottom: '10px'
    },
    choiceButton: {
        fontFamily: 'sans-serif',
        border: '3px solid #17a2b8db',
        borderRadius: '99px',
        color: '#17a2b8db',
        backgroundColor: 'white'
    },
    deleteButton: {
        fontFamily: 'sans-serif',
        border: '3px solid #e00a0a',
        borderRadius: '99px',
        color: '#e00a0a',
        backgroundColor: 'white'
    }
};

function EmployerItem(props) {
    const {app} = props;
    const [statusName, setStatusName] = useState(app.statusName);

    const shouldShowButton = statusName === 'ACCEPTED';
    const shouldShowButton2 = statusName === 'ACTIVE';
    const shouldShowDeleteButton = (statusName === 'REJECTED' || statusName === 'CANCELED');
    return (
        <div className="col-md-4 col-sm-6">
            <a className="fh5co-project-item image-popup to-animate">
                <div style={{
                    color: "black",
                    textAlign: 'left',
                    paddingBottom: '20px',
                    paddingLeft: '20px',
                    paddingRight: '20px'
                }}>
                    <br/>
                    <h6><b>Application</b></h6>
                    <h10>Application number: {app.id} </h10>
                    <br/>
                    <h10>Profession: {app.professionName}</h10>
                    <br/>
                    <h10>Status: {statusName} </h10>
                    <br/>
                    <div>
                        {/*<Application app={app}/>*/}
                        <div>
                            <div className="wrap-login100" id={"application" + app.id} style={styles.popUp}>

                                <form className="login100-form validate-form">
                                    <div className="cl-btn-7" onClick={function () {
                                        document.getElementById('application' + app.id).style.display = 'none';
                                    }}
                                    />
                                    <br/>
                                    <span className="login100-form-title p-b-37" style={styles.span}>Application</span>

                                    <div style={styles.divEnterData}>
                                        <input type="text" style={styles.input0} value={'Status name: '} readOnly="readOnly"/>
                                        <input type="text" style={styles.input} id='appAge' value={app.statusName}
                                               readOnly="readOnly"/>
                                        <span className="focus-input100"/>
                                    </div>
                                    <div style={styles.divEnterData}>
                                        <input type="text" style={styles.input0} value='Employment type: ' readOnly="readOnly"/>
                                        <input type="text" style={styles.input} id='appEmploymentTypeName'
                                               value={app.employmentTypeName}
                                               readOnly="readOnly"/>
                                        <span className="focus-input100"/>
                                    </div>
                                    <div style={styles.divEnterData}>
                                        <input type="text" style={styles.input0} value={"Salary: "} readOnly="readOnly"/>
                                        <input type="text" style={styles.input} id='appSalary' value={app.salary} readOnly="readOnly"/>
                                        <span className="focus-input100"/>
                                    </div>
                                    <div style={styles.divEnterData}>
                                        <input type="text" style={styles.input0} value={'Profession: '} readOnly="readOnly"/>
                                        <input type="text" style={styles.input} id='appProfession' value={app.professionName}
                                               readOnly="readOnly"/>
                                        <span className="focus-input100"/>
                                    </div>
                                    <div style={styles.divEnterData}>
                                        <input type="text" style={styles.input0} value={"Experience: "} readOnly="readOnly"/>
                                        <input type="text" style={styles.input} id='appExperience' value={app.experienceName}
                                               readOnly="readOnly"/>
                                        <span className="focus-input100"/>
                                    </div>
                                    <div style={styles.divEnterData}>
                                        <input type="text" style={styles.input0} value={'Age restriction: '} readOnly="readOnly"/>
                                        <input type="text" style={styles.input} id='appAge' value={app.ageRestrictionName}
                                               readOnly="readOnly"/>
                                        <span className="focus-input100"/>
                                    </div>
                                    <div style={styles.divEnterData}>
                                        <input type="text" style={styles.input0} value={'Location: '} readOnly="readOnly"/>
                                        <input type="text" style={styles.input} id='appLocation'
                                               value={app.countryName + ', ' + app.cityName} readOnly="readOnly"/>
                                        <span className="focus-input100"/>
                                    </div>
                                    <div style={styles.divEnterData}>
                                        <input type="text" style={styles.input0} value={"Expert name: "} readOnly="readOnly"/>
                                        <input type="text" style={styles.input} id='appExpert' value={
                                            function () {
                                                if (app.expertPersonalName !== null && app.expertPersonalName.size !== 0) return app.expertPersonalName;
                                                else return "-";
                                            }
                                        } readOnly="readOnly"/>
                                        <span className="focus-input100"/>
                                    </div>
                                    <div style={styles.divEnterData}>
                                        <input type="text" style={styles.input0} value={'Comment: '} readOnly="readOnly"/>
                                        <input type="text" style={styles.input} id='appComment' value={function () {
                                            if (app.comment !== null && app.comment.size !== 0) return app.comment;
                                            else return "-";
                                        }}
                                               readOnly="readOnly"/>
                                        <span className="focus-input100"/>
                                    </div>
                                    <div style={styles.divEnterData}>
                                        <input type="text" style={styles.input0} value={"Creation date: "} readOnly="readOnly"/>
                                        <input type="text" style={styles.input} id='appCreationDate' value={app.creationDate}
                                               readOnly="readOnly"/>
                                        <span className="focus-input100"/>
                                    </div>
                                    <div style={styles.divEnterData}>
                                        <input type="text" style={styles.input0} value={'End date: '} readOnly="readOnly"/>
                                        <input type="text" style={styles.input} id='appEndDate' value={app.endDate}
                                               readOnly="readOnly"/>
                                        <span className="focus-input100"/>
                                    </div>
                                    <div className="container-login100-form-btn">
                                        <button type='button' className="login100-form-btn"
                                                style={{marginRight: '20px', marginBottom: '10px'}}
                                                onClick={function () {
                                                    document.getElementById('application' + app.id).style.display = 'none';
                                                }}>Ok
                                        </button>
                                        {shouldShowButton2 && (
                                            <button type="button" className="login100-form-btn-cancel"
                                                    style={{marginRight: '20px', marginBottom: '10px'}} onClick={
                                                function () {
                                                    document.getElementById('sureCancelApp' + app.id).style.display = 'block';

                                                }
                                            }>Cancel application
                                            </button>)}
                                    </div>
                                </form>
                            </div>
                            <button type="button" className="btn-block  btn-primary"
                                    id={"cancelApp" + app.id} style={styles.choiceButton} onClick={
                                function () {
                                    document.getElementById('application' + app.id).style.display = 'block';
                                }
                            }>
                                All information
                            </button>
                            <div className="wrap-login100" id={"sureCancelApp" + app.id} style={styles.smallPopUp}>
                                <br/>
                                <text style={styles.input}>Are you sure you want to cancel the application? It will not be possible to
                                    resume its action.
                                </text>
                                <div className="container-login100-form-btn">
                                    <button type='button' className="login100-form-btn"
                                            style={styles.smallButton}
                                            onClick={function () {
                                                document.getElementById('sureCancelApp' + app.id).style.display = 'none';
                                            }}>No
                                    </button>
                                    <button type="button" className="login100-form-btn-cancel"
                                            style={styles.smallButton} onClick={
                                        function () {
                                            document.getElementById('sureCancelApp' + app.id).style.display = 'none';
                                            document.getElementById('application' + app.id).style.display = 'none';
                                            axios
                                                .put('http://localhost:8080/employerApplication/change-status/' + app.id + "/CANCELED", null, {headers: authHeader()})
                                                .then(resp => {
                                                    setStatusName(resp.data.statusName);
                                                })
                                                .catch((err) => alert(err))
                                        }
                                    }>Yes, cancel application
                                    </button>
                                </div>
                            </div>
                        </div>
                        {shouldShowButton && (<>
                            <br/>
                            <button type="submit" className="btn-block  btn-primary"
                                    id={"submitApp" + app.id} style={styles.choiceButton} onClick={
                                function () {
                                    axios
                                        .put('http://localhost:8080/employerApplication/change-status/' + app.id + "/ACTIVE", null, {headers: authHeader()})
                                        .then(resp => {
                                            setStatusName(resp.data.statusName);
                                        })
                                        .catch((err) => alert(err))


                                }
                            }>Согласиться
                            </button>
                            <button type="submit" className="btn-block  btn-primary"
                                    id={"cancelApp" + app.id} style={styles.choiceButton} onClick={function () {
                                axios
                                    .put('http://localhost:8080/employerApplication/change-status/' + app.id + "/CANCELED", null, {headers: authHeader()})
                                    .then(resp => {
                                        setStatusName(resp.data.statusName);
                                    })
                                    .catch((err) => alert(err))

                            }}>Отказаться
                            </button>
                        </>)}
                        {shouldShowDeleteButton && (<>
                        <i style={{color:'#e00a0a'}}> The application is not active </i>
                        <button type="submit" className="btn-block  btn-primary"
                                id={"deleteApp" + app.id} style={styles.deleteButton} onClick={
                            function () {
                                axios
                                    .delete('http://localhost:8080/employerApplication/' + app.id, {headers: authHeader()})
                                    .then(resp => {
                                        setStatusName(resp.data.statusName);
                                    })
                                    .catch((err) => alert(err))
                            }
                        }>Удалить
                        </button>
                        </>)}
                    </div>
                </div>
            </a>
        </div>)

}

export default EmployerItem;