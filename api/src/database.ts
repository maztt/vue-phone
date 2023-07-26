import sqlite3 from 'sqlite3'

const initializeDb = () => {
    const dbPath = './src/db/db.sqlite'
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error('Error opening database:', err.message);
        } else {
          console.log('Connected to the SQLite database.');
        }
      });
      
      db.run(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT NOT NULL,
          picture TEXT
        )
      `, (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          console.log('Table "contacts" created successfully.');
        }
      });
}

export default initializeDb
