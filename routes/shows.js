const {Router} = require('express');
const {Show, User} = require('../models/index');
const {check, validationResult} = require('express-validator');

const showsRouter = Router();

showsRouter.get("/", async (req, res) => {
    console.log(req.query);
    const shows = await Show.findAll({where: req.query.genre ? { genre: req.query.genre } : {} });
    res.json(shows);
});

showsRouter.get("/:id", async (req,res) =>{
    const show = await Show.findByPk(req.params.id);
    res.json(show)
})

showsRouter.get("/:id/users", async (req,res)=>{
    const show = await Show.findByPk(req.params.id);
    const users = await show.getUsers();
    
    res.json(users)
})

showsRouter.put("/:id/availabile", async (req,res)=>{
    let show = await Show.findByPk(req.params.id);
    if (show["available"] == true){
        await Show.update({available: false}, {where: {id : req.params.id}});
    }
    else{
        await Show.update({available: true}, {where: {id : req.params.id}});

    }

    show = await Show.findByPk(req.params.id);

    
    res.json(show)
})

showsRouter.delete("/:id", async (req,res) =>{
    await Show.destroy({where: {id: req.params.id}});
    const shows = await Show.findAll();
    res.json(shows)
})
showsRouter.delete("/:id", async (req,res) =>{
    await Show.destroy({where: {id: req.params.id}});
    const shows = await Show.findAll();
    res.json(shows)
})

showsRouter.post("/", [check("title").not().isEmpty().trim(),check("title").isLength({min: 0, max: 25})], async (req,res) =>{
   
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        await Show.create(req.body);
        const shows = await Show.findAll();
        res.json(shows);

    }
    
    
    
});


module.exports = {showsRouter}