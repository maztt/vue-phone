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


}