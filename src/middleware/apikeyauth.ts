import {Response, Request, NextFunction} from "express"

const apikeyauth = (req:Request , res:Response , next:NextFunction) => {
        console.log('apikeyauth')
        
    let apikey
        apikey = req.query.admin_token;
   

    if(apikey && apikey === '1234567')
        return next()
        else 
        {
        return res.json({
                status: 401,
                error: 'You are Not Authorized'
        })
        }
}

export default apikeyauth;