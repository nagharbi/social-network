import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CLEAN_AUTH_ERROR, LOGOUT } from "../../constants/actionTypes";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: LOGOUT });
        dispatch({ type: CLEAN_AUTH_ERROR });
        navigate('/');
    };

    return (
        <li onClick={logout}>
            <img src="./img/icons/logout.svg" alt="logout" />
        </li>
    );
};

export default Logout;