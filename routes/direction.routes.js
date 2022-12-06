const Router = require("express")
const router = new Router()
const DirectionController = require('../contoller/direction.controller')

router.get('/direction', DirectionController.getDirections)
router.post('/direction', DirectionController.createDirection)
router.delete('/direction', DirectionController.deleteDirection)
module.exports = router