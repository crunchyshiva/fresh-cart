import React from 'react';
import { NavLink } from 'react-router-dom';

import './index.css';

function About() {
  return (
    <>
      <div className="about-form" className="container">
        <div className="about-section">
          <h1>About Us</h1>
          {/* <p>Some text about who we are and what we do.</p> */}
          <p>
            We have launched an online Shopping Website.That we aim to carry in
            the future to highest heights.We are providing good products with
            discount and good customer service.
          </p>
        </div>
        {/* <h2 style={{ textAlign: 'center' }}>Our Team</h2> */}
        <div className="row">
          <div className="column">
            <div className="card">
              <img src='/images/sanjay.jpg' alt="Jane" />
              <div className="card-section">
                <h2>Sanjay Singh</h2>
                <p className="title">CEO &amp; Founder</p>
                {/* <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
                <p className="email1">spdshailsingh@gmail.com</p>
                <p>
                  <NavLink to="/Contact">
                    <button className="button">Contact</button>
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img src='/images/shivam.jpg' alt="Mike" />
              <div className="card-section">
                <h2>Shivam Pathak</h2>
                <p className="title">Web Developer &amp; Co-Founder</p>
                {/* <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
                <p className="email1">Crunchyshiva@gmail.com</p>
                <p>
                  <NavLink to="/Contact">
                    <button className="button">Contact</button>
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img src='/images/rahul.jpg' alt="John" />
              <div className="card-section">
                <h2>Rahul Kumar</h2>
                <p className="title">Back-End Developer</p>
                {/* <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
                <p className="email1">Rahulkumaramazon.in@gmail.com</p>
                <p>
                  <NavLink to="/Contact">
                    <button className="button">Contact</button>
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
