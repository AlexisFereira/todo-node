const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

router.get('/login', auth.loginView);
router.post('/login', auth.loginIn);
router.post('/logout', auth.loginOut);
router.get('/sign-up', auth.signUpView);
router.post('/sign-up', auth.signUp);
router.get('/recover-pass', auth.recoverPassView);
router.get('/auth/confirm-account/:id', auth.confirmAccount);

module.exports = router;
