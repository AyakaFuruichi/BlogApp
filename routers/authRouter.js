const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile, updateUser } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

//auth routes
// /api/signup
router.post('/signup', signup);

// /api/signin
router.post('/signin', signin);

// /api/logout
router.get('/logout', logout);

// /api/me
router.get('/me', isAuthenticated, userProfile);

// /api/update//me
router.put('/update/me', isAuthenticated, updateUser);

module.exports = router;