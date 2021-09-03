import {WaiterSchema} from "../model/Waiter.model"
import {IWAITER} from "../types/document/IWAITER"

export class MainWaiter {
    constructor(){}
    getWaiter(_id:string){
        
        return WaiterSchema.findById(_id).populate({path:'orders', populate:{path:'order'}})
    }
    saveWaiter(waiter: IWAITER){
        return new WaiterSchema(waiter).save()
    }
    updateWaiter(waiterr:IWAITER){
        return WaiterSchema.findByIdAndUpdate( waiterr._id, waiterr,{new:true})
    }
    updateWaiterr(id:string , waiteer: IWAITER){
        
        return WaiterSchema.findByIdAndUpdate(id,waiteer,{
            new:true
        })
    }
    getwaiterorder(_id:any){
        return WaiterSchema.findById(_id).select('orders').populate({path: 'orders', populate:{path:'order'}})
    }
    delWaiter(_id:string){

        return WaiterSchema.findByIdAndDelete(_id)
    }
    getallwaiter(){
       console.log('repo')
        return WaiterSchema.find()
    }
   
    loginWaiter(email:string){
        return WaiterSchema.findOne({email}).select('-createdAt -updatedAt -_id').populate('orders')
    }
 
}