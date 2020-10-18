import React, {useCallback, useState} from 'react';
import HeaderMenu from "./startPage/HeaderMenu";
import InformationInPicture from "./startPage/InformationInPicture";
import './App.css';
import EmployerPage from "./individualPage/EmployerPage/EmployerPage";
import EmployeePage from "./individualPage/EmployeePage/EmployeePage";
import Contacts from "./startPage/Contacts";
import './startPage/Toggle.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {AdminPage} from "./individualPage/AdminPage/AdminPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import SecretaryPage from "./individualPage/SecretaryPage/SecretaryPage";
import {ManagerPageMain} from "./individualPage/ManagerPages/ManagerPageMain";
import Login from "./auth/component/Login";
import {ExpertPage} from "./individualPage/ExpertPage/ExpertPage";


export const App = () => {
    const logo = 'https://s3.us-west-1.amazonaws.com/com.soar.p/images/profile/companylogos/iTechArt-7926.jpg';
    let [lang, setLang] = useState('ru');
    const employerEmail = 'employer_email@gmail.com';
    const employeeName = 'Alex Kov';
    const handler = useCallback(() => {
        if (lang === 'en') setLang('ru');
        else setLang('en');
    }, [lang]);

    return (
        <section className="App">
            <input className="checkbox" type="checkbox" id="codepen" onChange={handler}/>
            <label htmlFor="codepen"/>
            <HeaderMenu logo={logo} lang={lang} id='1'/>
            <Contacts/>
        </section>
    )
}
export default App;

