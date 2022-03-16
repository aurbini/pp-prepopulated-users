import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import * as baseRoute from './routes'
import { Application } from 'express';
import baseRoutes from './routes'

const PORT = 3000;
const app: Application = express();

app.use(json());

app.use('/', baseRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message })
})

app.listen(PORT, () => console.log('App listening on PORT ' + PORT)); 
