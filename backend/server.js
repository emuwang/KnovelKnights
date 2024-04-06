const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "3DurianCakes?",
    database: 'knovel_knights',
})

app.get('/', (re, res)=> {
    return res.json("backend... please leave")
})

app.get('/books', (req, res)=> {
    const sql = "SELECT * FROM books ORDER BY rating DESC"
    db.query(sql, (err, data)=> {
        if(err)
            return res.json(err)
        return res.json(data)
    })
})

app.post('/insertuser', (req, res) => {
    const sql = "INSERT INTO books (title, author, rating) VALUES ('Book13', 'Author13', 4.8);"
    db.query
})

app.listen(3001, ()=> {
    console.log("listening");
})
