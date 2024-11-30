import { Router } from "express";
import { userRouters } from "../../modules/user/user.route";
import { StudentRoutes } from "../../modules/student/student.route";

const router = Router()


const moduleRoutes = [
    {
        path: '/users',
        route: userRouters
    },
    {
        path: '/students',
        route: StudentRoutes
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router