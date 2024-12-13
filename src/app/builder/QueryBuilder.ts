import { FilterQuery, Query } from "mongoose";


class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;
    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery; // Proper assignment
        this.query = query;           // Proper assignment
    }
    search(searchableFields: string[]) {
        if (this?.query.searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' }
                }) as FilterQuery<T>)
            })
        }

        return this

    }

    filter() {
        const queryObj = { ...this.query }

        // filtering 
        const excludeField = ["searchTerm", "sort", "limit", 'page', "fields"]
        excludeField.forEach((el) => delete queryObj[el])

        this.modelQuery = this.modelQuery.find(queryObj)
        return this
    }


}



export default QueryBuilder;
