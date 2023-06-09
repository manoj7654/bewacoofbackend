
const {Adminmodel}=require("../modal/adminModal")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
require("dotenv").config()


const admingRegister=(req,res)=>{
    const {name,number,email,password}=req.body
    try {
        bcrypt.hash(password,5,async(err,secure_passord)=>{
            if(err){
                console.log(err)
            }else{
                const result=new Adminmodel({name,number,email,password:secure_passord})
                await result.save()
                res.send("Admin Registered")
            }
        })
        
    } catch (err) {
        console.log(err)
        console.log("Something went wrong")
        
    }
}

const admingLogin=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await Adminmodel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,async(err,result)=>{
                if(result){
                    const AdminToken=jwt.sign({course:"backend"},process.env.key)
                    res.json({message:"Login Success","AdminToken":AdminToken})
                }else{
                    res.json({message:"Wrong credenatial"})
                }
            })
          
        }else{
            res.json({message:"Wrong credenatial"})
        }
    } catch (err) {
        console.log(err)
        console.log("Something went wrong")
    }
}

module.exports={
    admingRegister,
    admingLogin
}