import {Schema,model} from "mongoose"
import {IWAITER} from "../types/document/IWAITER"

const IWaiterSchema = new Schema ({
    name:{
        type:String,
        required:[true, "Please Provide the name"],
        maxLength:[25, "name length should of 25 characters long"],

    },
    email:{
        type:String,
        required:[true, "Please Provide the email"],
        unique:true,
        

    },
    password:{
        type:String,
        required:[true, "Please Provide the password"],
        trim:true,
        minLength:[6,'password must be 6 or more than 6 characters long']
        
    },
    phone:{
        type:Number,
        required:[true,'phone number is required']
        
    },
    accesstoken:{
        type:String,
        default:0
    },
    orders:[{
        type: Schema.Types.ObjectId,
        ref:'order' 
    }]
},{
    timestamps:true
})

export const WaiterSchema = model<IWAITER>('Waiter',IWaiterSchema) 