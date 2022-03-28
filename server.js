const express = require('express')
const app = express()
const route = require('./routes/routers')
const session = require('express-session')

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(session({
    secret: "myblog",
    resave: false,
    saveUninitialized: true
}))
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use('/', route)

app.listen(3000, () => {
    console.log('server started')
})