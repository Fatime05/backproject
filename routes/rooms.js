import express from "express"


const router = express()

router.get("/",(req,res) => {
    res.send("Hello, this is auth endpoint")
})
router.get("/register",(req,res) => {
    res.send("Hello, this is auth register endpoint")
})

export default router


