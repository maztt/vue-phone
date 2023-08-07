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
router.get('/show/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await AppController.show(+id)
  return res.send(data)
})
router.delete('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const response = await AppController.delete(+id)
  if (!response) {
    return responseToUser(404, `Contact ${id} has not been found.`, res)
  }
  return responseToUser(200, `Contact ${id} has been deleted from the database.`, res)
})

export default router;
