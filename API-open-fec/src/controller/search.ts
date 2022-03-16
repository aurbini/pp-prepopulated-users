import { Response, Request, NextFunction } from "express";


export const findCand = (req: Request, res: Response) => {

    res.send({ message: 'Success' })
}