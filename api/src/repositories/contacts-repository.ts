import sqlite3 from 'sqlite3'
import { AddContactDTO } from '../controllers/dto/add-contact.dto'

const dbPath = './src/db/db.sqlite'
const db = new sqlite3.Database(dbPath)

export class ContactsRepository {
    static async insert (data: AddContactDTO): Promise<AddContactDTO> {
        const { name, phone, email, picture } = data
        const createdAt = new Date().toISOString()
        const query = 'INSERT INTO contacts (name, phone, email, picture, createdAt) VALUES (?, ?, ?, ?, ?)'
        const subquery = 'SELECT * FROM contacts WHERE id = ?'
        const values = [name, phone, email, picture, createdAt]

        return new Promise((resolve, reject) => {
            db.run(query, values, function (err) {
                if (err) {
                    console.error('Error while adding a contact: ', err.message)
                    reject(err)
                    return
                }
                const lastID = this.lastID
                db.get(subquery, [lastID], (err, row) => {
                    if (err) {
                        console.error('Error while trying to retrieve most recent added contact: ', err.message)
                        reject(err)
                        return
                    }
                    console.log('Contact was successfully added to the database!')
                    resolve(row as AddContactDTO)
                })
            })
        })
    }
}