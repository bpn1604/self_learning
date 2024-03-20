const express = require('express')

const app = express()

const db = require("./models")


//Routers 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const postRouter = require("./routes/Posts")

app.use("/posts" , postRouter)
db.sequelize.sync().then(() =>{
    app.listen(8080,() => {
        console.log('server running on 8080')
    })
})
