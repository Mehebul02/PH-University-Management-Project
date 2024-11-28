export type TUser = {
    id: string,
    password: string,
    passwordChange: boolean,
    role: 'admin' | 'student' | 'faculty',
    status:'in-progress'|'blocked'
    isDeleted: boolean,

}