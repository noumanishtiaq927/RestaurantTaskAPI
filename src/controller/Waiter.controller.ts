import {IWAITER} from "../types/document/IWAITER"
import {SaveReqWaiter,GetReqWaiter,UpdateReqWaiter,LoginWaiter,DelReqWaiter} from "../types/request/Waiter.Request"
import {SaveUpdateResWaiter} from "../types/response/Waiter.Response"
import {MainWaiter} from "../repositories/Waiter.repositories"
import CustomeError from  "../utils/error"
import {Get,Patch,Post,Put,Body,SuccessResponse,Delete,Route,Tags,Security,Request,Response} from "tsoa"
import { SaveUpdateResOrder } from "../types/response/Order.Response"

@Route('waiter')


export class WaiterController {
    constructor(){}

   
    @Security('api_key')
    @Tags('Admin')
    @Post("/getwaiter")
    async getwaiter(@Body() getreq:GetReqWaiter 
    ): Promise<SaveUpdateResWaiter>{
    console.log(getreq)
        const waiter:any = await new MainWaiter().getWaiter(<any>getreq);
        
        if(waiter === null) throw new CustomeError(404 , "Waiter Not Found")
        return <SaveUpdateResWaiter>waiter;
    }
    @Security('api_key')
    @Tags('Admin')
    @Get('/getallwaiter')
    @Response(400, 'heello')
    async getallWaiter(): Promise<SaveUpdateResWaiter[]>{
 
        const waiter: any = await new MainWaiter().getallwaiter().populate("order")

        return <SaveUpdateResWaiter[]> waiter
    }
    @Security('api_key')
    @Tags('Admin')
    @Post("/savewaiter")

    async savewaiter(@Body() savereq:SaveReqWaiter): Promise<SaveUpdateResWaiter>{
        const newwaiter:any = await new MainWaiter().saveWaiter(<any> savereq)
        return <SaveUpdateResWaiter> newwaiter;

    }
    @Security('api_key')
    @Tags('Admin')
    @Put("/updatewaiter")
    
  
    async updatewaiter( @Body() updatereq:UpdateReqWaiter ) : Promise<SaveUpdateResWaiter>{

        console.log(updatereq)
        const updatewaiter:any= await new MainWaiter().updateWaiter(<any> updatereq)
        if(updatewaiter === null) throw new CustomeError(404, 'not supported method')
        return <SaveUpdateResWaiter>updatewaiter;
    }
  
    @Security('api_key')
    @Tags('Admin')
    @Delete("/deletewaiter")

    @SuccessResponse("200","Product Deleted")
    async deletewaiter(@Body() deletereq:DelReqWaiter):Promise<any>{

        return await new MainWaiter().delWaiter(<any> deletereq)
    }
  
    @Tags('Waiter')
    @Post("/loginwaiter")
    async login(@Body() data:LoginWaiter):Promise<SaveUpdateResWaiter>{
        console.log(data)
        const logwaiter:any = await new MainWaiter().loginWaiter(data.email)
        if(logwaiter === null) throw new CustomeError(404 , "Wrong email and password ")
        return logwaiter;
    }
    @Security('jwt')
    @Tags('Waiter')
    @Get('/waiterorder')
    async getwiterorder(@Request() req:any):Promise<SaveUpdateResOrder>{
        const waiterorder:any = await new MainWaiter().getwaiterorder(req)
        console.log(waiterorder)
        if(waiterorder.orders.length === 0) throw new CustomeError(404,'Not Order Found')
        return waiterorder
    }
   
        
   
}