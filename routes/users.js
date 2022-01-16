const express = require('express');
const User = require('../models/users');

const router = express.Router();

router.post('/create', async (req, res)=>{
  try {
    let user = new User()
    user.setPassword(req.body.password);
    delete req.body.password;
    user.set(req.body)
    await user.save()
    if(user){
      res.status(201).json({msg: 'Account Creation Was Successful', status: true})
    }
  }
  catch(e){
    res.status(502).send({msg: 'Account Creation Was Not Successful', status: false});
  }

})

router.post('/login',  async (req, res) => {
  try{
    let user = await User.findOne({email: req.body.email});
    if(user.isValidPassword(req.body.password)){
      let token = user.genJwt();
      user.password = {};
      res.json({user, token:token, status: true, msg: `Logged in as ${user.firstName}`})
    }
    else{
      res.status(401).json({msg: 'Invalid Credentials', status: false})
    }

  }
  catch (e){
    res.status(401).json({msg: 'Invalid Credentials', status: false})
  }
});


module.exports = router;
