import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FcPhone } from 'react-icons/fc';
import { RiAccountCircleLine } from 'react-icons/ri';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineEmail } from 'react-icons/md';
import { MdWork } from 'react-icons/md';
import { MdPassword } from 'react-icons/md';

import './index.css';

const Signup = () => {
  const nav = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    work: '',
    password: '',
    cpassword: '',
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });

    const data = await res.json();

    if (data.status === 422 || !data) {
      window.alert('Invalid Registration');
      console.log('Invalid Registration');
    } else {
      window.alert('Registration Successfull');
      console.log('Successfull Registration');
      nav('/Login');
    }
  };

  return (
    <>
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <div className="icon1">
                <img src='/images/signuppic.jpg' alt="" />
              </div>
              <div id="shivam" className="text-center name">
                Sign-Up
              </div>
              <form
                method="POST"
                className="registration-form"
                id="registration-form"
              >
                <div className="form-group">
                  <label htmlFor="name">
                    <i class="account">
                      <RiAccountCircleLine size={25} />
                    </i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <i class="email">
                      <MdOutlineEmail size={25} />
                    </i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    <i class="phone">
                      <FcPhone size={25} />
                    </i>
                  </label>
                  <input
                    type="phone"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="Your Phone Number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="work">
                    <i class="work">
                      <MdWork size={25} />
                    </i>
                  </label>
                  <input
                    type="work"
                    name="work"
                    id="work"
                    autoComplete="off"
                    value={user.work}
                    onChange={handleInputs}
                    placeholder="Your Profession"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <i class="password">
                      <MdPassword size={25} />
                    </i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Your password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cpassword">
                    <i class="cpassword">
                      <RiLockPasswordLine size={25} />
                    </i>
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    autoComplete="off"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder="Confirm Your Password"
                  />
                </div>
                <span className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="Submit"
                    onClick={PostData}
                  />
                </span>
              </form>
            </div>
            <br />
            <NavLink to="/Login" className="signup-image-link">
              <b className="bold"> I'm alredy registered </b>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
