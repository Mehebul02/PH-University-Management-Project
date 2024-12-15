
import express from 'express'
import { AdminControllers } from './admin.controller'
const router = express.Router()


router.get('/:id', AdminControllers.getSingleAdmin)
router.get('/', AdminControllers.getAllAdmin)




export const AdminRoute = router