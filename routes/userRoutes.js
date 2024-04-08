const express = require('express');
const {userSignup, userLogin, userProfile, updatePassword} = require('../controllers/userControllers');
const {jwtAuthMiddleware} = require('../jwt');
const {userRegisterValidator, userLoginValidator, userPasswordValidator} = require('../userValidation');

const router = express.Router();

router.post("/signup" , userRegisterValidator() ,userSignup);
router.post("/login",userLoginValidator() ,userLogin );
router.get("/profile", jwtAuthMiddleware ,userProfile);
router.put("/profile/password", jwtAuthMiddleware, userPasswordValidator()  ,updatePassword);

module.exports = router;