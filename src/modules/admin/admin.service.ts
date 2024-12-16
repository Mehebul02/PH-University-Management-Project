import QueryBuilder from "../../app/builder/QueryBuilder"
import { AdminSearchableFields } from "./admin.constant"
import { TAdmin } from "./admin.interface"
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

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {

    const { name, ...remainingAdminData } = payload

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingAdminData
    }

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name ${key}`] = value
        }
    }

    const result = await Admin.findByIdAndUpdate({ id }, modifiedUpdatedData, { new: true, runValidators: true, })
    return result
}


export const AdminServices = {
    getAllAdminsFromDB,
    getSingleAdminFromDB,
    updateAdminIntoDB
}