import {OrderSchema} from "../model/Order.model"
import {IORDER} from "../types/document/IORDER"

export class MainOrder {
    constructor(){}
    getOrder(_id:string){
        return OrderSchema.findById(_id).populate('order')
    }
    saveOrder(order: IORDER){
        return new OrderSchema(order).save()
    }
    getall(){
        return OrderSchema.find().populate('order')
    }
     updateOrder(order: IORDER){
        return OrderSchema.findByIdAndUpdate(order._id,order,{
             new:true
         })
     }
    delOrder(_id:string){
        return OrderSchema.findByIdAndDelete(_id)
    }
    
}