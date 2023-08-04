import express, { Router } from 'express'
import { Request, Response } from 'express';
import { AppController } from '../controllers/app.controller';
import { requestFieldsValidator } from '../helpers/request-fields-validator';
import { responseToUser } from '../helpers/response-to-user';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
router.post('/add', async (req: Request, res: Response) => {
  const isValid = requestFieldsValidator(req.body, res)
  if (isValid !== true) return
  
  const added = await AppController.add(req.body)
  if (!added) return responseToUser(500, 'Failed to add contact', res)
  return responseToUser(201, `Contact ${added.name} added successfully.`, res)
})
router.get('/mycontacts', async (req: Request, res: Response) => {
  const data = await AppController.list()
  return res.send(data)
})

export default router;
