import React, {useEffect, useState} from 'react';
import "../../cssForIndividualPage/animate.css";
import "../../cssForIndividualPage/icomoon.css";
import "../../cssForIndividualPage/simple-line-icons.css";
import "../../cssForIndividualPage/magnific-popup.css";
import "../../cssForIndividualPage/style.css";
import "../../startPage/SignIn.css";
import axios from "axios";
import authHeader from "../../auth/header";

const styles = {
    select100: {
        height: '62px',
        border: 'none',
        outline: 'none',
        marginBottom: '20px',
        position: 'relative',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '20px'
    },
    divEnterData: {
        marginBottom: '20px',
        position: 'relative',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '20px'
    },
    input: {
        fontSize: '16px',
        color: '#000000',
        lineHeight: '1.2',
        height: '62px',
        background: 'transparent',
        padding: '0 20px 0 23px'
    },
    span: {
        paddingBottom: '30px',
        display: 'block',
        fontSize: '30px',
        color: 'black',
        lineHeight: '1.2',
        textAlign: 'center'
    }
};

function EmployerApplication(props) {

    const {endDate} = props;
    const [professions, setProfessions] = useState({professions: []})
    useEffect(() => {
        getProfessions();
    }, [])
    const getProfessions = () => {
        axios
            .get("http://localhost:8080/profession/all", {headers: authHeader()})
            .then(data => {
                setProfessions({professions: data.data})
            })
            .catch(err => alert(err))

    }
    const createApp = () => {
        let address = {
            street: document.getElementById('street').value,
            building: document.getElementById('building').value,
            apartment: 1
        };

        axios
            .post('http://localhost:8080/address/create', address, {headers: authHeader()})
            .then(resp => {
                let app = {
                    price: 0,
                    agencyId: 1, employerId: 1, creationDate: Date.now(),
                    endDate: endDate, statusName: 'NOT REVIEWED',
                    professionName: document.getElementById('profession').value,
                    salary: document.getElementById('salary').value,
                    employmentTypeName: 'employment_type',
                    experienceName: document.getElementById('experience').value,
                    ageRestrictionName: document.getElementById('age').value,
                    countryName: 'Belarus',
                    cityName: 'Minsk',
                    addressId: resp.data, comment: document.getElementById('comment').value
                }

                axios
                    .post('http://localhost:8080/employerApplication/create', app, {headers: authHeader()})
                    .then(()=>{setProfessions(professions)})

                    .catch((err) => alert(err))
            })
            .catch((err) => alert(err))

    }
    return (
        <>
            <span className="login100-form-title p-b-37" style={styles.span}>Create application</span>

            <div style={styles.select100}>
                <select style={styles.select100} id="profession">
                    <option value="" disabled selected>Profession</option>
                    {professions.professions.map(val =>
                        <option style={styles.option100} key={val.id} value={val.name}
                        >{val.name}</option>)}
                </select>
                <span className="focus-input100"/>
            </div>

            <div style={styles.divEnterData}>
                <input className="input100" type="text" id="salary" style={styles.input}
                       placeholder="Min salary"/>
                <span className="focus-input100"/>
            </div>
            {/*<div style={styles.divEnterData}>*/}
            {/*    <input className="input100" type="text" id="workDay" style={styles.input}*/}
            {/*           placeholder="Рабочий график"/>*/}
            {/*    <span className="focus-input100"/>*/}
            {/*</div>*/}
            <div style={styles.select100}>
                <select style={styles.select100} id='experience'>
                    <option value="" disabled selected>Experience</option>
                    <option value="Up to 1 year">Up to 1 year</option>
                    <option value="1 - 3 years">1 - 3 years</option>
                    <option value="3 - 5 years">3 - 5 years</option>
                    <option value="5 - 8 years">5 - 8 years</option>
                    <option value="Over 8 years">Over 8 years</option>
                </select>
                <span className="focus-input100"/>
            </div>

            <div style={styles.select100}>
                <select style={styles.select100} id='age'>
                    <option value="" disabled selected>Age restriction</option>
                    <option value="-">-</option>
                    <option value="Up to 30 years">Up to 30 years old</option>
                    <option value="Up to 40 years">Up to 40 years old</option>
                </select>
                <span className="focus-input100"/>
            </div>

            {/*<div style={styles.select100}>*/}
            {/*    <select style={styles.select100} name="countryId" value={agency.countryId}*/}
            {/*            onChange={handleInputCountryChange}>*/}
            {/*        <option style={styles.option100}>Country</option>*/}
            {/*        {allCountries.map(country =>*/}
            {/*            <option style={styles.option100} key={country.id} value={country.id}*/}
            {/*            >{country.name}</option>)}*/}
            {/*    </select>*/}
            {/*    <span className="focus-input100"/>*/}
            {/*</div>*/}

            {/*<div style={styles.select100}>*/}
            {/*    <select style={styles.select100} name="cityId" value={agency.cityId}*/}
            {/*            onChange={handleInputChange}>*/}
            {/*        <option style={styles.option100}>City</option>*/}
            {/*        {allCities.map(city =>*/}
            {/*            <option style={styles.option100} key={city.id} value={city.id}*/}
            {/*            >{city.name}</option>)}*/}
            {/*    </select>*/}
            {/*    <span className="focus-input100"/>*/}
            {/*</div>*/}

            <div style={styles.divEnterData}>
                <input className="input100" type="text" id="country" style={styles.input}
                       placeholder="Страна проживания соискателя"/>
                <span className="focus-input100"/>
            </div>

            <div style={styles.divEnterData}>
                <input className="input100" type="text" id="city" style={styles.input}
                       placeholder="Город проживания соискателя"/>
                <span className="focus-input100"/>
            </div>

            <div style={styles.divEnterData}>
                <input className="input100" type="text" id="street" style={styles.input}
                       placeholder="Street"/>
                <span className="focus-input100"/>
            </div>
            <div style={styles.divEnterData}>
                <input className="input100" type="text" id="building" style={styles.input}
                       placeholder="Building"/>
                <span className="focus-input100"/>
            </div>

            <div style={styles.divEnterData}>
                <input className="input100" type="text" id="comment" style={styles.input}
                       placeholder="Comment"/>
                <span className="focus-input100"/>
            </div>

            <div className="container-login100-form-btn">
                <button className="login100-form-btn" onClick={createApp}>Create</button>
            </div>
        </>
    )
}

export default EmployerApplication;