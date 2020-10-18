import React from "react";


export const IncorrectUrl = () => {



    return (
        <div className="container">
            <header className="jumbotron">
                <h1> Url {window.location.pathname} is not correct </h1>
                <h2>404</h2>

            </header>
        </div>
    );
};

