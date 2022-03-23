import React from 'react';
//Styles
import './Login.css';
import { Button } from '@material-ui/core';
//Firebase
import { auth, provider } from '../firebase';
const Login = () => {
    const loginOnClick = () => {
        auth.signInWithRedirect(provider);
    };
    return (
        <div className='app'>
            <div className='login'>
                <div className='login__container'>
                    <img src='./login-logo.png' alt='Logo' />
                    <div className='login__text'>
                        <h1>Sign in to WhatsApp</h1>
                    </div>
                    <Button onClick={loginOnClick}>Sign in with Google</Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
