import { Request, Response } from "express";

export function indexWelcome(_req: Request, res: Response): void {
  res.json('Api Parabellum CLOSETt');
}
