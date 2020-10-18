import React, {useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import AuthService from "../auth.service";


const required = (value) => {
    if (!value) {

        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
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
const Login = (props) => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);


        AuthService.login(email, password).then(
            () => {
                props.history.push("/");
                window.location.reload();

            },
            (error) => {

                if (error.response.data.status === 401 || error.response.data.status === 404) {
                    setLoading(false);
                    setMessage( error.response.data.error);
                }
            }
        );

    };


    return (
        <div className="col-md-12">

            <div className="card card-container" style={{height:'600px'}}>
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleLogin} className="login100-form validate-form" >

                    <div className="form-group" style={styles.divEnterData}>
                        <label htmlFor="Email">Email</label>
                        <Input
                            type="text"
                            className="input100"
                            style={styles.input}
                            name="Email"
                            value={email}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                        <span className="focus-input100"/>
                    </div>

                    <div className="form-group" style={styles.divEnterData}>
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            className="input100"
                            name="password"
                            value={password}
                            style={styles.input}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                        <span className="focus-input100"/>
                    </div>

                    <div className="container-login100-form-btn">
                        <button className="login100-form-btn" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"/>
                            )}
                            <span>Login</span>
                        </button>
                    </div>
                    <br/>
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <div style={{textAlign: 'center', paddingTop: '20px', paddingBottom: '10px'}}>
                        <span style={styles.txt}>Or login with</span>
                    </div>
                    <div style={styles.divFacebookGoogle}>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}

                        <a href="#" className="login100-social-item">
                            <img
                                src="https://www.freeiconspng.com/uploads/facebook-png-icon-follow-us-facebook-1.png"
                                alt="FACEBOOK" style={{width: "30px"}}/>
                        </a>

                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" className="login100-social-item">
                            <img
                                src="https://prooriginal.ru/image/catalog/demo/brendy/photo.jpg"
                                alt="GOOGLE"/>
                        </a>
                    </div>
                </Form>
            </div>
            <div id="dropDownSelect1"/>
            <script src="../../jquery-3.2.1.min.js"/>
        </div>


    );
};

export default Login;
