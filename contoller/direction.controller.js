const db = require('../db')
const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));
// const  translate = require('translate');
// translate.engine = "libre";
// translate.from = 'ru'
class DirectionController {

    async createDirection(req, res) {
        const { name } = req.body
        // const result = await fetch("https://libretranslate.com/translate", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         q: name,
        //         source: "ru",
        //         target: "en",
        //         // format: "text",
        //     }),
        //     headers: { "Content-Type": "application/json" }
        // }).then(res => res.text())
        // .then(json => {
        //    console.log(json , 'asd')
        // })
        // // console.log(result)
        // // let enName = await result.json()
        // // console.log(result, "AAAA")
        const newDirection = await db.query('INSERT INTO "direction" (name) values ($1) RETURNING *', [name])
        res.json(newDirection.rows[0])
    }

    async getDirections(req, res) {
        const cars = await db.query(`select * from "direction" `)
        res.json(cars.rows)
    }
    async deleteDirection(req, res) {
        const { id } = req.body
        const deleteDirection = await db.query('delete from "direction" where id = $1', [id])
        res.json(deleteDirection.rows[0])
    }
}

module.exports = new DirectionController()