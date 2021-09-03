import {Schema,model} from "mongoose"
import {IORDER} from "../types/document/IORDER"

const IOrderSchema = new Schema({
    customername:{
        type:String,
        maxLength:[25,"Name must not be more than 25 characters long"],
        required:[true, "please provide the name"]
    },
    customeremail:{
        type:String,
        required:[true,"Please provide the email"],
        unique:true
    },
    customerphone:{
        type:String,
        unique:true,
        

    },
    customertablenumber:{
        type:Number,
        required:[true,"please provide the table number"],
        max:30
    },
    customerbill:{
        type:Number,
        
        
    },
    orderstatus:
            {type:String },
    order:[{
        type:Schema.Types.ObjectId,
        ref:'food'
    }]
},{
    timestamps:true
})

export const OrderSchema = model<IORDER>("order", IOrderSchema)