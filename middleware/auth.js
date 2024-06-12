const {getUser} =require('../service/auth');

async function restrictedToLoggedInUserOnly(req,res, next){
    const userUId=req.cookies?.uid;
    if(!userUId) return res.redirect('/login');
    const user=getUser( userUId);
    if(!user)return res.redirect('/login');
    req.user=user;
    next();
}

module.exports={
    restrictedToLoggedInUserOnly
};