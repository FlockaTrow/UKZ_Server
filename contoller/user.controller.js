const db = require('../db')
var passwordHash = require('password-hash');

class ClientController {
    async createClient(req , res) {
        const {login , password} = req.body
        var hashedPassword = passwordHash.generate(password);
        console.log(login , hashedPassword)
        const newClient = await db.query('INSERT INTO "user" (login, password) values($1,$2) RETURNING *',[login, hashedPassword])
        console.log(newClient)
        res.json(newClient.rows[0])
    }
    async authClient(req , res) {
        const {password,login} = req.body
        const client = await db.query('select * from client where password=$1 and login=$2' , [password,login])
        res.json(client.rows[0])
    }
}

module.exports = new ClientController()