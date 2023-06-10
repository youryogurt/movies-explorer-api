const express = require('express');

const {
  updateUserProfile,
  getCurrentUserInfo,
} = require('../controllers/users');

const {
  updateUserProfileValidation,
} = require('../validation/users');

const router = express.Router();

router.get('/me', getCurrentUserInfo);
router.patch('/me', updateUserProfileValidation, updateUserProfile);

module.exports = router;
