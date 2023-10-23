import React, { useCallback, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGOUT } from "../constants/actionTypes";
import InMemory from "./Auth/InMemory";
import Logout from "./Auth/Logout";
import UserContext from "./UserContext";

const Navbar = () => {
    const [ currentUser, setCurrentUser ] = useContext(UserContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = useCallback(() => {
        dispatch({ type: LOGOUT });
        navigate('/');
        setCurrentUser({ user: null, token: null });
    }, [dispatch, navigate, setCurrentUser]);

    useEffect(() => {
        console.log('useEffect Navbar is called');
        if (currentUser?.token) {
            const decodedToken = decode(currentUser.token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setCurrentUser({ user: InMemory.getProfile(), token: InMemory.getToken()});
    }, [location, currentUser.token, logout, setCurrentUser]);

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact="true" to="/">
                        <div className="logo">
                            <img src="./img/icon.png" alt="icon" />
                            <h3>Scomperleur</h3>
                        </div>
                    </NavLink>
                </div>
                {currentUser?.user ? (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink exact="true" to="/profil">
                                <h5>Bienvenue {currentUser?.user.username}</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink exact="true" to="/profil">
                                <img src="./img/icons/login.svg" alt="login"/>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
