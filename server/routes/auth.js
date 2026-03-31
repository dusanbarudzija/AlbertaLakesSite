const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  // create account, start session
});

router.post('/login', async (req, res) => {
  // check credentials, start session
});

router.get('/me', async (req, res) => {
  // get current user
});

router.post('/logout', (req, res) => {
  // terminate session
});

// Middleware

function auth(req, res, next) {
  // check if user is logged in + set req.user
}

function requireAdmin(req, res, next) {
  // check if req.user.role is admin
}

module.exports = { router, auth, requireAdmin };
