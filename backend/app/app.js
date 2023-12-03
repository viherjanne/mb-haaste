import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import errorHandler from './errorHandler.js'
import routes from './routes.js'

const app = express()

// MB-TODO: What are middlewares in Express?
// Functions/operations to perform between receiving the request and returning the response, like modify the request/response
// MB-TODO: What these middlewares do?
// Parse incoming requests with JSON payload and put the parsed data to req.body
app.use(express.json())
// Parse incoming requests with urlencoded payloads. Extended allows parsing more complex data structures
app.use(express.urlencoded({ extended: true }))
// Set HTTP headers to improve security
app.use(helmet())
// Set logging using minimal format
app.use(morgan('tiny'))

app.use(routes)

app.use(errorHandler)

export default app
