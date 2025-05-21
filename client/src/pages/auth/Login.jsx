import React from 'react';

import style from './css/login.module.css'

const Login = () => {
    return (

        <div className={style.loginContainer}>
            <form action="" className={style.loginForm}>
                <label htmlFor="" className={style.loginFormLabel}>
                    <p>email</p>
                    <input type="text" />
                </label>
                <label htmlFor="" className={style.loginFormLabel}>
                    <p>hasło</p>
                    <input type="password" />
                </label>
                <button className='btnGreen'>Zaloguj</button>
            </form>
        </div>
    );
}

export default Login;
