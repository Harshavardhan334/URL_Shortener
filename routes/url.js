const express=require('express');
const {generateNewShortUrl, getAnalytics, getFullAnalytics}=require('../controllers/url');

const router=express.Router();

router.post('/', generateNewShortUrl);   
router.get('/analytics/:shortId', getAnalytics);
router.get('/analytics', getFullAnalytics);

module.exports=router;  