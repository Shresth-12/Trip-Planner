import express from "express"
import userrouter from "./user.js"
import triprouter from "./trip.js"
const router=express.Router()

router.use("/user",userrouter)
router.use("/trip",triprouter)
export default router;