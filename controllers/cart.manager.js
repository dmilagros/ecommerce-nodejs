let products = require('../models/product.model')
let carts = require('../models/cart.model')

class CartManager {
    create = (cart) => {
        let id
        if (carts.length === 0) id = 1
        else id = carts[carts.length-1].id+1
        cart = {
            id,
            ...cart
        }
        carts.push(cart)
        return carts
    }

    delete = (id) => {
        id = parseInt(id)
        let newCarts = carts.filter(item => item.id !== id)
        carts = newCarts
        return carts
    }

    findById = (id) => {
        id = parseInt(id)
        return carts.find(item => item.id === id)
    }

    findProductsByIdCart = (id) => {
        id = parseInt(id)
        return carts.find(item => {
            if (item.id === id) {
                return {
                    id,
                    products: item.products
                }
            } else return item
        })
    }

    createProduct = (id, product) => {
        id = parseInt(id)
        let newCarts = carts.map(item => {
            if (item.id === id) {
                item.products.push(product)
                return item
            } else return item
        })
        carts = newCarts
        return findProductsByIdCart(id)
    }    

    deleteProduct = (id, productId) => {
        id = parseInt(id)
        productId = parseInt(productId)

        let newCarts = carts.map(item => {
            if (item.id === id) {
                let newProducts = item.products.filter(item => item.id !== productId)
                return {
                    id,
                    products: newProducts
                }
            } else return item
        })
        carts = newCarts
        return carts
    }
}