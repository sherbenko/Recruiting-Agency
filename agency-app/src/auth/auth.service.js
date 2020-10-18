import axios from 'axios';


const API_URL = "http://localhost:8080/api/";

const login = (email, password) => {
        return axios
            .post(API_URL + "login", {
                email,
                password,
            })
            .then((response) => {
                let tok = response.data.token;
                if (tok) {
                    localStorage.setItem("response", JSON.stringify(response.data));

                }

                return response.data;
            });

};

const logout = () => {
    axios
        .get(API_URL + "logout")
        .then((response) => {
            return response.data;
        });
    localStorage.removeItem("response");


};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("response"));
};

export default {
    login,
    logout,
    getCurrentUser,
};