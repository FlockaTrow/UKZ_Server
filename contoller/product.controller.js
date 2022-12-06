const db = require('../db')
var formidable = require('formidable' );


const queryGenerated = (id_direction , name) => {
    const nameCond = name ? `name=${name} ` : ""
    const directionCond = id_direction ? `id_direction=${id_direction} ` : ""
    let resQuery = ``
    if (nameCond.length > 0 && directionCond.length>0) resQuery = `where ${nameCond} and ${directionCond}`
    else if (nameCond.length>0) resQuery = `where ${nameCond}`
    else if (directionCond.length>0) resQuery = `where ${directionCond}`
    console.log(resQuery)
    return resQuery
}

class ProductController {
    async createProduct(req , res) {
        const {id_direction , name , description, article } = req.body
        const newProduct = await db.query('INSERT INTO "product" (name , description, article, id_direction ) values ($1,$2,$3,$4) RETURNING *',[name , description, article,id_direction])
        res.json(newProduct.rows[0])
    }
    async getProducts(req , res) {
        const { id_direction , name } = req.query
        const reqQuery = queryGenerated(id_direction , name)
        const products = await db.query(`select * from "product" ${reqQuery} ORDER BY id desc`)
        res.json(products.rows)
    }
    async deleteProduct(req , res) {
        const {id} = req.body
        const car = await db.query('delete from "product" where id = $1' , [id])
        res.json(car.rows[0])
    }
    async updateImage(req , res) {
        const id = req.params.id
        let nameImage = 'product'+id+'.png'
        const priduct = await db.query('update "product" set image = $1 where id = $2 RETURNING *' , [nameImage , id])
        res.json(priduct.rows[0])
    }
    async updateProduct(req , res) {
        const {id , name , description, article} = req.body
        let nameImage = 'product'+id+'.png'
        const priduct = await db.query('update "product" set name = $1,description=$2,article=$3 where id = $4 RETURNING *' , [name , description, article, id ])
        res.json(priduct.rows[0])
    }
}

module.exports = new ProductController()