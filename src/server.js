import express from "express"
import listEndpoints from "express-list-endpoints"
import  mongoose  from "mongoose"
import authorRouter from "./services/authors/authors.js"
import blogRouter from "./services/blogs/index.js"

const server = express()

const PORT = process.env.PORT || 3001

server.use(express.json())

/* **************ROUTES ***************** */

server.use("/blogPost",blogRouter)
server.use("/authors", authorRouter)

/* **************ERROR HANDLERS***************** */




/* ************MONGOOSE CONNECTION************* */
mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
    console.log("Connection Successful to mongo!");
    server.listen(PORT, () => {
        console.table(listEndpoints(server));
        console.log(`Server is running on port ${PORT}`)
    })
})

mongoose.connection.on("error", err => {
    console.log("MONGO ERROR ", err);
})