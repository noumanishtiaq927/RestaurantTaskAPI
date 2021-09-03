import express from 'express'
import {WaiterController} from "../controller/Waiter.controller"
import {IWAITER} from "../types/document/IWAITER"
import {SaveReqWaiter,UpdateReqWaiter} from "../types/request/Waiter.Request"
import {SaveUpdateResWaiter} from "../types/response/Waiter.Response"
import CustomeError from "../utils/error"

import jwt  from "jsonwebtoken"
import {secret_token}  from '../middleware/jwttokendecode'
import extractJWT from "../middleware/jwttokendecode"
import apikeyauth from "../middleware/apikeyauth"
import { OrderSchema } from '../model/Order.model'
import { WaiterSchema } from '../model/Waiter.model'


export class  WaiterRoutes {
    router:express.Router
    constructor(){
        this.router= express.Router()
        this.routes()
    }
    routes(){
      
        this.router.post('/getwaiter',apikeyauth, async(req:any,res,next)=>{
            
            try {
               console.log(req.body)
                const waiter:any = await new WaiterController().getwaiter(<any>req.body._id)
        
           
            res.send({totalorders: waiter.orders.length, waiter})
            } catch (error) {
                next(error)
            }
        })
        this.router.get('/getallwaiter',apikeyauth,async(req,res,next)=>{
            try {
              console.log('route1')
                const allwaiter: SaveUpdateResWaiter[]= await new WaiterController().getallWaiter()
              console.log('route3')
                res.json({
                    TotalWaiters:allwaiter.length,
                    allwaiter
                }) 
            } catch (error) {
                next(error)
            }
        })
        this.router.get('/waiterorder',extractJWT, async(req:any,res,next)=>{
            try {

                const id= req.user.id
                const orderwaitr:any= await new WaiterController().getwiterorder(id)
                console.log({orderwaitr})
                res.json({totalsorder: orderwaitr.orders.length , orderwaitr})

            } catch (error) {
                next(error)
            }
           
        })
        this.router.post('/savewaiter', apikeyauth,async(req,res,next)=>{
            try {
                const waiter:SaveReqWaiter = req.body

                
                const newwaiter:SaveUpdateResWaiter = await new WaiterController().savewaiter(waiter)
                
                const access_token = jwt.sign({id: newwaiter._id}, secret_token)
            
                const newwaiterr = await WaiterSchema.findByIdAndUpdate({_id:newwaiter._id},{$set:{accesstoken:access_token}},{new:true})
                
                res.json({
                    access_token,
                    message:'waiter added successfully',
                    newwaiterr
                })
            } catch (error) {
                next(error)
            }
        });
        this.router.post('/findwaiter',apikeyauth,async(req,res,next)=>{
            try {
            
                
                const id:any = req.body._id
               
                
                const findwaiter:any = await new WaiterController().getwaiter(id)
                res.json({
                    
                    findwaiter
                })
            } catch (error) {
                next(error)
            }
        })
        this.router.put('/updatewaiter',apikeyauth,async(req:any,res,next)=>{
            try {
                const waiter:UpdateReqWaiter= req.body
             
                const updatewaiterr:SaveUpdateResWaiter = await new WaiterController().updatewaiter(<any>waiter)
                res.json({
                    message:"waiter details updated",
                    updatewaiterr
                })
            } catch (error) {
                next(error)
            }
        })
        this.router.delete('/deletewaiter',apikeyauth, async(req:any,res,next)=>{
            try {
                const id = req.body._id

                 await new WaiterController().deletewaiter(<any> id)
         
            
                res.json({
                    message:"waiter details deleted"
                })
            } catch (error) {
                next(error)
            }
        })
        this.router.post('/loginwaiter', async (req,res,next)=>{
            try {
               const data:any = req.body;
               console.log({data}) 

               const logincre = await new WaiterController().login(data)
               console.log({logincre})
               console.log(logincre.email)
            
             if(logincre.email && logincre.password === req.body.password) return res.json({msg: 'login success', logincre})
             res.json({msg:'login fail'})
            } catch (error) {
                next(error)
             
            }
        })
      
    
       
    }
}

export const WaiterRoutesApi = new WaiterRoutes().router;