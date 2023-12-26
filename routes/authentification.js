const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
 const HttpException=require('http-exception');


//REGISTER

router.post("/register", async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    }
    catch (err) {
        res.status(500).json(err)
    }
    
})

//LOGIN

router.post("/login", async (req, res) => {
    console.log({test:req.body});
  try {
    const user = await User.findOne({ username: req.body.username });
      console.log(user)
      if (!user || user.username !== req.body.username) {
          res.status(401).json("Wrong credentials!")
          return
      }
    //   !user && res.status(401).json("Wrong credentials!");
      

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (OriginalPassword !== req.body.password) {
          res.status(404).json("Wrong credentials!")
          return
        
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {expiresIn:"3d"}
    );

    const { password, ...others } = user._doc;

    res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router