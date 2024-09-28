import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import usersRoutes from "./routes/users.routes.js"
import connectToDatabase from './db/connectToMongodb.js'
import cors from 'cors'

const app = express()
dotenv.config()
// const corsOptions = {
//     origin: 'http://localhost:5173', // your frontend's origin
//     credentials: true,               // allow credentials (cookies, authorization headers, etc.)
//   };
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true, 
  }));

const PORT = process.env.PORT || 5000

app.get("/",(req,res)=>{
    res.send("Hello world!!")
})
app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",usersRoutes)


app.listen(PORT , ()=>{
    connectToDatabase()
    console.log(`Server is running on port ${PORT}`)
})