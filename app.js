import express from 'express'
import Signal from './alertModel.js'
import { dbConnection } from './db.js'

const app = express()
const port = 3000

app.use(express.json()) // para parsear el cuerpo de las solicitudes HTTP de JSON

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', async (req, res) => {
  try {
    const signal = new Signal({
      signal: req.body.signal
    })

    const savedSignal = await signal.save()

    res.status(201).json(savedSignal)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/signals', async (req, res) => {
  try {
    const signals = await Signal.find()

    res.json(signals)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.put('/signals/:id', async (req, res) => {
  try {
    const signal = await Signal.findById(req.params.id)

    if (signal) {
      signal.signal = req.body.signal

      const updatedSignal = await signal.save()

      res.json(updatedSignal)
    } else {
      res.status(404).json({ message: 'Signal not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

dbConnection() // Conecta con la base de datos

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
