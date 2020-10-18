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
    button: {
        color: "black",
        textAlign: 'left',
        paddingBottom: '20px',
        paddingLeft: '20px',
        paddingRight: '20px'
    },
    choiceButton: {
        fontFamily: 'sans-serif',
        border: '3px solid #17a2b8db',
        borderRadius: '99px',
        color: '#17a2b8db',
        backgroundColor: 'white'
    }
};

function EmployeeInterview(props) {

    const {interview} = props;
    let showButton = interview.interviewStatusId === 1 || interview.interviewStatusId === 3;
    let [status, setStatus] = useState(interview.interviewStatusName);
    return (
        <div className="col-md-4 col-sm-6">
            <a className="fh5co-project-item image-popup to-animate">
                <div style={styles.button}>
                    <br/>
                    <h6><b>Интервью</b></h6>
                    <h10>Имя эксперта: {interview.expertName}</h10>
                    <br/>
                    <h10>Время и дата начала: {interview.startDateTime} </h10>
                    <br/>
                    <h10>Время и дата окончания: {interview.endDateTime} </h10>
                    <br/>
                    <h10>Комментарий менеджера: {interview.managerComment} </h10>
                    <br/>
                    <h10>Статус: {interview.interviewStatusName} </h10>
                    <br/>
                    {showButton && (<button type="button" className="btn-block  btn-primary"
                                            id={"interview" + interview.id} style={styles.choiceButton}
                         onClick={function () {
                             if (interview.interviewStatusId === 1) {
                                 axios. //if 1 then 2, if 3 then 7
                                     put("http://localhost:8080/interview/update-interview-status/" + interview.id + "/" + 2, {},{headers: authHeader()})
                                     .then(data => {
                                         alert("success");
                                     })
                                     .catch(err => alert(err))


                             } else if (interview.interviewStatusId === 3){
                                 axios. //if 1 then 2, if 3 then 7
                                     put("http://localhost:8080/interview/update-interview-status/" + interview.id + "/" + 7, {},{headers: authHeader()})
                                     .then(data => {
                                         alert("success");
                                     })
                                     .catch(err => alert(err))
                             }
                         }
                         }
                    >Approve</button>)}
                </div>

            </a>

        </div>)

}

export default EmployeeInterview;