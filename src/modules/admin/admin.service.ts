import QueryBuilder from "../../app/builder/QueryBuilder"
import { AdminSearchableFields } from "./admin.constant"
import { Admin } from "./admin.model"



const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
    const adminQuery = new QueryBuilder(Admin.find(), query)
        .search(AdminSearchableFields)
        .fields()
        .sort()
        .paginate()
        .fields()
    const result = await adminQuery.modelQuery
    return result
}

const getSingleAdminFromDB = async (id: string) => {
    const result = await Admin.findById(id)
    return result
}


export const AdminServices = {
    getAllAdminsFromDB,
    getSingleAdminFromDB
}