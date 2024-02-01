const express = require('express')
const cors = require("cors")
const mysql = require("mysql2");
const path = require("path")
const app = express()
//path.resolve()
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())


const port = 5000
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "melonmelon",
    database: "students",
    port: 3307
})
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


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

  app.post("/edit_user/:id", (req, res) => {
    const id = req.params.id;
    const sql =
      "UPDATE student_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id=?";
    const values = [
      req.body.name,
      req.body.email,
      req.body.age,
      req.body.gender,
      id,
    ];
    db.query(sql, values, (err, result) => {
      if (err)
        return res.json({ message: "Something unexpected has occured" + err });
      return res.json({ success: "Student updated successfully" });
    });
  });

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
    const sql =
      "DELETE FROM student_details WHERE id= ?";
    db.query(sql, [id], (err, result) => {
      if (err)
        return res.json({ message: "Something unexpected has occured" + err });
      return res.json({ success: "Student Deleted successfully" });
    });
  });

  app.get("/get_student/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM student_details WHERE `id`= ?";
    db.query(sql, [id], (err, result) => {
      if (err) res.json({ message: "Server error" });
      return res.json(result);
    });
  });



app.listen(port, ()=> {
    console.log("listening")
})