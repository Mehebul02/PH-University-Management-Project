/* eslint-disable prefer-const */
import globalErrorHandle from './app/middleWares/globalErrorHandling'
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'

import notFound from './app/middleWares/notFound'
import router from './app/routes'
const app: Application = express()
app.use(express.json())
app.use(cors())

// application route 
app.use('/api/v1/students', router)

const text =app.get('/', (req: Request, res: Response,next:NextFunction) => {
   const a= 10
   res.send(a)
})
app.get('/',text)

app.use(globalErrorHandle)


// // not found the api 

app.use(notFound)
export default app
