import express, { Express } from 'express'
import router from './routes/router.js'

const app: Express = express()
const port: number = 3000

app.use(express.json())
app.use('/api/v1', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})