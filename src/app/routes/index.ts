import { Router } from "express";
import { userRouters } from "../../modules/user/user.route";
import { StudentRoutes } from "../../modules/student/student.route";
import { AcademicSemesterRoute } from "../../modules/academicSemester/createAcademicSemester.route";
import { AcademicDepartmentRoutes } from "../../modules/academicDeparment/academicDepartment.route";
import { AcademicFacultyRoute } from "../../modules/academicFaculty/academicFaculty.route";
import { FacultyRoutes } from "../../modules/faculty/faculty.route";
import { AdminRoute } from "../../modules/admin/admin.route";
import { CourseRoutes } from "../../modules/course/course.route";
import { SemesterRegistrationRoutes } from "../../modules/semesterRegistrantion/semesterRegistrantion.route";





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
        route: FacultyRoutes
    },
    {
        path: '/admins',
        route: AdminRoute
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
    {
        path: '/courses',
        route: CourseRoutes
    },
    {
        path: '/semester-registration',
        route: SemesterRegistrationRoutes
    },


]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router