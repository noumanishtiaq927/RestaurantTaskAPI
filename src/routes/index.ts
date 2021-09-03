import express from 'express';
import { WaiterRoutesApi } from "./Waiter.routes";
import {OrderRoutesApi} from "./Order.routes"

import { FoodRouterApi } from './Food.routes';
console.log('above main router ')
export class MainRouter {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        console.log('mainrouter')
        this.router.use('/waiter', WaiterRoutesApi);
        this.router.use('/order', OrderRoutesApi);
        this.router.use('/food',FoodRouterApi)
    }


}
export const MainApi = new MainRouter().router;