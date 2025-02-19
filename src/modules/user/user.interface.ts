import { Types } from "mongoose"

export type TUserRole = "admin" | "instructer" | "student" | "user" 

export type TProgress={
    couseId:Types.ObjectId,
    milestoneNo:string | number,
    moduleNo:string | number,
    vedioNo:string | number,
    lastQuizNo:string | number,
}

export type TUser={
    name:string,
    img:string,
    mobileNo:string,
    email:string,
    role?:TUserRole,
    password:string,
    isDeleted?:string,
    isBlocked?:boolean
    isLoggedIn?:boolean,
    loggedOutTime?:Date
}


export type TStudent ={
    user:Types.ObjectId | TUser,
    paymentStatus:boolean,
    progress:[TProgress],
    courseAccess:[Types.ObjectId],
    isDeleted:string,
    isBlocked:boolean
}


export type TInstructer ={
    user:Types.ObjectId | TUser,
    courseAccess:[Types.ObjectId],
    isDeleted:string,
    isBlocked:boolean

}