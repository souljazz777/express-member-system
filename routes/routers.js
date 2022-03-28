const express = require('express')
const route = express.Router()
const siteCtrl = require('../controllers/controllers')


route.get('/', siteCtrl.homepage)
route.get('/error', siteCtrl.errorpage)
route.post('/signup', siteCtrl.create)
route.post('/signin', siteCtrl.login)
route.get('/member', siteCtrl.member)
route.get('/signout', siteCtrl.logout)
route.post('/add', siteCtrl.add)




module.exports = route;