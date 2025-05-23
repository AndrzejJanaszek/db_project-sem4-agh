import React from 'react';

import style from './css/login.module.css'

const Login = () => {
    return (

        <div className={style.loginContainer}>
            <form action="" method='post' className={style.loginForm}>
                <label htmlFor="email" className={style.loginFormLabel}>
                    <p>email</p>
                    <input type="text" name='email'/>
                </label>
                <label htmlFor="password" className={style.loginFormLabel}>
                    <p>hasło</p>
                    <input type="password" name='password'/>
                </label>
                <button className='btnGreen' type='submit'>Zaloguj</button>
            </form>
        </div>
    );
}

export default Login;
