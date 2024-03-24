import request from "../config/api"
import { User } from "../models/user"

export async function GetUser() {
    try {
        const rs = await request.get("/user/")
        if (rs?.data.success && rs?.data.data as User) {
            return rs.data.data
        } else {
            throw new Error
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}