import { examModel } from "./exam.model";

export const startExam = async (payload: object) => {
    return examModel.create(payload)
}

export const endExam = async (payload: object, id:string) => {
    return examModel.updateOne({
        id
    },payload)
}
