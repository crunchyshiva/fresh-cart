const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const name = req.cookies.name;
    const contact = req.cookies.contactNumber;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await User.findOne({
      'name':req.cookies.name,
      'contact':req.cookies.contactNumber,
      _id: verifyToken._id,
      'tokens.token': token,
    });
    if (!rootUser) {
      throw new Error('User not found');
    }
    req.name = name
    req.contact = contact
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (err) {
    res.status(401).send('unauthorized:no token provided');
    console.log(err);
  }
};

module.exports = Authenticate;
