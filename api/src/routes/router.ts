import express, { Router } from 'express'
import { Request, Response } from 'express';
import { AppController } from '../controllers/app.controller';
import { AddContactDTO } from '../controllers/dto/add-contact.dto';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { UpdateContactDTO } from '../controllers/dto/update-contact.dto';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
router.post('/add', validationMiddleware(AddContactDTO), async (req: Request, res: Response) => {
  try {
    const added = await AppController.add(req.body)
    return res.status(200).json(added)
  } catch (err) {
    return res.status(500).send(err)
  }
})
router.get('/mycontacts', async (req: Request, res: Response) => {
  try {
    const data = await AppController.list()
    return res.json(data)
  } catch (err) {
    return res.status(500).send(err)
  }
})
router.get('/show/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = await AppController.show(+id)
    return res.json(data)
  } catch (err) {
    return res.status(500).send(err)
  }
})
router.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const response = await AppController.delete(+id)
    if (!response) {
      return res.status(404).json(`Contact ${id} has not been found.`)
    }
    return res.status(200).json(`Contact ${id} has been deleted from the database.`)
  } catch (err) {
    return res.status(500).send(err)
  }
})
router.patch('/update/:id', validationMiddleware(UpdateContactDTO), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updated = await AppController.update(+id, req.body)
    if (!updated) {
      return res.status(404).json(`Contact ${id} has not been found.`)
    }
    return res.status(200).json({message: `Contact ID ${id} has been updated.`, updated })
  } catch (err) {
    return res.status(500).send(err)
  }
})

export default router;
