import express from "express";
import pg from "pg";
import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const { Pool } = pg;
const PORT = process.env.PORT
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));

app.post("/register",async (req,res) => {
    try{
      const { username,email,password } = req.body;
      
      const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (existingUser.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users(username,email,password) VALUES ($1,$2,$3) RETURNING id,username,email",
            [username,email,hashedPassword]
        );
        res.status(201).json({
            success:true,
            msg:"user Registered successfully",
            user:result.rows[0]
        });
    } catch(err){
        console.error(err);
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});
app.post("/login", async (req,res)=>{
    try{
        const {email,password} = req.body;
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (result.rows.length ===0 ){
            return res.status(401).json({
                success:false,
                message : "Invalid email or password"
            });
        }
        const  user = result.rows[0];
        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(401).json({
             success: false,
             message: "Invalid email or password"
             });
        }
       const token = jwt.sign({
             id: user.id,
             email: user.email
       },process.env.JWT_SECRET || "mysecretkey",
       { expiresIn:"1h"});


       res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
    } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

app.get("/jobs", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM applications"
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});
app.post("/jobs", async (req, res) => {

  try {

    const {
      company,
      job,
      location,
      salary,
      date,
      status,
      notes
    } = req.body;

    const result = await pool.query(
      `INSERT INTO applications
      (
        company_name,
        job_title,
        location,
        salary,
        application_date,
        status,
        notes
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [
        company,
        job,
        location,
        salary,
        date,
        status,
        notes
      ]
    );

    res.status(201).json({
      success: true,
      application: result.rows[0]
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
});
app.get("/jobs", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM applications ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

app.put("/jobs/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const {
      company,
      job,
      location,
      salary,
      date,
      status,
      notes
    } = req.body;

    const result = await pool.query(
      `UPDATE applications
       SET
       company_name = $1,
       job_title = $2,
       location = $3,
       salary = $4,
       application_date = $5,
       status = $6,
       notes = $7
       WHERE id = $8
       RETURNING *`,
      [
        company,
        job,
        location,
        salary,
        date,
        status,
        notes,
        id
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server Error"
    });

  }
});
app.delete("/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM applications WHERE id = $1",
      [id]
    );

    res.json({
      success: true,
      message: "Job deleted"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});