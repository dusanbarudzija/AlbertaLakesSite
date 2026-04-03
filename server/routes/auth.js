const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

function isValidUsername(username) { // only allow letters and numbers, 3-20 chars
  return (
    typeof username === "string" &&
    /^[A-Za-z0-9]{3,20}$/.test(username)
  );
}

function isValidPassword(password) { // at least 6 chars, at least one letter and one number
  return (
    typeof password === "string" &&
    password.length >= 6 &&
    /[A-Za-z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

router.post('/register', async (req, res) => { // validate input, check for existing user, hash password, start session
  try {
    const { username, password, email } = req.body;


    if (!isValidUsername(username)) {
      return res.status(400).json({
        error: "invalid username"
      });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({
        error: "invalid password"
      });
    }

    const existingUser = await User.findOne({ username }); 
    if (existingUser) {
      return res.status(400).json({
        error: "Username already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({username, email, password: hashedPassword });

    req.session.username = username; // log in new user immediately

    res.status(201).json({message: "Registration successful.", username});
  } catch (error) {
  console.error("REGISTER ERROR:", error);
  res.status(500).json({ message: "Server error during registration." });
}

});


router.post('/login', async (req, res) => { // validate input, find user, compare password, start session
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "missing email or password"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const passwordMatches = await bcrypt.compare(password,user.password);

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    req.session.username = user.username; // store username in session

    res.json({message: "Login successful.", username: user.username, role: user.role});

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Server error during login."
    });
  }
});



router.get('/me', async (req, res) => {
  // get current user
  if (!req.session.username) {
    return res.status(401).json({ message: "Not logged in." });
  }
  res.json({ username: user.username, role: user.role, email: user.email }); });

router.post('/logout', (req, res) => {
  // terminate session
  req.session.destroy(() => {
    res.json({ message: "Logout successful." });
  });
});

// Middleware

async function auth(req, res, next) {
  // check if user is logged in + set req.user
  if (!req.session.username) {
    return res.status(401).json({message: "Not logged in."});
  }

  const user = await User.findOne({username: req.session.username});

  if (!user) {
    return res.status(404).json({message: "User not found."});
  }

  req.user = user;
  next();
}

function requireAdmin(req, res, next) {
  // check if req.user.role is admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Admin access required." });
  }
  next(); 
}

module.exports = { router, auth, requireAdmin };
