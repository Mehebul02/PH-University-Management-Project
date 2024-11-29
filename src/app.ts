import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { userRouters } from './modules/user/user.route'
import { StudentRoutes } from './modules/student/student.route'
const app: Application = express()
app.use(express.json())
app.use(cors())

// application route 
app.use('/api/v1/students',StudentRoutes)
app.use('/api/v1/users', userRouters)

app.get('/', (req: Request, res: Response) => {
    res.send({
        status: true,
        message: 'Server is running',
    })
})

export default app
