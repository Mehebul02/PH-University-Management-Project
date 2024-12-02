import { TAcademicSemesterCode, TAcademicSemesterName, TAcademicSemesterNameCodeMapper, TMonth } from "./academicSemester.interface";

export const Months: TMonth[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const AcademicSemesterName: TAcademicSemesterName[] = ['Autumn', 'Summer', 'Fall']
export const AcademicSemesterCode: TAcademicSemesterCode[] = ['1', '2', '3']

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    'Autumn': '01',
    "Summer": '2',
    "Fall": '03'
}