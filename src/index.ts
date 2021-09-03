import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import mongoose from 'mongoose'
import cors from "cors";
import {MainApi} from "./routes";
import {MongoDb } from "./config/mongodb.conn";
import { Server } from "http";
const health = require('@cloudnative/health-connect');
let healthcheck = new health.HealthChecker();
import { MONGO_CLUSTER,MONGO_DbName,MONGO_pass,MONGO_user_name } from "./utils/constants";
let server: Server | null = null;
const PORT = process.env.PORT || 8000;

console.log('before func initApp')
function initApplication(): express.Application {
    mongoose.connect(`mongodb+srv://food:food123@cluster0.vwdfe.mongodb.net/restapi?retryWrites=true&w=majority`,{ useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology:true},(err)=>{
        if(err){
            console.log(err)
            console.log('database server connection failed')
        }else {
            console.log('database connection')
        }
    });
    console.log(MONGO_CLUSTER)
    console.log(MONGO_DbName)
    console.log(MONGO_user_name)
    console.log(MONGO_pass)
    const app = express();
    app.use(express.json());
    console.log('express.json')
    app.use(express.urlencoded({extended: true}))
    app.use(morgan("tiny"));

    console.log('morgan after')
    app.use(express.static("public"));
    console.log('stati after')
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        }
    }));
    console.log('swagger after')
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
    console.log('main api be4')
    app.use(MainApi);
    console.log('main after')
    app.use(
        (err: any, req: Request, res: Response, next: NextFunction) => {
            res.locals.message = err.message;
            console.log(res.locals)
            const status = err.statusCode || 500;
            res.locals.status = status;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(status);
            return res.json({
                error: {
                    message: err.message
                }
            });
        }
    );
    console.log('')
    app.use('/health', health.LivenessEndpoint(healthcheck))
    app.use('/ready', health.ReadinessEndpoint(healthcheck));
    return app;
}
function start() {
    console.log('app start ')
    const app = initApplication();
    console.log('app after init start ')
    server = app.listen(process.env.PORT || PORT, () => {
        console.log(`Server started on PORT:`+ PORT);
    });
}
// Start the application

 start();