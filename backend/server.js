const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const bcrypt = require("bcrypt")

const salt = 10;

app.use(cors());
app.use(express.json())

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'todolist'
})

//register
app.post('/register', (req, res) => {
    const query = 'INSERT INTO users (`fname`,`lname`,`email`,`password`) VALUES (?, ?, ?, ?)';
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error for hashing password"});
        const values1 = [
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            hash
        ]
        try{
            connection.execute(query,values1)
            res.send('Successful registration')
        }catch (error){
            console.error('Error uploading data', error);
            res.status(500).send('Internal Server Error')
        }
    })  
})

//
app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE `email` = ?';

    connection.query(sql,[req.body.email],(err,data) => {
            if(err) return res.json({Error:'Login error in server '})
            if(data.length > 0){
                bcrypt.compare(req.body.password.toString(), data[0].password), (err, response) => {
                    if(err) return res.json({Error: "Password compare error"});
                    if(response){
                        return res.json({Status: "success"});
                    }else{
                        return res.json({Error: "Password not matched"});
                    }
                }
            } 
            else{
                return res.json('No such email');
            }
        }
    )
})



//post tasks on database
app.post("/submit", (req, res) => {
    const sql = 'INSERT INTO tasks(taks_title,tasks_descriptions) VALUES (?, ?)';
    const values = [
        req.body.name,
        req.body.description
    ]
    connection.query(sql,values), (err, data) => {
        if(err){
            return res.json(" insert data Error")
        }
        return res.json(data)
    };
})

//get tasks from database
app.get("/", (req,res) =>{
    connection.query(
        'SELECT * FROM tasks',
        function(err,data){
            if(err) return res.json("Error");
            return res.json(data);
        }
    )
})

//delete from database
app.post("/delete", (req,res) => {
    connection.query(
        'DELETE FROM tasks WHERE id = ?',[req.body.id], (err, data) => {
            if(err){
                return res.json('Delete data error')
            }
            return res.json(data)
        }
    )
})


app.listen(8081, () => {
    console.log("listening...");
})