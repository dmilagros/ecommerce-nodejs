const express = require('express')

//routers
const productRouter = require('./routes/product.router')
const cartRouter = require('./routes/cart.router')

/* //models
let products = require('./models/product.model.js') */

/* //manager
const Manager = require('./controllers/chat.manager')
const manager = new Manager() */

//server
const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`))


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/productos', productRouter)
app.use('/carrito', cartRouter)