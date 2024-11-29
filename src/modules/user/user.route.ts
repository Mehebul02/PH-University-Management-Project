import express, { Router } from 'express'
import { userControllers } from './user.controller'

const router = Router()
router.use('/create-student', userControllers.createStudent)

export const userRouters = router