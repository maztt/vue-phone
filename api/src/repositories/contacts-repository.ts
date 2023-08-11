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

    static async update (id: number, data: AddContactDTO): Promise<AddContactDTO> {
        const subquery = 'SELECT * FROM contacts WHERE id = ?'
        const updatedAt = new Date().toISOString() 
        const values: (string | number)[] = []
        const fieldsToUpdate: string[] = []
        console.log(data)
        if (data.name) {
            fieldsToUpdate.push(` name = ?`)
            values.push(data.name)
        }
        if (data.phone) {
            fieldsToUpdate.push(` phone = ?`)
            values.push(data.phone)
        }
        if (data.email) {
            fieldsToUpdate.push(` email = ?`)
            values.push(data.email)
        }
        if (data.picture) {
            fieldsToUpdate.push(` picture = ?`)
            values.push(data.picture)
        }
        fieldsToUpdate.push(` updatedAt = ?`)
        values.push(updatedAt)
        values.push(id)

        const query = `UPDATE contacts SET ${fieldsToUpdate.join(', ')} WHERE id = ?`

        return new Promise((resolve, reject) => {
            db.run(query, values, function (err) {
                if (err) {
                    console.error(`An error occurred while trying to update ID: ${id}.`, err.message)
                    reject(err)
                    return
                }
                db.get(subquery, id, (err, row) => {
                    if (err) {
                        console.error('Error while trying to retrieve most recent added contact: ', err.message)
                        reject(err)
                        return
                    }
                    console.log('Contact was successfully updated in the database!')
                    resolve(row as AddContactDTO)
                })
            })
        })
    }

    static async delete (id: number): Promise<boolean> {
        const deletedAt = new Date().toISOString()
        const query = `UPDATE contacts SET deletedAt = ? WHERE id = ${id}`
        return new Promise((resolve, reject) => {
            db.run(query, deletedAt, (err) => {
                if (err) {
                    console.error(`An error occurred while trying to delete ID: ${id}. `, err.message)
                    reject(err)
                    return
                }
                resolve(true)
            })
        })
    }
}