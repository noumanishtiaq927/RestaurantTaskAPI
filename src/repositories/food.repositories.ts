import {foodSchema} from "../model/food.model"
import {IFOOD} from "../types/document/IFOOD"

export class MainFood{
    constructor(){}
    getall(){
        return foodSchema.find()
    }
    savefood(food:IFOOD){
    return new foodSchema(food).save()
    }
    updatefood(foodd:IFOOD){
        return foodSchema.findByIdAndUpdate(foodd._id,foodd,{new:true})
    }
   
    delfood(_id:string){
        return foodSchema.findByIdAndDelete(_id)
    }
}