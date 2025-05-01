import React from 'react';

const Login = () => {
    return (
        <div>
            <form action="">
                <label htmlFor="">
                    <p>email</p>
                    <input type="text" />
                </label>
                <label htmlFor="">
                    <p>Hasło</p>
                    <input type="text" />
                </label>
                <button>Zaloguj</button>
            </form>
        </div>
    );
}

export default Login;
