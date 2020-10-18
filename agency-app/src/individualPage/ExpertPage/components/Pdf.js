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
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    /*page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },*/
    container: {
        marginBottom: 10,
    },
    questionName: {
        fontFamily: 'Lato Bold',
        fontSize: 14
    },
    school: {
        fontSize: 10,
    },
    degree: {
        fontFamily: 'Lato',
        fontSize: 10,
    },
    candidate: {
        fontFamily: 'Lato Italic',
        fontSize: 10,
    },
});

export const Pdf = (questions, employeeName, expertName) => {

    const [question, setQuestion] = useState([1, 2, 3]);

    useEffect(() => {
        console.log("hooray");
        console.log(questions);
    }, [])

    return (<Document>
            <Page size="A4" style={styles.page}>
            {/*{questions.length > 0 && questions.map(question =>
                <div>
                    <Text style={styles.questionName}>{question.name}</Text>
                    <Text style={styles.school}>Jedi Academy</Text>
                    <Text style={styles.degree}>Jedi Master</Text>
                    <Text style={styles.candidate}>A long, long time ago</Text>
                </div>
            )}*/}
                <Text style={styles.school}>{question[0]}</Text>
            </Page>
        </Document>
    )
}