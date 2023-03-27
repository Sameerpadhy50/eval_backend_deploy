const express=require("express")
const connection=require("./db")
const {userRouter}=require("./Routes/User.routes")
const {authenticate}=require("./Middlewares/authenticate.middleware")
const {PostRouter}=require("./Routes/Post.routes")
require("dotenv").config()
const cors=require("cors")
const app=express()

app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use("/posts",authenticate,PostRouter)

app.listen(process.env.PORT || 8080,async()=>{
    try {
        await connection
        console.log("Connected to database")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running at port ${process.env.Port}`)
})

