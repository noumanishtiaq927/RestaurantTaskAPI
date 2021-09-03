import express from 'express'
import { WaiterController } from '../controller/Waiter.controller'
import {OrderController} from "../controller/Order.controller"
import {IORDER} from "../types/document/IORDER"
import {SaveReqOrder,UpdateReqOrder,DelReqOrder,GetReqOrder} from "../types/request/Order.Request"
import {SaveUpdateResOrder} from "../types/response/Order.Response"
import CustomeError from "../utils/error"
import {WaiterSchema} from "../model/Waiter.model"
import {OrderSchema} from "../model/Order.model"
import apikeyauth from "../middleware/apikeyauth"
import jwt from "jsonwebtoken"
import extractJWT from '../middleware/jwttokendecode'


const secret_token = 'whatanewpatientwiildo';


export class OrderRoutes {
    router:express.Router
    constructor(){
        this.router= express.Router()
        this.routes()
    }
    routes(){
        this.router.post('/singleorder',apikeyauth, async(req,res,next)=>{
            try {
               const getreq:GetReqOrder = req.body
               const order:SaveUpdateResOrder = await new OrderController().getorder(getreq)
               res.send(order)
            } catch (error) {
                next(error)
            }
        })
        this.router.post('/takeorder',extractJWT, async(req:any,res:any,next:any)=>{
            try {
                const order:SaveReqOrder = req.body
               console.log(req.user)
               const assign = await WaiterSchema.findById(req.user.id)
                
               console.log({assign})
                const neworder:SaveUpdateResOrder = await new OrderController().saveorder(order)
           
              const updatewaiter = await WaiterSchema.findByIdAndUpdate(assign?._id,{$addToSet: {orders: neworder._id}},{new:true})
            
                res.json({
                    message:'waiter added successfully',
                    neworder,
                     updatewaiter
                 
                })
            } catch (error) {
                next(error)
            }
        });
        this.router.get('/allorder',apikeyauth, async(req,res,next)=>{
            try {
                const allorders:any = await new OrderController().getallorder()
                return res.json({allorders})
            } catch (error) {
                return next(error)
            }
       
            
        })
    

        this.router.post('/singleorderbill', extractJWT ,async(req:any,res,next)=>{
            try {
                const getreq:GetReqOrder = req.body
                const Waiter:any = await WaiterSchema.findById(req.user.id)
                console.log(Waiter)
                if(Waiter?.orders.indexOf(getreq._id) == -1)
                throw new CustomeError(404, "Order not found")
                const singleorderbill:SaveUpdateResOrder = await new OrderController().getorder(getreq)
                
                const totalprice = await singleorderbill?.order.reduce((prev:any,item:any)=>{ return prev+item.price},0)

                const updateOrder = await OrderSchema.findByIdAndUpdate({_id:singleorderbill._id},{$set:{customerbill:totalprice}},{new:true}).populate('order')
                console.log(totalprice)
                return res.json({BillwithOrder: updateOrder})
            } catch (error) {
                return next(error)
            }
       
            
        })
        
        this.router.put('/updateorder',apikeyauth,async(req,res,next)=>{
            try {
                const orderup:UpdateReqOrder= req.body
                console.log(orderup)
              //const assign = await WaiterSchema.findById(orderup.waiterid)
              //  const updatewaiter = await WaiterSchema.findByIdAndUpdate(orderup?.waiterid,{$addToSet: {orders: orderup._id}},{new:true})
                const updateorder:SaveUpdateResOrder = await new OrderController().updateorder(orderup)
                res.json({
                    message:"order details updated",
                    updateorder,
                  //  updatewaiter
                })
            } catch (error) {
                next(error)
            }
        })
        this.router.delete('/deleteorder',apikeyauth,async(req,res,next)=>{
            try {
                const delorder:DelReqOrder = req.body
               
             
                await new OrderController().deleteorder(delorder)
                
                res.json({
                    message:"Order details deleted",
                    
                })
            } catch (error) {
                next(error)
            }
        })
    }
}

export const OrderRoutesApi = new OrderRoutes().router;