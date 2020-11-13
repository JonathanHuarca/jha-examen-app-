const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require('../config/auth') 
const Task = require('../models/task');
//login page
router.get('/', (req,res)=>{
    res.render('welcome');
})
//register page
router.get('/register', (req,res)=>{
    res.render('register');
})
router.get('/dashboard',ensureAuthenticated,async (req,res)=>{
    const tasks = await Task.find();
    res.render('dashboard',{
        user: req.user, tasks
    });
})

//--------------------------CRUD-----------------------------------

router.post('/dashboard/add',ensureAuthenticated, async (req, res, next) => {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/dashboard');
  });
  
  router.get('/dashboard/turn/:id',ensureAuthenticated, async (req, res, next) => {
    let { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/dashboard');
  });
  
  
  router.get('/dashboard/edit/:id',ensureAuthenticated, async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    console.log(task)
    res.render('edit', { user: req.user, task });
  });
  
  router.post('/dashboard/edit/:id',ensureAuthenticated ,async (req, res, next) => {
    const { id } = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/dashboard');
  });
  
  router.get('/dashboard/delete/:id',ensureAuthenticated ,async (req, res, next) => {
    let { id } = req.params;
    await Task.remove({_id: id});
    res.redirect('/dashboard');
  });


module.exports = router; 