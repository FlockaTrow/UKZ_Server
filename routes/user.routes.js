const Router = require("express")
const router = new Router()
const ClientController = require('../contoller/user.controller')

router.post('/user', ClientController.createClient)
router.post('/auth', ClientController.authClient)

module.exports = router