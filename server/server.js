const express = require('express')
const cors = require("cors")
const mysql = require("mysql")
const path = require("path")
const app = express()
//path.resolve()
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())


const port = 5000
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "students"
})


// ENDPOINTS
app.get('/', (req, res) => {
    res.json({message:"React & Express connected"})
});

app.get('/students', (req, res) => {
    sql = "SELECT * FROM student_details"
    db.query(sql, (err, result)=> {
        if(err) res.json({message:"Server Error", err}) 
        return res.json(result)
    })
  });


app.post("/add_user", (req, res) => {
    const sql =
      "INSERT INTO student_details (`name`,`email`,`age`,`gender`) VALUES (?, ?, ?, ?)";
    const values = [req.body.name, req.body.email, req.body.age, req.body.gender];
    db.query(sql, values, (err, result) => {
      if (err)
        return res.json({ message: "Something unexpected has occured" + err });
      return res.json({ success: "Student added successfully" });
    });
  });


app.listen(port, ()=> {
    console.log("listening")
})