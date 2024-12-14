import { Router } from "express";
import { userRouters } from "../../modules/user/user.route";
import { StudentRoutes } from "../../modules/student/student.route";
import { AcademicSemesterRoute } from "../../modules/academicSemester/createAcademicSemester.route";
import { AcademicDepartmentRoutes } from "../../modules/academicDeparment/academicDepartment.route";
import { AcademicFacultyRoute } from "../../modules/academicFaculty/academicFaculty.route";
import { FacultyRoutes } from "../../modules/faculty/faculty.router";



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
        path: '/faculties',
        router: FacultyRoutes

    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoute
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoute
    },

    {
        path: '/academic-departments',
        route: AcademicDepartmentRoutes,
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router