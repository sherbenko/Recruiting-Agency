import React, {useState} from "react";
import DatePicker from "react-datepicker";


const styles = {
    popupFade: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,

        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'left',
        zIndex: 999999999


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
        height: '500px',
        width: '600px',
        position: 'absolute',
        margin: '100px 0 0 -550px',
        left: '50%',
        display: 'block',
        paddingLeft: '30px',
        paddingRight: '10px',
        paddingTop: '5px',
        paddingBottom: '30px',
        justifyContent: 'left'
    },


    divEnterData: {
        marginBottom: '20px',
        position: 'relative',
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: '20px',
        paddingRight: '20px'
    },
    txt: {
        fontSize: '16px',
        lineHeight: '1.4',
        color: '#999999'
    }

}

export const EmployerContractModal=({isEmployerModal})=>{

    const [employerContract,setEmployerContract] = useState();

    const handleInputChange = event => {
        const {name, value} = event.currentTarget
        setEmployerContract({...employerContract, [name]: value})

    }


    return(

        <div style={styles.popupFade}>

            <link
                href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600,400italic,700'
                rel='stylesheet' type='text/css'/>
            <div className="wrap-login100 animate__animated animate__backInLeft " id="interviewForm"
                 style={styles.divSign}>
                <form className="login100-form validate-form">
                    <div className="cl-btn-7"
                        // onClick={closeInterviewForm}
                    />
                    <br/>
                    <span style={styles.span}>
					            Report criteria
                    </span>

                    <p style={{marginTop:"20px"}}>
                        <p>  Information! </p>
                        We will generate a profit report for the time you
                        specified in .pdf format, if you need a report in .xls
                        format return to the main menu and click "Create report .xls"
                    </p>

                </form>
                <div style={{display: 'flex',marginTop:'100px'}}>
                    <div className="container-login100-form-btn">
                        <button className="login100-form-btn"
                            // onClick={createInterview}

                        >
                            Submit
                        </button>
                    </div>
                    <div className="container-login100-form-btn">
                        <button type='button'
                                className="login101-form-btn"
                                onClick={isEmployerModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}