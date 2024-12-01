import express, { NextFunction, Request, Response, Router } from 'express'
import { userControllers } from './user.controller'
import { AnyZodObject } from 'zod'

const router = Router()

const shenaBaheni = (schema: AnyZodObject) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        // validation

        const zodParsedData = await schema.parseAsync({
            body: req.body
        })
        next()

    }
}

router.use('/create-student', shenaBaheni('shenabahini'), userControllers.createStudent)

export const userRouters = router