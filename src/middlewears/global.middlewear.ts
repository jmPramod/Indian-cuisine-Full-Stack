import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

  console.error("sssssss",JSON.stringify(err));


  res.status(err.status||500).json({
    error: err.message||"Something went wrong",
    message:null,
    status:err.status||500,
    data:null
  });
};
