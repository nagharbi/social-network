import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CLEAN_AUTH_ERROR, REGISTER_USER } from "../../constants/actionTypes";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Auth = ({ signin }) => {
    const [isSignIn, setIsSignIn] = useState(signin);
    const dispatch = useDispatch();

    const handleSwitchMode = (active) => {
        setIsSignIn(active);
        dispatch({ type: REGISTER_USER, payload: false });
        dispatch({ type: CLEAN_AUTH_ERROR });
    };

    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li
                        onClick={() => handleSwitchMode(false)}
                        className={isSignIn ? null : "active-btn"}
                    >
                        S'inscrire
                    </li>
                    <li
                        onClick={() => handleSwitchMode(true)}
                        className={isSignIn ? "active-btn" : null}
                    >
                        Se connecter
                    </li>
                </ul>
                {isSignIn ? <SignInForm /> : <SignUpForm />}
            </div>
        </div>
    );
};

export default Auth;
