import express, { Router } from 'express'
import { Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default router;
