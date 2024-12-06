import { Router } from "express";
import { userRouters } from "../../modules/user/user.route";
import { StudentRoutes } from "../../modules/student/student.route";
import { AcademicSemesterRoute } from "../../modules/academicSemester/createAcademicSemester.route";
import { AcademicDepartmentRoutes } from "../../modules/academicDeparment/academicDepartment.route";



const router = Router()


const moduleRoutes = [
    {
        path: '/users',
        route: userRouters
    },
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoute
    },
  
        {
            path: '/academic-departments',
            route: AcademicDepartmentRoutes,
          },


    
    
    
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router