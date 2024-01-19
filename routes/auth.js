const router = require ('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
// Register
router.post('/register',async(req,res)=>{
    try {
        const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,salt);
        const newuser = new User({
            username : req.body.username,
            email  : req.body.email,
            password : hashPassword
        });
        const user = await  newuser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(400).json("Wrong credentials")

        const validated = await bcrypt.compare(req.body.password,user.password)
        !validated && res.status(400).json("Wrong credentials !")
        const {password , ...others } = user._doc
        res.status(200).json(others)
    } catch (error) {
        console.log({error : "Some error occurred"});
    }
})
module.exports = router