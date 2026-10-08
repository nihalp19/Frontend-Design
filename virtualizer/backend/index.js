import express from "express"
import cookieParser from "cookie-parser"
import {mockdata} from "./mock_data.js"
import cors from "cors"

const PORT = 8000

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.get("/api/v1/todos",(req,res) => {
    return res.json(mockdata)
})


app.listen(PORT, () => {
    console.log(`SERVER STARTED AT ${PORT}`)
})
