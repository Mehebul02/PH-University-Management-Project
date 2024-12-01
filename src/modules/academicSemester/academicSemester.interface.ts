
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




export type TAcademicSemester = {
    name: 'Autumn' | "Summer" | "Fall"
    code: '1' | '2' | '3'
    year:Date
    startMonth:TMonth
}