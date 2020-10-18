import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './SignIn.css';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import InformationInPicture from "./InformationInPicture";
import Login from "../auth/component/Login";
import {AdminPage} from "../individualPage/AdminPage/AdminPage";


import {IncorrectUrl} from "../auth/component/InсorrectUrl";
import AuthService from "../auth/auth.service";
import SecretaryPage from "../individualPage/SecretaryPage/SecretaryPage";
import {ManagerPageMain} from "../individualPage/ManagerPages/ManagerPageMain";
import {ExpertPage} from "../individualPage/ExpertPage/ExpertPage";
import PaymentPage from "../individualPage/Payment/PaymentPage";
import EmployeePage from "../individualPage/EmployeePage/EmployeePage";
import EmployerPage from "../individualPage/EmployerPage/EmployerPage";
import {SysAdminPage} from "../individualPage/SysAdminPage/SysAdminPage";


const styles = {
    img: {
        width: '100px'
    },
    a: {
        display: 'inline-block',
        color: 'black'
    },
    nav: {
        backgroundColor: 'white',
        position: 'fixed',
        top: '0',
        right: '0',
        left: '0',
        zIndex: '1030'
    },
    span: {
        paddingBottom: '30px',
        display: 'block',
        fontSize: '30px',
        color: 'black',
        lineHeight: '1.2',
        textAlign: 'center'
    },
    divSign: {
        zIndex: '999',
        width: '280px',
        position: 'absolute',
        margin: '0 0 0 -140px',
        left: '50%',
        display: 'none',
        paddingLeft: '30px',
        paddingRight: '30px',
        paddingTop: '30px',
        paddingBottom: '30px'
    },
    divFacebookGoogle: {
        paddingBottom: '50px',
        display: 'flex',
        justifyContent: 'center'
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
    }
};
let show = 0;

function sign() {
    document.getElementById("signInForm").style.display = "block";

}

function signNone() {
    document.getElementById("signInForm").style.display = "none";
    document.getElementById("userLogin").value = "";
    document.getElementById("userPassword").value = "";
}


function showSub() {

    if (show === 0) {
        document.getElementById("sub-menu").style.lineStyleType = "none";
        document.getElementById("sub-menu").style.height = "auto";
        document.getElementById("sub-menu").style.overflow = "visible";
        document.getElementById("sub-menu").style.opacity = "1";
        document.getElementById("sub-menu").style.paddingLeft = "calc(100% - 150px)";
        document.getElementById("sub-menu").style.marginTop = "-30px";
        show = 1;
    } else {
        toggleMenuStarStyle();
    }
}

function toggleMenuStarStyle() {
    document.getElementById("sub-menu").style.height = "0";
    document.getElementById("sub-menu").style.overflow = "hidden";
    document.getElementById("sub-menu").style.opacity = "0";
    document.getElementById("sub-menu").style.paddingLeft = "0";
    document.getElementById("sub-menu").style.marginTop = "0";
    show = 0;
}

export const HeaderMenu = ({logo, lang, id = '1'}) => {

    const [showSysAdmin, setShowSysAdmin] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const [showEmployer, setShowEmployer] = useState(false);
    const [showEmployee, setShowEmployee] = useState(false);
    const [showOwner, setShowOwner] = useState(false);
    const [showSecretary, setShowSecretary] = useState(false);
    const [showManager, setShowManager] = useState(false);
    const [showExpert,setShowExpert]=useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [userRole, setUserRoles] = useState([]);

const [isLoading,setIsLoading] = useState(true);

const  fetchingUserFromStorage=()=>{
    setIsLoading(true);
    const resp = AuthService.getCurrentUser();
    setIsLoading(false);
    return resp;
    }


    useEffect(() => {
        const resp = fetchingUserFromStorage();

        if (resp) {
            setUserRoles(resp.roles);
            setCurrentUser(resp);
            setShowSysAdmin(resp.roles.includes("SYSADMIN"));
            setShowAdmin(resp.roles.includes("ADMIN"));
            setShowEmployer(resp.roles.includes('EMPLOYER'));
            setShowEmployee(resp.roles.includes("EMPLOYEE"));
            setShowOwner(resp.roles.includes("OWNER"));
            setShowSecretary(resp.roles.includes("SECRETARY"));
            setShowManager(resp.roles.includes("MANAGER"));
            setShowExpert(resp.roles.includes("EXPERT"));



        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };


    let langConst = [];
    if (lang === 'en') {
        langConst.push('About company');
        langConst.push('Our clients');
        langConst.push('Services');
        langConst.push('Contacts');
        langConst.push('Sign in');
        langConst.push('Sign up');
        langConst.push('password');
        langConst.push('Or login with');
        langConst.push('My page');
    } else {
        langConst.push('О компании');
        langConst.push('Наши клиенты');
        langConst.push('Услуги');
        langConst.push('Контакты');
        langConst.push('Войти');
        langConst.push('Зарегистрироваться');
        langConst.push('пароль');
        langConst.push('Или войти с помощью');
        langConst.push('Моя страница');
    }
    const st = {width: '150px', color: 'white', backgroundColor: 'black', marginLeft: '-23px'};
    const ulStyle = {height: '0', lineStyleType: 'none', overflow: 'hidden', opacity: '0', width: '0'};

if(isLoading) return <></>
    return (
        <section>

            <header className="header" id="header">
                <BrowserRouter>


                    <nav className="navbar navbar-expand-lg " style={styles.nav}>
                        <div className="container-fluid">
                            <div className="d-flex align-items-center">
                                <a href="/">
                                    <img style={styles.img} src={logo} alt=""/>
                                </a>
                            </div>
                            <button aria-label="Toggle navigation" type="button"
                                    className="navbar-toggler-right navbar-toggler">
                                <i className="fa fa-bars" id="fa-bars" onClick={showSub}>
                                    <svg width="1.5em" height="1em" viewBox="0 0 16 16" className="bi bi-list"
                                         id="bi-list"
                                         fill="currentColor"
                                         xmlns="http://www.w3.org/2000/svg" href="#">
                                        <path fillRule="evenodd"
                                              d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                </i>
                            </button>

                            <div className="collapse navbar-collapse">
                                <ul className="ml-auto navbar-nav" id="ul">
                                    <li className="nav-item">
                                        <a aria-haspopup="true" href="#aboutCompany"
                                           className="active  nav-link"
                                           aria-expanded="false" style={styles.a}>{langConst[0]}</a>
                                    </li>
                                    {showAdmin && (
                                        <li className="nav-item">
                                            <Link to={"/admin-page"} className="nav-link" style={styles.a}>
                                                ADMIN
                                            </Link>
                                        </li>
                                    )}
                                    {showSysAdmin && (
                                        <li className="nav-item">
                                            <Link to={"/sysadmin-page"} className="nav-link" style={styles.a}>
                                                SYSADMIN
                                            </Link>
                                        </li>
                                    )}
                                    {showOwner && (
                                        <li className="nav-item">
                                            <Link to={"/owner-page"} className="nav-link" style={styles.a}>
                                                OWNER
                                            </Link>
                                        </li>
                                    )}
                                    {showSecretary && (
                                        <li className="nav-item">
                                            <Link to={"/secretary-page"} className="nav-link" style={styles.a}>
                                                SECRETARY
                                            </Link>
                                        </li>
                                    )}
                                    {showManager && (
                                        <li className="nav-item">
                                            <Link to={"/manager-page"} className="nav-link" style={styles.a}>
                                                MANAGER
                                            </Link>
                                        </li>
                                    )}
                                    {showEmployer && (
                                        <li className="nav-item">
                                            <Link to={"/employer-page"} className="nav-link" style={styles.a}>
                                                EMPLOYER
                                            </Link>
                                        </li>
                                    )}
                                    {showEmployee && (
                                        <li className="nav-item">
                                            <Link to={"/employee-page"} className="nav-link" style={styles.a}>
                                                EMPLOYEE
                                            </Link>
                                        </li>
                                    )}
                                    {showExpert && (
                                        <li className="nav-item">
                                            <Link to={"/expert-page"} className="nav-link" style={styles.a}>
                                                EXPERT
                                            </Link>
                                        </li>
                                    )}


                                    <li className="position-static  nav-item">
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <a aria-haspopup="true" href="#ourClients" className=" nav-link"
                                           aria-expanded="false" style={styles.a}>{langConst[1]}</a>
                                    </li>
                                    <li className="nav-item"><a href="#ourServices" className="nav-link"
                                                                style={styles.a}>{langConst[2]}</a>
                                    </li>
                                    <li className="nav-item">
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <a aria-haspopup="true" className=" nav-link" style={styles.a}
                                           aria-expanded="false" href="#contacs">{langConst[3]}</a>
                                    </li>

                                    <li className="nav-item">
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <a aria-haspopup="true" className=" nav-link" style={styles.a}
                                           aria-expanded="false" href="#contacs">{langConst[3]}</a>
                                    </li>

                                    {/*<li className="nav-item "><a href="#" className="nav-link"*/}
                                    {/*                             style={styles.a} onClick={sign}>{langConst[4]}</a>*/}
                                    {/*</li>*/}

                                    {currentUser ? (

                                        <li className="nav-item">
                                            <a href="/login" className="nav-link" onClick={logOut} style={styles.a}>
                                                LogOut
                                            </a>
                                        </li>

                                    ) : (

                                        <li className="nav-item">
                                            <Link to={"/login"} className="nav-link" style={styles.a}>
                                                Login
                                            </Link>
                                            <Link to={"/payment"} className="nav-link" style={styles.a}>
                                                Pay
                                            </Link>

                                        </li>


                                    )}

                                </ul>
                            </div>
                        </div>


                        <ul id="sub-menu" style={ulStyle}>
                            <li>
                                <a href="#aboutCompany" className="nav-link" style={st}>{langConst[0]}</a>
                            </li>
                            <li>
                                <a href="#ourClients" className="nav-link" style={st}>{langConst[1]}</a>
                            </li>
                            <li>
                                <a href="#ourServices" className="nav-link" style={st}>{langConst[2]}</a>
                            </li>
                            <li>
                                <a href="#contacts" className="nav-link" style={st}>{langConst[3]}</a>
                            </li>


                            {showAdmin && (
                                <li>
                                    <Link to={"/admin-page"} className="nav-link" style={st}>
                                        ADMIN
                                    </Link>
                                </li>
                            )}
                            {showSysAdmin && (
                                <li>
                                    <Link to={"/sysadmin-page"} className="nav-link" style={st}>
                                        SYSADMIN
                                    </Link>

                                </li>
                            )}
                            {showOwner && (
                                <li>
                                    <Link to={"/owner-page"} className="nav-link" style={st}>
                                        OWNER
                                    </Link>
                                </li>
                            )}
                            {showSecretary && (
                                <li>
                                    <Link to={"/secretary-page"} className="nav-link" style={st}>
                                        SECRETARY
                                    </Link>
                                </li>
                            )}
                            {showManager && (
                                <li>
                                    <Link to={"/manager-page"} className="nav-link" style={st}>
                                        MANAGER
                                    </Link>
                                </li>
                            )}
                            {showEmployer && (
                                <li>
                                    <Link to={"/employer-page"} className="nav-link" style={st}>
                                        EMPLOYER
                                    </Link>
                                </li>
                            )}
                            {showEmployee && (
                                <li>
                                    <Link to={"/employee-page"} className="nav-link" style={st}>
                                        EMPLOYEE
                                    </Link>
                                </li>
                            )}
                            {showExpert && (
                                <li>
                                    <Link to={"/expert-page"} className="nav-link" style={st}>
                                        EXPERT
                                    </Link>
                                </li>
                            )}


                            {currentUser ? (

                                <li>
                                    <a href="/login" className="nav-link" onClick={logOut} style={st}>
                                        LogOut
                                    </a>
                                </li>

                            ) : (

                                <li>
                                    <Link to={"/login"} className="nav-link" style={st}>
                                        Login
                                    </Link>

                                    <Link to={"/payment"} className="nav-link" style={st}>
                                        Pay
                                    </Link>


                                </li>

                            )}


                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path="/">
                            <InformationInPicture lang={lang}/>
                        </Route>


                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/payment" component={PaymentPage}/>


                        {userRole.includes('ADMIN') &&  <Route exact path="/admin-page"  component={AdminPage}/>}
                        {userRole.includes('EMPLOYER') &&
                            <Route exact path="/employer-page"><EmployerPage lang={lang}/></Route>}
                        {userRole.includes('EMPLOYEE') &&
                            <Route exact path="/employee-page"><EmployeePage lang={lang}/></Route>}
                        {userRole.includes('SYSADMIN') && <Route exact path="/sysadmin-page"   component={SysAdminPage}/>}
                        {/*{userRole.includes('OWNER') && <Route exact path="/owner-page" component={}/>}*/}
                        {userRole.includes('SECRETARY') && <Route exact path="/secretary-page"><SecretaryPage lang={lang}/></Route>}
                        {userRole.includes('MANAGER') && <Route exact path="/manager-page" component={ManagerPageMain}/>}
                        {userRole.includes('EXPERT') && <Route exact path="/expert-page" component={ExpertPage}/>}

                        <Route path='*' component={IncorrectUrl}/>



                    </Switch>


                </BrowserRouter>
            </header>



        </section>
    );
}


HeaderMenu.propTypes = {
    logo: PropTypes.string,
    telephone: PropTypes.string
};

export default HeaderMenu;
