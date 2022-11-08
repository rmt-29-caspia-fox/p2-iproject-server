const express = require('express')

const router = require('./routes')

const app = express()

const port = 3000

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(router)

app.use((err, req, res, next) => {
	let code = 500
	let message = "Internal server error"

	res.status(code).json({message})
})

app.listen(port, () => {
	console.log(`App run on http://localhost:${port}`);
})