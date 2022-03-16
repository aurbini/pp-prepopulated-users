"use strict";
// import express, { Request, Response, NextFunction } from 'express';
// import { json } from 'body-parser';
// import * as baseRoute from './routes'
// import { Application } from 'express';
// import baseRoutes from './routes'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const PORT = 3000;
// const app: Application = express();
// app.use(json());
// app.use('/', baseRoutes)
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     res.status(500).json({ message: err.message })
// })
// app.listen(PORT, () => console.log('App listening on PORT ' + PORT)); 
const server_1 = __importDefault(require("./server"));
const port = parseInt(process.env.PORT || '4000');
const starter = new server_1.default().start(port)
    .then(port => console.log(`Running on port ${port}`))
    .catch(error => {
    console.log(error);
});
exports.default = starter;
