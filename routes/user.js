const express=require('express');
const {
    handleCreateUser,
    handleLoginUser
}=require("../controllers/user");
const router=express.Router();

router.post('/signup', handleCreateUser);
router.post('/login', handleLoginUser);

module.exports= router;