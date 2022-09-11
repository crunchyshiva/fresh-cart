import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

import './index.css';

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const nav = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert('Invalid Credentails');
    } else {
      dispatch({ type: 'USER', payload: true });
      // window.alert('Login Successfull');
      nav('/');
    }
  };

  return (
    <div className="wrapper">
      <div className="icon">
        <img src='/images/login1.png' alt="" />
      </div>
      <div className="text-center mt-4 name">Sign-In</div>
      <form method="POST" className="p-3 mt-3">
        <div className="form-field  align-items-center">
          <span className="user" />
          <input
            type="text"
            name="userName"
            id="userName"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-field  align-items-center">
          <span className="pass" />
          <input
            type="password"
            name="password"
            id="pwd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button className="btn" onClick={loginUser}>
          Log-In
        </button>
      </form>
      <div className="text-center">
        <NavLink to="#">Forgot password?</NavLink> OR
        <NavLink to="/signup">Sign-Up</NavLink>
      </div>
    </div>
  );
};

export default Login;
