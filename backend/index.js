const express = require("express")
const cors=require("cors")
const app= express()
const mysql= require('mysql');



app.use(express.json())
app.use(cors());
const bodyParser =require("body-parser")
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
 

const db= mysql.createPool({
    connectionLimit: 5,
    host:"bi15amrll46mjwytfsqd-mysql.services.clever-cloud.com",
    user:"upomoq5brn5nnjie",
    password:"YauGBYUGBZrNYM6mavmI",
    database:"bi15amrll46mjwytfsqd"    
})
const validateEmail = (email) => {
    // Simple email format regex for validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
 
const multer=require('multer')
const path=require('path');
// const { default: EditEmployee } = require("../frontend/src/pages/edit_emp");
const { error } = require("console");
const { emit } = require("process");
// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "uploads")); // Upload folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create Employee API
app.post("/CreateEmp", upload.single("image"), async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const designation = req.body.designation;
    const mobile=req.body.mobile;
    const gender=req.body.gender;
    // const courses=req.body.subjects;
    // const course = Array.isArray(courses) ? courses.join(",") : null;
    // const image = req.file.filename;
    // const image=req.
    if (!name || !email || !mobile) {
        console.log("Error:all fiends are required");
        res.send("Error:all fiends are required")
        return;
      }
      else if (!validateEmail(email)) {
        console.log("Error:enter a valid email")
        res.send("Error:enter a valid email")
        return;
      }
    // db.query("INSERT INTO employee(name,email,mobile,designation,gender,course,image) VALUES(?,?,?,?,?,?)",[name,email,mobile,designation,gender,courses,fileName],(err,result)=>{
    db.query("INSERT INTO employee(name,email,mobile,designation,gender) VALUES(?,?,?,?,?)",[name,email,mobile,designation,gender],(err,result)=>{
        if(err){
            // console.log(req.body)
            console.log(err.sqlMessage)
            res.send(err);
        }else{
            console.log("Employee inserted");
            res.send("employee", {name}, "successully inserted" )
        }
    })
})

app.get("/ListEmp", async (req, res) => {
    try {
        const quer = "SELECT * FROM employee";
        // console.log("Querying database...");
        db.query(quer, (err, results) => {
            if (err) {
                console.log("Database query error:", err);
                res.status(500).json({ error: err.message });
            } else {
                console.log("emp fetch success")
                // console.log("Query results:", JSON.stringify(results)); // Use JSON.stringify
                res.status(200).json(results); // Send results as JSON
            }
        });
    } catch (err) {
        console.error("Error handling GET request:", err);
        res.status(500).json({ error: err.message });
    }
});
app.delete("/DeleteEmp/:email",async(req,res)=>{
    try{
        const email = req.params.email;
       const quer = "DELETE FROM employee WHERE email = ?";
       db.query(quer, [email],(err,results)=>{
        if (err){
            console.log("error");
            return res.status(500).json({ error: err.message })
        } 
        res.status(200).json({ message: "Employee deleted successfully." })
        
       })
    }
    catch(err){
        console.log(err)
    }
})

app.get("/GetEmp/:em",async(req,res)=>{
    try{
        const email= req.params.em;
         
        const query= "select * from employee where email=?"
        db.query(query,[email],(err,results)=>{
             
            if(err){
                console.log(err)
            }else if (results.length === 0) {
                res.status(404).json({ message: "User not found" });
                console.log("usernot found")
            } else{
                res.status(200).json(results);
                console.log("Query results:", JSON.stringify(results));
                // console.log(results)
            }
        })

    }catch(err){
        console.log(err)
    }
})
app.put("/UpdateEmp/:email",upload.single("image"),async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const designation = req.body.designation;
    const mobile=req.body.mobile;
    const gender=req.body.gender;
    // const courses=req.body.subjects;
    // const course = Array.isArray(courses) ? courses.join(",") : null;
    // const image = req.file.filename;
    // const image = req.file ? (req.file.filename,console.log(req.file.filename),
    // console.log(req.body) ):( req.body.image,console.log(req.body.image),
    // console.log(req.body));
    
    // console.log(req.body)
    // res.send(req.body)
    // res.send(req.body.image)
    // res.send(req.file.filename)
    // const image=req.
    if (!name || !email || !mobile) {
        console.log("Error:all fiends are required");
        res.send("Error:all fiends are required")
        return;
      }
      else if (!validateEmail(email)) {
        console.log("Error:enter a valid email")
        res.send("Error:enter a valid email")
        return;
      }
      const query = `UPDATE employee SET name = ?, mobile = ?, designation = ?, gender = ? WHERE email = ?`;
    // db.query("INSERT INTO employee(name,email,mobile,designation,gender) VALUES(?,?,?,?,?)",[name,email,mobile,designation,gender],(err,result)=>{
    db.query(query, [name, mobile, designation, gender, email],(err,result)=>{
        if(err){
            // console.log(req.body)
            console.log(err.sqlMessage)
            res.send(err);
        }else{
            console.log("Employee inserted");
            res.send("employee", {name}, "successully inserted" )
        }
    })   
})
// app.post("/CreateEmp", upload.single("image"), async (req, res) => {
//     try {
//         // const now = new Date();
//         const fileName = req.file.filename; 
//         const { name, email, mobile, designation, gender, subjects } = req.body;
//         // Insert data into the employee table
//         const query = `
//             INSERT INTO employee (name, email, mobile, designation, gender, subjects, image, createat)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//         `;
//         const values = [name, email, mobile, designation, gender, subjects, fileName, formattedDate];

//         db.query(query, values, (err, results) => {
//             if (err) {
//                 console.error("Error inserting employee:", err);
//                 return res.status(500).json({ error: err.message });
//             }

//             console.log("Employee inserted:", results);
//             res.status(201).json({ message: "Employee created successfully", id: results.insertId });
//         });
//     } catch (err) {
//         console.error("Error saving employee:", err);
//         res.status(500).json({ error: err.message });
//     }
// });






app.get("/",(req,res)=>{
    res.send("backend connected successfully");
})


app.listen(8012,()=>{
    console.log("server started at port:8012");
})