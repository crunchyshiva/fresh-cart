const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
  res.send('hello worlds from the server router.js');
});
// router.post('/register', (req, res) => {
//   const{ name,email,phone,work,password,cpassword}=req.body;
//   console.log(name);
//   console.log(email);
//   //  res.json({message: req.body});
// });
router.post('/register', async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: 'plz filled the field properly' });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: 'Email already exist' });
    } else if (password != cpassword) {
      return res.status(422).json({ error: 'password are not match' });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();
      res.status(201).json({ message: 'user register successfuly' });
    }
  } catch (err) {
    console.log(err);
  }
});
// Signin Route
router.post('/signin', async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'please fill your data' });
    }
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();
      console.log(token);
      res.cookie('jwtoken', token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: 'invalid credential' });
      } else {
        res.json({ messase: 'user signin successfully' });
      }
    } else {
      res.status(400).json({ error: 'invalid credential' });
    }
  } catch (err) {
    console.log(err);
  }
});

// about us ka page
router.get('/about', authenticate, (req, res) => {
  console.log('Hello my about');
  res.send('hello about worlds from the server');
});

// get user data for contact page
router.get('/getdata', authenticate, (req, res) => {
  console.log('Hello my about');
  res.send(req.rootUser);
});

router.get('/contact', authenticate, async (req, res) => {
  try {
    const { name, phone, email, address, message } = req.body;
    if (!name || !phone || !email || !address || !message) {
      console.log('error in contact form');
      return res.json({ error: 'plz.. fill the contact form properly:' });
    }
    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        phone,
        email,
        address,
        message,
      );
      await userContact.save();
      res.status(201).json({ message: 'user message successfully' });
    }
  } catch (error) {
    console.log(error);
  }
});

// Logout ka page

router.get('/logout', (req, res) => {
  console.log('Hello my logout page');
  res.clearCookie('jwtoken', { path: '/' });
  res.status(200).send('User logout');
});

module.exports = router;
