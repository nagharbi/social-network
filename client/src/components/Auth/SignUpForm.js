import React, { useEffect, useState } from "react";
import SignInForm from "./SignInForm";
import Input from "./Input";
import { signup } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const initialState = { username: '', email: '', password: '',  confiramtion: '' };

const SignUpForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [errorTerms, setErrorTerms] = useState('');
    const [errorConfirmation, setErrorConfirmation] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errors = useSelector((state) => state.errorsReducer);
    const auth = useSelector((state) => state.authReducer);

    useEffect(() => {
        console.log('useEffect SingUpForm is called');
        setErrorUsername(errors.username);
        setErrorPassword(errors.password);
        setErrorEmail(errors.email);
        setIsSubmitted(auth.isRegistred);
    }, [errors, auth]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorTerms('');
        setErrorConfirmation('');

        if (acceptTerms && formData.password === formData.confiramtion) {
            dispatch(signup(formData, navigate));
        }

        if (!acceptTerms) {
            setErrorTerms('Veuillez valider les conditions générales');
        }
    
        if (formData.password !== formData.confiramtion) {
            setErrorConfirmation('Les mots de passe ne correspondent pas');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAcceptTermChange = () => {
        setAcceptTerms((prevAcceptTerms) => !prevAcceptTerms);
    };

    return (
        <>
            {isSubmitted ? (
                <>
                    <SignInForm />
                    <span></span>
                    <h4 className="success">
                        Enregistrement réussi, veuillez-vous connecter
                    </h4>
                </>
            ) : (
                <form action="" onSubmit={handleSubmit} id="sign-up-form">
                    <label htmlFor="username">Pseudo</label>
                    <br/>
                    <Input type="text" name="username" id="username" onHandleChange={handleChange} />
                    <div className="error">{errorUsername}</div>
                    <br/>
                    <label htmlFor="email">Email</label>
                    <br/>
                    <Input type="text" name="email" id="email" onHandleChange={handleChange} />
                    <div className="error">{errorEmail}</div>
                    <br/>
                    <label htmlFor="password">Mot de passe</label>
                    <br/>
                    <Input type="password" name="password" id="password" onHandleChange={handleChange} />
                    <div className="error">{errorPassword}</div>
                    <br/>
                    <label htmlFor="confiramtion">Confirmer mot de passe</label>
                    <br/>
                    <Input type="password" name="confiramtion" id="confiramtion" onHandleChange={handleChange} />
                    <div className="error">{errorConfirmation}</div>
                    <br/>
                    <input type="checkbox" name="terms" id="terms" value={acceptTerms} onChange={handleAcceptTermChange}/>
                    <label htmlFor="terms">
                        J'accepte les{" "}
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            conditions générales
                        </a>
                    </label>
                    <div className="error">{errorTerms}</div>
                    <br/>
                    <input type="submit" value="Inscription" />
                </form>
            )}
        </>
    );
};

export default SignUpForm;