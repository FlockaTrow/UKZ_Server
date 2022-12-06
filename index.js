const express = require('express')
const clientRouter = require('./routes/user.routes')
const productRouter = require("./routes/product.routes")
const directionRouter = require('./routes/direction.routes')

const PORT = 5000
var cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())
app.use('/api' , clientRouter)
app.use('/api',productRouter)
app.use('/api',directionRouter)

app.use('/img', express.static('./files'));

app.listen(PORT , () => console.log(`Started on port ${PORT}`))
