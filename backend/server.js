const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const crypto = require('crypto')            // for pbkdf2 encryption

const app = express()
app.use(cors())
app.use(express.json())

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
    console.log("received user %s", req.body.user);
    const username = req.body.user;
    var randstr = crypto.randomBytes(64).toString('hex');
    var pswd;
    console.log(randstr);
    crypto.pbkdf2(req.body.pwd, randstr, 10, 4, 
          'sha1', (err, pswd) => { 
            if (err)  
            { 
                console.log(err); 
            }  
            else
            { 
                        
            // Prints derivedKey without encoding 
            console.log(pswd);
            console.log(pswd.toString('hex')); 
            const hashpswd = pswd.toString('hex');
            db.query("INSERT INTO users (username, pswd, salt) VALUE ('" + username + "', '" + hashpswd + "', '" + randstr + "');")
            res.send("Added user to database.");
            } 
        }); 
})

app.listen(3001, ()=> {
    console.log("listening");
})
