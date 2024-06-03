const express=require('express');
const urlRoute=require('./routes/url');
const path=require('path');
const {connectMongoDb}=require('./connect');
const url=require('./model/url');
const staticRoute=require('./routes/staticRouter');

const app=express();
const PORT=8000;

connectMongoDb('mongodb://localHost:27017/short-url')
.then(()=>console.log("Database Connected"));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/url', urlRoute);
app.use('/', staticRoute);




app.get('/url/:shortId', async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await url.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{
                timestamp: Date.now()
            }
        }
    })
    if(entry)res.redirect(entry.redirectUrl);
    else{
        return res.status(404).send("url not found");
    }
})


app.listen(PORT, ()=>console.log(`Server has started at PORT: ${PORT}`));
