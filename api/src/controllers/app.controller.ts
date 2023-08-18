import sqlite3 from 'sqlite3';
import { ContactsRepository } from '../repositories/contacts-repository';
import { AddContactDTO } from './dto/add-contact.dto'
import { Contact } from './dto/contact';
import { UpdateContactDTO } from './dto/update-contact.dto';

const dbPath = './src/db/db.sqlite';
const db = new sqlite3.Database(dbPath);

export class AppController {
    static async add (data: AddContactDTO): Promise<AddContactDTO> {
        const added = await ContactsRepository.insert(data)
        return added
    }

    static async list (): Promise<Contact[]> {
        const data = await ContactsRepository.list()
        const contacts = data.map(contact => {
            return {
                id: contact.id,
                name: contact.name,
                phone: contact.phone,
                email: contact.email,
                picture: contact.picture
            }
        })
        return contacts
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

    static async update (id: number, data: UpdateContactDTO): Promise<UpdateContactDTO | boolean> {
        const isValid = await this.show(id)
        if (!isValid) return false
        return await ContactsRepository.update(id, data)
    }
}