import {Request, Response} from "express";

export const NotFound = (req: Request, res: Response) => {
    res.send('Directory not found.');
}