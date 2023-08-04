import { AddContactDTO } from './dto/add-contact.dto';
import sqlite3 from 'sqlite3';

const dbPath = './src/db/db.sqlite';
const db = new sqlite3.Database(dbPath);

export class AppController {
    static async add (data: AddContactDTO): Promise<AddContactDTO> {
        const { name, phone, email, picture } = data;
        const query = 'INSERT INTO contacts (name, phone, email, picture) VALUES (?, ?, ?, ?)';
        const values = [name, phone, email, picture];

        db.run(query, values, (err) => {
            if (err) {
                console.error('Error while adding a contact: ', err.message)
                return false
            }
            console.log('Contact added to the database successfully!')
        })

        return data
    }

    static async list (): Promise<AddContactDTO[]> {
        const query = 'SELECT * FROM contacts'
        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if (err) {
                    console.error('Error while trying to retrieve data: ', err.message)
                    reject(err)
                }
                resolve(rows as AddContactDTO[])
            })
        })
    }

    static async show (id: number): Promise<any> {
        const query = `SELECT * FROM contacts WHERE id = ${id}`
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    console.error(`An error occurred while trying to retrieve data from ID: ${id}. `, err.message)
                    reject(err)
                }
                resolve(rows)
            })
        })
    }
}