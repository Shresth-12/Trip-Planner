import express from "express"
import zod from "zod"
import { JWT_SECRET } from "../config.js"
import pkg from "jsonwebtoken";
const { sign } = pkg;
import {User} from "../db.js"

const router=express.Router()

const signupbody=zod.object({
    email:zod.string().email(),
    password:zod.string()
})

router.post("/signup",async (req,res)=>{
    const {success}=signupbody.safeParse(req.body)
    if(!success)
    {
        return res.status(411).json({
            message:"Invalid Input"
        })
    }
    const existinguser= await User.findOne({
        email:req.body.email,
        password:req.body.password
    })
    if (existinguser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }
    const user=await User.create({
        email:req.body.email,
        password:req.body.password
    })
    const userId=user._id
    const token=sign({
        userId
    },JWT_SECRET)

    res.json({
        message:"User Created Successfully",
        token:token
    })
})

const signinbody=zod.object({
    email:zod.string().email(),
    password:zod.string()
})

router.post("/signin",async (req,res)=>{
const{ success}=signinbody.safeParse(req.body)
if(!success)
    return res.status(411).json({
        message:"Invalid Inputs"
    })
    const user=await User.findOne({
        email:req.body.email,
        password:req.body.password
    })
    if(user)
    {
        const token=sign({
            userId:user._id
        },JWT_SECRET)   
        res.json({
            token:token,
            userId:user._id
        })
        return
    }

    return res.status(411).json({
        message:"Error While Signing"
    })
})

export default router