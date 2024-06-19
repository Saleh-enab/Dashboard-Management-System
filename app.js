const express = require('express')
const morgan = require('morgan')
const expressLayout = require('express-ejs-layouts')
const router = require('./server/routes/mainRoutes')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')
require('dotenv').config()

const app = express()

//Middlewares setup
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(express.static('images'))
app.use(morgan('tiny'))
app.use(expressLayout)
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
    })
);

app.use(flash());

app.use(router)

app.set('layout', './layouts/main')
app.set('view engine', 'ejs')


const port = 3000;

const DBconnect = async () => {

    try {
        await mongoose.connect(process.env.mongoURI)
        console.log("Database connected successfully")
        app.listen(port, () => {
            console.log("Listening on port 3000")
        })
    } catch (err) {
        console.log(err)
    }
}

DBconnect();