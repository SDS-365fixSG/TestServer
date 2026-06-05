const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('365fix server is running!')
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})