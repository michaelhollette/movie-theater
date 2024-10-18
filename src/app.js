const express = require('express')

const {User,Show} = require("../models/index");
const {usersRouter} = require('../routes/users.js')
const {showsRouter} = require('../routes/shows.js')



const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}));
app.use('/users', usersRouter)
app.use('/shows', showsRouter);
;

module.exports = {app}