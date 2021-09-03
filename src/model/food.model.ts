import {Schema, model} from 'mongoose'
import { IFOOD } from '../types/document/IFOOD'

const IFoodSchema = new Schema({
       foodname:{
           type:String,
           required:['true','please provide the food name']
       },
       price:{
           type:Number,
           required:['true','please provide the price']
       },
       type:{
           type:String,
           required:['true','please provide the food type']
       },
       size:{
           type:String,
           required:['true','please provide the size']
       }
},{
    timestamps:true
})

export const foodSchema = model<IFOOD>('food',IFoodSchema)