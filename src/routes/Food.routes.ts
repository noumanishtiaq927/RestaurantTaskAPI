import {FoodController} from "../controller/Food.controller"
import express from 'express'
import apikeyauth from "../middleware/apikeyauth"

export class FoodRouter {
    router:express.Router
    constructor(){
        this.router=express.Router()
        this.routes()
    }
    routes(){
        this.router.get('/allfood', async(req,res,next)=>{
            try {
                const fooddata:any = await new FoodController().getallfood()
                return res.json({menu:fooddata})
            } catch (error) {
                return next(error)
            }
       
            
        })
        this.router.post('/savefood',apikeyauth,async(req,res,next)=>{
            try {
                const savereq = req.body
                console.log(savereq)
                const savefooddata:any = await new FoodController().savefood(savereq)
                return res.json({savefooddata})
            } catch (error) {
                return next(error)
            }
        })
        this.router.put('/updatefood',apikeyauth,async(req,res,next)=>{
            try {
                const updatebody = req.body
                console.log({updatebody})
                const updatefood:any = await new FoodController().updatefood(updatebody)
                res.json({updatefood})
            } catch (error) {
                return next(error)
            }
        })
        this.router.delete('/deletefood',apikeyauth, async(req:any,res,next)=>{
            try {
                const id = req.body._id
                console.log(id)
              
                 await new FoodController().deletefood(<any> id)
         
            
                res.json({
                    message:"food details deleted"
                })
            } catch (error) {
                next(error)
            }
        })
     
    }
}

export const FoodRouterApi = new FoodRouter().router