const express = require('express')

const app = express()

const db = require("./models")
db.sequelize.sync().then(() =>{
    app.listen(8080,() => {
        console.log('server running on 8080')
    })
})
