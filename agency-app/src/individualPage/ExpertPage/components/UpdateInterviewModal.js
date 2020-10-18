import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.min.css'
import "../../../cssForIndividualPage/animate.css";
import "../../../cssForIndividualPage/icomoon.css";
import "../../../cssForIndividualPage/simple-line-icons.css";
import "../../../cssForIndividualPage/magnific-popup.css";
import "../../../cssForIndividualPage/style.css";
import axios from "axios";
import authHeader from "../../../auth/header";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import {SimpleQuestionModal} from "./SimpleQuestionModal";
import {CustomQuestionModal} from "./CustomQuestionModal";
import {toast} from "react-toastify";
import {Notification} from "../../AdminPage/components/Notification";

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

export const UpdateInterviewModal = ({onModalCloseClick, updateStatusInterviewData, refreshInterviews}) => {

    const [interviewUpdateData, setInterviewUpdateData] = useState({}/*{interviewId: updateStatusInterviewData.interviewId, interviewStatusId: null}*/)
    const [interviewStatuses, setInterviewStatuses] = useState([])
    const [questions, setQuestions] = useState([]);
    const [managerComment, setManagerComment] = useState();
    const [isAddSimpleModalCreate, setIsAddSimpleModalCreate] = useState(false)
    const [isAddCustomModalCreate, setIsAddCustomModalCreate] = useState(false)

    useEffect(() => {
        //getInterviewStatuses();
        if (updateStatusInterviewData.currentIntStatusId === 1) {
            setInterviewUpdateData({interviewId: updateStatusInterviewData.interviewId, interviewStatusId: 3})
        } else if (updateStatusInterviewData.currentIntStatusId === 2) {
            setInterviewUpdateData({interviewId: updateStatusInterviewData.interviewId, interviewStatusId: 7})
        }
    }, [])



    const modalSimpleCreateClickHandler = () => setIsAddSimpleModalCreate(true);
    const modalCustomCreateClickHandler = () => setIsAddCustomModalCreate(true);
    const modalSimpleCloseClickHandler = () => setIsAddSimpleModalCreate(false);
    const modalCustomCloseClickHandler = () => setIsAddCustomModalCreate(false);

   /* const getInterviewStatuses = () => {
        axios
            .get("http://localhost:8080/interview-status", {headers: authHeader()})
            .then(data => {

                setInterviewStatuses(data.data);

            })
            .catch(err => alert(err))
    }*/

    const handleInputChange = event => {
        setInterviewUpdateData({...interviewUpdateData, interviewId: updateStatusInterviewData.interviewId, [event.currentTarget.name]: event.currentTarget.value})
    }

    const updateInterview = () => {
        axios
            .get("http://localhost:8080/interview/get-interview-by-id/"+ interviewUpdateData.interviewId, {headers: authHeader()})
            .then(data => {
                let newStatusId;
                if (data.data.interviewStatusId === 1) {
                    setInterviewUpdateData({interviewId: updateStatusInterviewData.interviewId, interviewStatusId: 3})
                    newStatusId = 3;
                } else if (data.data.interviewStatusId === 2) {
                    setInterviewUpdateData({interviewId: updateStatusInterviewData.interviewId, interviewStatusId: 7})
                    newStatusId = 7;
                }
                axios
                    .post("http://localhost:8080/interview/change-interview-status-expert",
                        {interviewId: interviewUpdateData.interviewId,
                            expertComment: interviewUpdateData.expertComment,
                            interviewStatusId: newStatusId,
                            questions: questions
                            /*questions: [{questionName: "qn1"}, {questionName: "qn2", variants: [{label: "a", name: "an"}, {label: "b", name: "bn"}]}]*/
                        }
                        , {headers: authHeader()})
                    .then(data => {
                        toast.success("Interview has been updated", {position: toast.POSITION.TOP_RIGHT})
                        refreshInterviews();
                        onModalCloseClick();
                    })
                    .catch(err => toast.error("Interview hasn't been updated.\n Smth goes wrong", {position: toast.POSITION.TOP_RIGHT})
                    )
            })

    }
    return (
        <div>
            <Notification/>
        <div style={styles.popupFade} >

            {isAddSimpleModalCreate && <SimpleQuestionModal onModalCloseClick={modalSimpleCloseClickHandler} questions={questions} setQuestions={setQuestions}/>}
            {isAddCustomModalCreate && <CustomQuestionModal onModalCloseClick={modalCustomCloseClickHandler} questions={questions} setQuestions={setQuestions}/>}
            <link
                href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600,400italic,700'
                rel='stylesheet' type='text/css'/>
            <div className="animate__animated animate__backInLeft wrap-login100"  id="interviewForm" style={styles.divSign}>

                <form className="login100-form validate-form "  >
                    <button className="cl-btn-7" onClick={onModalCloseClick} />
                    <br/>
                    <span style={styles.span}>
					             Update interview
                    </span>

                    {/*<div style={styles.select100}>
                        <select  style={styles.select100} name="interviewStatusId" onChange={handleInputChange}>
                            <option value="" disabled selected>CHOOSE INTERVIEW STATUS</option>
                            {interviewStatuses.map(interviewStatus =>
                                <option style={styles.option100} key={interviewStatus.id} value={interviewStatus.id}
                                >{interviewStatus.name}</option>)}
                        </select>
                        <span className="focus-input100"/>
                    </div>*/}
                    <div style={styles.divEnterData} >
                        <input className="input100" type="text"  style={styles.input}
                               name="expertComment"
                               placeholder="Expert's comment"
                               onChange={handleInputChange}
                        />
                        <span className="focus-input100"/>
                    </div>
                    {questions.length > 0 && <p>Questions</p>}
                    {questions.map(question => <div style={styles.divEnterData} >
                        <input className="input100" type="text" disabled style={styles.input}
                               name="questionName"
                               placeholder="Enter question"
                               value={question.questionName}
                        />
                        <span className="focus-input100"/>
                    </div>)}

                    <br/>
                </form>
                <div style={{display: 'flex'}}>
                    <div className="container-login100-form-btn">
                        <button  className="login100-form-btn" onClick={modalSimpleCreateClickHandler}>
                            Add simple question
                        </button>
                    </div>
                    <div className="container-login100-form-btn">
                        <button className="login100-form-btn"  onClick={modalCustomCreateClickHandler}>
                            Add custom question
                        </button>
                    </div>
                </div>
                <div className="container-login100-form-btn">
                    <button className="login100-form-btn"  onClick={updateInterview} >
                        Save
                    </button>
                </div>
                <div className="container-login100-form-btn">
                    <button className="login100-form-btn"  onClick={onModalCloseClick} >
                        Close
                    </button>
                </div>
            </div>
        </div>
        </div>
    )

}