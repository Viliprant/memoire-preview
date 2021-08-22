const express = require('express')
const app = express()
require('dotenv').config()
const helmet = require("helmet");

const monitoringRouter = require('./routers/monitoringRouter')

const port = process.env.PORT || 3000

app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/monitoring', monitoringRouter);

//Errors
app.use((err, req, res, next) => {
    res.status(500).send({ error: 'Something failed!' });
})

app.use((req, res) => {
    res.status(404).send({ error: 'Nothing there !' });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})