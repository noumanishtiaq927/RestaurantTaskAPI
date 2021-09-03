import {IORDER} from "../types/document/IORDER"
import {SaveReqOrder,UpdateReqOrder,DelReqOrder,GetReqOrder} from "../types/request/Order.Request"
import {SaveUpdateResOrder} from "../types/response/Order.Response"
import CustomeError from "../utils/error"
import {MainOrder} from "../repositories/Order.repositories"
import {Post,Put,Delete,SuccessResponse,Route,Tags,Body,Security, Response , Get} from "tsoa"

@Route('order')


export class OrderController {
    constructor(){}

@Security('api_key')
@Tags('Admin')
@Post("/singleorder")
async getorder(@Body() getreq:GetReqOrder): Promise<SaveUpdateResOrder>{
    const order:any = await new MainOrder().getOrder(getreq._id);
    if(order === null) throw new CustomeError(404 , "Order Not Found")
    return <SaveUpdateResOrder>order;
}
@Security('jwt')
@Tags('Bill','Waiter')
@Post("/singleorderbill")
async getorderbill(@Body() getreq:GetReqOrder): Promise<SaveUpdateResOrder>{
    const order:any = await new MainOrder().getOrder(getreq._id);
    if(order === null) throw new CustomeError(404 , "Order Not Found")
    return <SaveUpdateResOrder>order;
}

@Tags('Waiter')
@Security('jwt')
@Post("/takeorder")
async saveorder(@Body() savereq:SaveReqOrder):Promise<SaveUpdateResOrder>{
    
    const newpatient: any = await new MainOrder().saveOrder(<any>savereq)
    
    return <SaveUpdateResOrder> <any> newpatient;
}
@Security('api_key')
@Tags('Admin')
@Delete("/deleteorder")
@SuccessResponse("200","order deleted")
async deleteorder(@Body() delreq: DelReqOrder){
    await new MainOrder().delOrder(delreq._id)
}
@Security('api_key')
@Tags('Admin')
@Get('/allorder')
async getallorder():Promise<SaveUpdateResOrder[]>{
    const getalorder:any = await new MainOrder().getall()
    if(getalorder === null) new CustomeError(404 ,'Not Found')
    console.log( getalorder)
    return   <any>  getalorder
}
@Tags("Admin")
@Security("api_key")
@Put("/updateorder")

async updateorder(@Body() updatereq:UpdateReqOrder):Promise <SaveUpdateResOrder>{
    const updatepatient: any = await new MainOrder().updateOrder(<any> updatereq)
    if(updatepatient === null) throw new CustomeError(400, "Not supported Update")
    return <SaveUpdateResOrder> <any> updatepatient
}

}
