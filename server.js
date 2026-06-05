const express = require('express')
const app = express()
const port = 3000
const initSqlJs = require('sql.js')
const fs = require('fs')

app.use(express.json())

let db

async function initDB() {
    const SQL = await initSqlJs()
    
    if (fs.existsSync('fix365.db')) {
        const fileBuffer = fs.readFileSync('fix365.db')
        db = new SQL.Database(fileBuffer)
    } else {
        db = new SQL.Database()
    }
}

function saveDB() {
    const data = db.export()
    fs.writeFileSync('fix365.db', Buffer.from(data))
}

app.get('/', (req, res) => {
    res.send('365fix server is running!')
})

app.get('/bookings', (req, res) => {
    const result = db.exec('SELECT * FROM bookings')
    res.json(result[0] ? result[0].values : [])
})

app.post('/bookings', (req, res) => {
    const { name, phone, service, location, date } = req.body
    db.run(`INSERT INTO bookings (name, phone, service, location, date) 
            VALUES (?, ?, ?, ?, ?)`, [name, phone, service, location, date])
    saveDB()
    res.json({ message: 'Booking created' })
})

app.patch('/bookings/:id', (req, res) => {
    const { status } = req.body
    const { id } = req.params
    db.run('UPDATE bookings SET status = ? WHERE id = ?', [status, id])
    saveDB()
    res.json({ message: `Booking ${id} updated to ${status}` })
})

initDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`)
    })
})