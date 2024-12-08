
export type TMonth =

    | "January"
    | "February"
    | "March"
    | "April"
    | "May"
    | "June"
    | "July"
    | "August"
    | "September"
    | "October"
    | "November"
    | "December";


export type TAcademicSemesterName = 'Autumn' | 'Summer' | 'Fall'
export type TAcademicSemesterCode = '1' | '2' | '3';

export type TAcademicSemester = {
    name: TAcademicSemesterName
    code: TAcademicSemesterCode
    year: string
    startMonth: TMonth
    endMonth: TMonth
}|null

export  type TAcademicSemesterNameCodeMapper = {
    [key: string]: string
}