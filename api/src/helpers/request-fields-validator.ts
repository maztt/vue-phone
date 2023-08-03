import { Response } from "express";
import { AddContactDTO } from "../controllers/dto/add-contact.dto";

export const requestFieldsValidator = (req: AddContactDTO, res: Response) => {
    if (!req.name || !req.phone || !req.email) {
        return res.status(400).json({
            success: false,
            message: 'Request body is empty or malformed!'
        });
    }
    return true
}