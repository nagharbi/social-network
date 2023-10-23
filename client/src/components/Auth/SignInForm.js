import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Input from "./Input";

import { signin } from "../../actions/auth";

const initialState = { email: '', password: '' };

const SignInForm = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signin(formData, navigate));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form action="" onSubmit={handleSubmit} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <br/>
            <Input type="text" name="email" id="email" onHandleChange={handleChange} />
            <br/>
            <label htmlFor="password">Mot de passe</label>
            <br/>
            <Input type="password" name="password" id="password" onHandleChange={handleChange} />
            <br />
            <input type="submit" value="Se connecter" />
        </form>
    );
};

export default SignInForm;
