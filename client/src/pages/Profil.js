import React from "react";
import Auth from "../components/Auth";

const Profil = () => {
    return (
        <div className="profil-page">
            <div className="log-container">
                <Auth signin={false} />
                <div className="img-container">
                    <img src="./img/log.svg" alt="img-log" />
                </div>
            </div>
        </div>
    );
};

export default Profil;
