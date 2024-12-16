import { Request, Response, NextFunction } from 'express';

export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode;

    // Ensure inheritance chain is correct
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError || Object.getPrototypeOf(err) === CustomError.prototype) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Handle unknown errors
  return res.status(500).json({ error: 'Internal server error'});
};