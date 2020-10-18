import React from 'react';
import AboutCompany from "./AboutCompany";
import Clients from "./Clients";
import Services from "./Services";
import EmployeeContract from "../individualPage/EmployeePage/EmployeeContract";
import EmployerApplication from "../individualPage/EmployerPage/EmployerApplication";

const styles = {
    div: {
        textAlign: 'center',
        width: '80%',
        marginTop: '-30px',
        marginLeft: '10%'
    },
    button: {
        fontFamily: 'sans-serif',
        width: '200px',
        paddingRight: '15px',
        paddingLeft: '15px',
        border: '3px solid white',
        borderRadius: '15px',
        fontSize: '1em',
        color: 'white',
        backgroundColor: 'transparent'
    }
};

function InformationInPicture(props) {
    //let personEmail = JSON.parse(localStorage.getItem('response')) ? JSON.parse(localStorage.getItem('response')).email : null;
    let lang = props.lang;
    let langConst = [];
    if (lang === 'en') {
        langConst.push('employer');
        langConst.push('Looking for staff?');
        langConst.push('Submit your application');
        langConst.push('applicant');
        langConst.push('Looking for work?');
        langConst.push('Enter data');
    } else {
        langConst.push('работодателю');
        langConst.push('Нужны сотрудники?');
        langConst.push('Подать заявку');
        langConst.push('соикателю');
        langConst.push('В поисках работы?');
        langConst.push('Внести данные');
    }
    const rightBtn = {
        fontFamily: 'sans-serif',
        width: '200px',
        paddingRight: '15px',
        paddingLeft: '15px',
        border: '3px solid white',
        borderRadius: '15px',
        fontSize: '1em',
        color: 'white',
        backgroundColor: 'transparent',
        marginLeft: 'calc(100% - 200px)'
    };


    return (
        <div>

            <a name="top"/>

            <section className="section section-1" id="sec-ab20" style={{marginTop: '-100px'}}>

                <div className="wrap-login100" id="employeeContract" style={{
                    top: '80px', width: '360px', position: 'absolute', zIndex: '999',
                    margin: '0 0 0 -180px', left: '50%', display: 'none',
                    paddingLeft: '30px', paddingTop: '5px', paddingBottom: '30px', paddingRight: '30px'
                }}>
                    <form className="login100-form validate-form">
                        <div className="cl-btn-7" onClick={function () {
                            document.getElementById('employeeContract').style.display = 'none';
                        }}/>
                        <br/>
                        <EmployeeContract/>
                    </form>
                </div>
                <div className="wrap-login100" id="employerApplication" style={{
                    top: '80px', width: '360px', position: 'absolute', zIndex: '999',
                    margin: '0 0 0 -180px', left: '50%', display: 'none',
                    paddingLeft: '30px', paddingTop: '5px', paddingBottom: '30px', paddingRight: '30px'
                }}>

                    <form className="login100-form validate-form">
                        <div className="cl-btn-7" onClick={function () {
                            document.getElementById('employerApplication').style.display = 'none';
                        }}/>
                        <EmployerApplication endDate={Date.now() + new Date(0, 3, 0)}/>
                    </form>

                </div>

                <div style={styles.div}><br/><br/><br/><br/><br/><br/>
                    <p style={{textAlign: 'left', color: 'white', fontSize: 'x-large'}}>{langConst[0]}</p>
                    <h5 style={{textAlign: 'left', color: 'white', fontSize: '3em'}}>{langConst[1]}</h5>
                    <button type="button" className="btn-block"
                            style={styles.button} onClick={function () {
                        document.getElementById('employerApplication').style.display = 'block';
                    }}>{langConst[2]}</button>
                    <p style={{textAlign: 'right', color: 'white', fontSize: 'x-large'}}>{langConst[3]}</p>
                    <h5 style={{textAlign: 'right', color: 'white', fontSize: '3em'}}> {langConst[4]}</h5>
                    <button type="button" className="btn-block" style={rightBtn} onClick={
                        function () {
                            document.getElementById('employeeContract').style.display = 'block';
                        }
                    }>{langConst[5]}</button>
                </div>
            </section>
            <a name="aboutCompany"/>
            <AboutCompany lang={lang}/>
            <a name="ourClients"/>
            <Clients lang={lang}/>
            <a name="ourServices"/>
            <Services lang={lang}/>
        </div>
    )
}

export default InformationInPicture;