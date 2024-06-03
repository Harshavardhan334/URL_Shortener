const shortid=require('shortid');
const url= require('../model/url');


async function generateNewShortUrl(req,res){
    const body=req.body;
    if(!body.url){
        return res.statue(400).json({error:'url is required'});
    }
    const shortId=shortid();

    await url.create({
        shortId : shortId,
        redirectUrl : body.url,
        visitHistory: []
    });

    return res.render('home',{
        id:shortId
    } )
    // return res.json({Id:shortId});
}

async function getAnalytics(req,res){
    const shortId=req.params.shortId;
    const result = await url.findOne({shortId});
    
    return res.json({totalClicks : result.visitHistory.length , analatics : result.visitHistory});
}

async function getFullAnalytics(req,res){
    const allUrls=await url.find({});
    return res.render('analytics',{
        urls:allUrls
    })
}

module.exports={
    generateNewShortUrl,
    getAnalytics,
    getFullAnalytics
}