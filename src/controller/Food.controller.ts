import {foodSchema} from "../model/food.model"
import {IFOOD} from "../types/document/IFOOD"
import {MainFood} from "../repositories/food.repositories"
import express from 'express'
import { Body, Delete, Get, Patch, Post, Put, Route, Tags , SuccessResponse,Security } from "tsoa"
import CustomeError from "../utils/error"
import {SaveResFood} from "../types/response/Food.Response"
import {SaveReqFood,UpdateReqFood,DelReqFood} from "../types/request/Food.Request"

@Route('Food')

export class FoodController{
    
    constructor(){}
    @Security('api_key')
    @Tags('Admin')
    @Post('/savefood')
    async savefood(@Body() savereq:SaveReqFood):Promise<SaveResFood>{
        const newfood:any = await new MainFood().savefood(<any>savereq)
        console.log(newfood)
        return <SaveResFood>newfood
    }
   
    @Tags('Admin','Menu')
    @Get('/allfood')
    async getallfood():Promise<SaveResFood[]>{
        const getfoodal:any = await new MainFood().getall()
        if(getfoodal === null) new CustomeError(404 ,'Not Found')
        console.log(getfoodal)
        return   <any> getfoodal
    }
    @Tags('Admin')
    @Security('api_key')
    @Put('/updatefood')
    async updatefood(@Body() updatereq:UpdateReqFood):Promise<SaveResFood>{
     
        const updatefooddata:any = await new MainFood().updatefood(<any> updatereq)
        
      
        
        if(updatefooddata===null) new CustomeError(404, 'nf')
        return <SaveResFood>  updatefooddata 

    }
    @Tags('Admin')
    @Security('api_key')
    @Delete('/deletefood')
    @SuccessResponse("200","Product Deleted")
    async deletefood(@Body() delreq:DelReqFood):Promise<any>{
        return await new MainFood().delfood(<any> delreq)
    }

}