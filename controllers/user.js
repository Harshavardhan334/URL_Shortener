const User = require('../model/user');
const { v4: uuidv4 } = require('uuid');
const { setUser, getUser } = require('../service/auth');

async function handleCreateUser(req, res) {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).render('signup').json({
                message: "Email already used"
            });
        }

        user = await User.create({
            name,
            email,
            password
        })

        return res.render('home');
    } catch (err) {
        return res.status(400).json({
            'error': err.message
        })
    }
}

async function handleLoginUser(req, res) {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email, password });

        if (!user)
          return res.render("login", {
            error: "Invalid Username or Password",
          });
        
        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie('uid', sessionId);

        return res.render('home');
    } catch (err) {
        return res.status(400).json({
            'error': err.message
        })
    }
}


module.exports = {
    handleCreateUser,
    handleLoginUser
}