import React, {useState, useRef} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from "axios";
import authHeader from "../../auth/header";
import {toast} from "react-toastify";
import {Notification} from "../AdminPage/components/Notification";
import validator from "validator/es";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
const PaymentPage = (props) => {



    const [payment, setPayment] = useState();



    const handleInputChange = event => {
        const {name, value} = event.currentTarget;
        setPayment({...payment, [name]: value})

    }
    const [isValid, setIsValid] = useState(false);

    const handleSubmit = event => {
        event.preventDefault()

        if (!isValid) {
            warnEnterAllFieldsNotify('You entered incorrect data!');
            return;
        }

        paymentProcess();

    }

    const validateEmail = (e) => {

        validator.isEmail(e.target.value) && validator.isLength(e.target.value,{min:9,max:70}) ?
            setIsValid(true)
            :
            setIsValid(false) ;

        handleInputChange(e);
    };

    const paymentProcess = () => {
        axios
            .post('http://localhost:8080/api/payment', payment, {headers: authHeader()})
            .then(() => successNotify("Successfully paid !"))

            .catch((err) => errorNotify("Email or sum is not correct"))
    }

    const errorNotify = (error) => {
        toast.error(error, {position: toast.POSITION.TOP_RIGHT});
    }
    const successNotify = (message) => {
        toast.success(message, {position: toast.POSITION.TOP_RIGHT});
    }
    const warnEnterAllFieldsNotify = (message) => {
        toast.warn(message, {position: toast.POSITION.TOP_RIGHT, color: "black"});
    }

    return (


        <div className="container py-5">
            <Notification/>
            <div className="row mb-4" style={{marginTop:'-20px'}}>
                <div className="col-lg-8 mx-auto text-center">
                    <h1 className="display-4">Payment</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <div className="card " style={{height:"600px",marginTop:'-20px'}}>
                        <div className="card-header" style={{height:"550px"}}>


                            <img src={ require('../../images/cards2.PNG') } style={{width: "390px"}}/>

                            <div className="tab-content">

                                <div id="credit-card" className="tab-pane fade show active pt-3">
                                    <Form role="form" onSubmit={handleSubmit}>


                                        <div className="form-group">
                                            <label htmlFor="username">
                                                <h6 style={{color:'black'}}>Card Owner</h6>
                                            </label>
                                            <Input type="text"
                                                   name="email"
                                                   placeholder="Card Owner Email"
                                                   required className="form-control "
                                                   validations={[required]}
                                                   validateEmail
                                            onChange={validateEmail}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cardNumber">
                                                <h6 style={{color:'black'}}>Card number</h6>
                                            </label>
                                            <div className="input-group">
                                                <input type="text" name="cardNumber" placeholder="Valid card number"
                                                       className="form-control " required/>
                                                <div className="input-group-append">
                                            <span className="input-group-text text-muted">
                                                <i className="fab fa-cc-visa mx-1"></i>
                                                <i className="fab fa-cc-mastercard mx-1"></i>
                                                <i className="fab fa-cc-amex mx-1"></i>
                                            </span>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-sm-8">
                                                <div className="form-group"><label><span className="hidden-xs">
                                                    <h6 style={{color:'black'}}>Expiration Date</h6>
                                                </span></label>
                                                    <div className="input-group">
                                                        <input type="number"
                                                               placeholder="MM" name=""
                                                               className="form-control"
                                                               required/>
                                                        <input
                                                            type="number" placeholder="YY" name=""
                                                            className="form-control" required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group mb-4"><label data-toggle="tooltip"
                                                                                        title="Three digit CV code on the back of your card">
                                                    <h6 style={{color:'black'}}>CVV <i className="fa fa-question-circle d-inline"></i></h6>
                                                </label> <input type="text" required className="form-control"/></div>
                                            </div>
                                        </div>



                                        <div className="form-group">
                                            <label htmlFor="username">
                                                <h6 style={{color:'black'}}>Enter sum $</h6>
                                            </label>
                                            <input
                                                type="text"
                                                name="sum"
                                                placeholder="200 $"
                                                onChange={handleInputChange}
                                                   required className="form-control "/>
                                        </div>



                                        <div className="card-footer"/>
                                        <button type="submit"
                                                className="subscribe btn btn-primary btn-block shadow-sm"
                                                // onClick={paymentProcess}
                                        >
                                            Confirm Payment
                                        </button>

                                    </Form>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        </div>


    );
};

export default PaymentPage;
