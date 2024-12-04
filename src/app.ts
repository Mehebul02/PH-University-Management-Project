import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandle from './app/middleWares/globalErrorHandling'
import notFound from './app/middleWares/notFound'
import router from './app/routes'
// import { userControllers } from './modules/user/user.controller'
const app: Application = express()
app.use(express.json())
app.use(cors())

// application route 

app.use('/api/v1/', router)

// app.use('/',text)
const test = (req: Request, res: Response) => {

  res.send({
    success: true,
    message: 'Server is running'
  })
};

app.get('/', test);

app.use(globalErrorHandle)

// // // // not found the api 
app.use(notFound)
export default app

