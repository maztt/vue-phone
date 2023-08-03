import { Response } from "express"

export const responseToUser = (code: number, message: string, res: Response) => {
    return res.status(code).json({
          success: false,
          message
    })
}