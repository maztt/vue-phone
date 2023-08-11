import { ContactsRepository } from '../repositories/contacts-repository';
import { AddContactDTO } from './dto/add-contact.dto'
import sqlite3 from 'sqlite3';

const dbPath = './src/db/db.sqlite';
const db = new sqlite3.Database(dbPath);

export class AppController {
    static async add (data: AddContactDTO): Promise<AddContactDTO> {
        const added = await ContactsRepository.insert(data)
        return added
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

    static async show (id: number): Promise<AddContactDTO> {
        const query = `SELECT * FROM contacts WHERE id = ${id}`
        return new Promise((resolve, reject) => {
            db.get(query, (err, row) => {
                if (err) {
                    console.error(`An error occurred while trying to retrieve data from ID: ${id}. `, err.message)
                    reject(err)
                }
                resolve(row as AddContactDTO)
            })
        })
    }
        
    static async delete (id: number): Promise<boolean> {
        const isValid = await this.show(id)
        if (!isValid) return false
        return await ContactsRepository.delete(id)
    }

    static async update (id: number, data: AddContactDTO): Promise<AddContactDTO> {
        return await ContactsRepository.update(id, data)
    }
}