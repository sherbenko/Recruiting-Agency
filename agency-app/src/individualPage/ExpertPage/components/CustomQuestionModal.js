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
        maxWidth: '100%',
        maxHeight: '150%',
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

export const CustomQuestionModal = ({onModalCloseClick, questions, setQuestions}) => {


    const [isAddSimpleModalCreate, setIsAddSimpleModalCreate] = useState(false)
    const [customQuestion, setCustomQuestion] = useState();
    const [variants, setVariants] = useState();
    const [a, setA] = useState();
    const [b, setB] = useState();
    const [c, setC] = useState();
    const [d, setD] = useState()
    useEffect(() => {

    }, [])
    const handleA = event => {setA(event.currentTarget.value)}
    const handleB = event => {setB(event.currentTarget.value)}
    const handleC = event => {setC(event.currentTarget.value)}
    const handleD = event => {setD(event.currentTarget.value)}

    const handleInputChange = event => {
        const {name, value} = event.currentTarget
        setCustomQuestion({questionName: value});

    }
    const handleInputChangeVariants = event => {
        const {name, value} = event.currentTarget
        setVariants();

    }

    const submitQuestion = () => {
        setQuestions([...questions,
            {
                questionName: customQuestion.questionName,
                variants: [
                        {label: "a", name: a},
                        {label: "b", name: b},
                        {label: "c", name: c},
                        {label: "d", name: d}
                ]
            }
        ]);
        onModalCloseClick();
    }

    return (

    <div style={styles.popupFade} >

        <link
            href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600,400italic,700'
            rel='stylesheet' type='text/css'/>
        <div className="animate__animated animate__backInLeft wrap-login100"  id="interviewForm" style={styles.divSign}>
            <div style={styles.divEnterData} >
                <input className="input100" type="text" style={styles.input}
                       name="questionName"
                       placeholder="Enter question"
                       onChange={handleInputChange}
                />
                <span className="focus-input100"/>
            </div>
            <div style={styles.divEnterData} >
                <input className="input100" type="text" style={styles.input}
                       name="a"
                       placeholder="Enter answer A"
                       onChange={handleA}
                />
                <span className="focus-input100"/>
            </div>
            <div style={styles.divEnterData} >
                <input className="input100" type="text" style={styles.input}
                       name="b"
                       placeholder="Enter answer B"
                       onChange={handleB}
                />
                <span className="focus-input100"/>
            </div>
            <div style={styles.divEnterData} >
                <input className="input100" type="text" style={styles.input}
                       name="c"
                       placeholder="Enter answer C"
                       onChange={handleC}
                />
                <span className="focus-input100"/>
            </div>
            <div style={styles.divEnterData} >
                <input className="input100" type="text" style={styles.input}
                       name="d"
                       placeholder="Enter question D"
                       onChange={handleD}
                />
                <span className="focus-input100"/>
            </div>
            <div className="container-login100-form-btn">
                <button className="login100-form-btn"  onClick={submitQuestion}>
                    Add
                </button>
            </div>
            <div className="container-login100-form-btn">
                <button className="login100-form-btn"  onClick={onModalCloseClick} >
                    Close
                </button>
            </div>
        </div>
    </div>

    )

}