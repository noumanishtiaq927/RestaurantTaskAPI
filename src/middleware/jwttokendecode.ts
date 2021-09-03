import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"


export const secret_token = "abc12334"

const extractJWT = async (req:any , res:Response, next:NextFunction) =>{
    // let token = req.headers.authorization?.split(' ')[1];


    try {
      let token = req.headers.authorization?.split(' ')[1];
      if(!token) return res.status(400).json({msg: "Invalid Authentication"})

      jwt.verify(token, secret_token, (err:any, user:any) =>{
          if(err) return res.status(400).json({msg: "Invalid T Authentication"})

          req.user = user
          next()
      })
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}



  
  
    


export default extractJWT;
