const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const Task = require('../models/usuarios')

router.get('/', async(req,res)=>{
    const tasks = await Task.find();
    console.log(tasks);
    res.send(tasks);
});

router.post('/add', async(req,res)=>{
    const task=new Task(req.body);
    await task.save();
    res.send(task);
});

router.post('/addfriend/:id1/:id2', async(req,res)=>{
    const {id1,id2}= req.params;
    const task=await Task.update({"id": id1},{$push:{"friends":id2}});
    const task2=await Task.update({"id": id2},{$push:{"friends":id1}});
    res.send(task);
});

router.post('/addReq/:id1/:id2', async(req,res)=>{
    const {id1,id2}= req.params;
    const task=await Task.update({"id": id1},{$push:{"friendsReq":id2}});
    res.send(task);
});

//ELIMINAR AMISTAD
router.post('/delfriend/:id1/:id2', async(req,res)=>{
    const {id1,id2}= req.params;
    const task=await Task.update({"id": id1},{$pull:{"friends":id2}});
    const task2=await Task.update({"id": id2},{$pull:{"friends":id1}});
    res.send(task);
});
//ELIMINAR SUGERENCIA
router.post('/delReq/:id1/:id2', async(req,res)=>{
    const {id1,id2}= req.params;
    const task=await Task.update({"id": id1},{$pull:{"friendsReq":id2}});
    res.send(task);
});


router.get('/edit/:id', async (req,res)=>{
    const {id} = req.params;
    const task= await Task.find({"id":id});
    res.send(task);
});

router.post('/edit/:id', async(req,res)=>{
const {id}= req.params;
const task=await Task.update({"id": id},{$set:req.body});
console.log(req.body);
res.send(task);
});

router.delete('/delete/:id', async(req,res)=>{
    const {id} = req.params;
    const answer=await Task.remove({id:id});
    res.send(answer);
});
module.exports=router;