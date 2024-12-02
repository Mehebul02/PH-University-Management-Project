 

import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import notFound from './app/middleWares/notFound'
import router from './app/routes'
import globalErrorHandle from './app/middleWares/globalErrorHandling'
const app: Application = express()
app.use(express.json())
app.use(cors())

// application route 
app.use('/api/v1/students', router)

app.get('/', (req: Request, res: Response) => {
   res.send({
       status: true,
       message: "Server is running"
   })
})

app.use(globalErrorHandle)


// // // not found the api 

app.use(notFound)
export default app
