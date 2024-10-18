const {Router} = require('express');
const {Show, User} = require('../models/index');
const {check, validationResult} = require('express-validator');

const usersRouter = Router();

usersRouter.get("/", async (req,res) =>{
    const users = await User.findAll();
    res.json(users)
})

usersRouter.get("/:id", async (req,res) =>{
    const user = await User.findByPk(req.params.id);
    res.json(user)
})

usersRouter.get("/:id/shows", async (req,res)=>{
    const user = await User.findByPk(req.params.id);
    const shows = await user.getShows();
    
    res.json(shows)
})

usersRouter.put("/:id/:show", async (req,res) =>{
    let user = await User.findByPk(req.params.id);
    user.addShow(req.params.show)
    user = await User.findByPk(req.params.id);
    const shows = await user.getShows();
    res.json(shows)

    
})
usersRouter.post("/", [check("username").isEmail()], async (req,res) =>{
   
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        await User.create(req.body);
        const users = await User.findAll();
        res.json(users);

    }
    
    
    
});

module.exports = {usersRouter}