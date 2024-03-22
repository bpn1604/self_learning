const express = require('express')
const router = express.Router()
const {Posts} = require("../models")

router.get('/' , async (req,res) => {
    try {
        // Fetch all posts from the database
        const posts = await Posts.findAll();
        console.log(posts)
        // Send the fetched posts as a response
        res.json(posts);
    } catch (error) {
        // If an error occurs, send an error response
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post('/' ,async (req,res) =>{
    const post = req.body
    console.log(post)
    await Posts.create(post)
    res.json(post)
})
module.exports = router