import { Request, Response, NextFunction} from 'express';
export class ErrorHandler extends Error {
    constructor(public statusCode: number,public message: string) {
      super();
    }
  }
  
  export function handleError(error: ErrorHandler, req: Request, res: Response, next: NextFunction) {
    let { statusCode , message } = error;
  
    if (!statusCode) {
      statusCode = 500;
    }
  
    res.status(statusCode).json({
      statusCode,
      message
    });
  };
  