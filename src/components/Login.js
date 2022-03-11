import React from 'react';
//Styles
import styles from './Login.module.css';
import { Button } from '@material-ui/core';
//Firebase
import { auth, provider } from '../firebase';
const Login = () => {
      const loginOnClick = () => {
            auth.signInWithRedirect(provider);
      };
      return (
            <div className={styles.app}>
                  <div className={styles.login}>
                        <div className={styles.login__container}>
                              <img src='./login-logo.png' alt='Logo' />
                              <div className={styles.login__text}>
                                    <h1>Sign in to WhatsApp</h1>
                              </div>
                              <Button onClick={loginOnClick}>Sign in with Google</Button>
                        </div>
                  </div>
            </div>
      );
};

export default Login;
