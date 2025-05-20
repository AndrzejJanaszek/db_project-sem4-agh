import React from "react";

const RegisterUser = () => {
  return (
    <div>
      <form action="">
        <label>
          <p>imie:</p>
          <input type="text" />
        </label>
        <label>
          <p>nazwisko:</p>
          <input type="text" />
        </label>
        <label>
          <p>email:</p>
          <input type="email" />
        </label>
        
        <section>
          <h3>Adres</h3>
          <label>
            <p>miasto</p>
            <input type="text" />
          </label>
          <label>
            <p>ulica</p>
            <input type="text" />
          </label>
          <label>
            <p>kod pocztowy</p>
            <input type="text" />
          </label>
        </section>
        <label>
          <p>hasło</p>
          <input type="password" />
        </label>
        <label>
          <p>powtórz hasło</p>
          <input type="password" />
        </label>

        <button className='btnGreen'>Zarejestruj</button>
      </form>
    </div>
  );
};

export default RegisterUser;
