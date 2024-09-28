const express = require('express');
const router = express.Router();
const multer = require('multer');
const { handleRegisterUser, handleLoginUser } = require('../controller/user');

const upload = multer({storage : multer.memoryStorage()});

router.post('/signup',handleRegisterUser)
router.post('/login',handleLoginUser)

module.exports = router;