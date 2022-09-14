import React, { useEffect, useState } from 'react';
import './contact.css';


const Contact = () => {
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const userContact = async () => {
    try {
      const res = await fetch('/getdata', {
        method: 'GET',
        headers: {
          'content-Type': 'application/json',
        },
      });

      const data = await res.json();
      console.log(data);
      setUserData({
        ...userData,
        name: data.name,
        phone: data.phone,
        email: data.email,
      });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  // we are storing data in states
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  // send the data to backend
  const contactForm = async (e) => {
    e.preventDefault();
    const { name, phone, email, address, message } = userData;
    const res = await fetch('/contact', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        address,
        message,
      }),
    });
    const data = await res.json();
    if (!data) {
      console.log('message not send');
    } else {
      alert('message successfully send');
      setUserData({ ...userData, message: '' });
    }
  };

  return (
    <>
      <section className="contactus-section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="row">
                <div className="contact-leftside col-12 col-lg-5">
                  <h1 className="main-heading fw-bold">
                    Connect With Our <br /> Expert Support Team.
                  </h1>
                  <p className="main-hero-para">
                    Please get in touch and our expert support team will answer
                    all your questions.
                  </p>
                  <figure>
                    <img
                      src='/images/contact.webp'
                      alt="contatUsImg"
                      className="img-fluid"
                    />
                  </figure>
                </div>

                {/* right side contact form  */}
                <div className="contact-rightside col-12 col-lg-7">
                  <form method="POST">
                    <div className="row">
                      <div className="col-12 contact-input-feild">
                        <input
                          type="text1"
                          name="name"
                          id=""
                          className="form-control"
                          value={userData.name}
                          onChange={handleInputs}
                          placeholder="User Name"
                        />
                      </div>
                      {/* <div className="col-12 col-lg-6 contact-input-feild">
                        <input
                          type="text1"
                          name=""
                          id=""
                          className="form-control"
                          value={userData.name}
                          onChange={handleInputs}
                          placeholder="Last Name"
                        />
                      </div> */}
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-6 contact-input-feild">
                        <input
                          type="text1"
                          name="phone"
                          id=""
                          className="form-control"
                          value={userData.phone}
                          onChange={handleInputs}
                          placeholder="Phone Number "
                        />
                      </div>
                      <div className="col-12 col-lg-6 contact-input-feild">
                        <input
                          type="text1"
                          name="email"
                          id=""
                          className="form-control"
                          value={userData.email}
                          onChange={handleInputs}
                          placeholder="Email ID"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 contact-input-feild">
                        <input
                          type="text1"
                          name="address"
                          id=""
                          className="form-control"
                          value={userData.address}
                          onChange={handleInputs}
                          placeholder="Add Address"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 ">
                        <input
                          type="text1"
                          name="message"
                          id=""
                          className="form-control"
                          value={userData.message}
                          onChange={handleInputs}
                          placeholder="Enter Your Message"
                        />
                      </div>
                    </div>
                    <div class="form-check form-checkbox-style">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked}"
                      />
                      <label
                        class="form-check-label"
                        className="main-hero-para"
                      >
                        I agree that the FreshSense team may contact me at the
                        email address or phone number above
                      </label>
                    </div>

                    <button
                      id="button"
                      type="submit"
                      className="btn btn-style"
                      onClick={contactForm}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
