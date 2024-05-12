import request from "../config/api";

export async function CreateMv(formData: any) {
    try {

        const rs = await request.post("/mv/create", formData)
        if (rs?.data.success) {
            return true
        } else {
            return false
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}
export async function GetListNewMV() {
    try {
        const rs = await request.get("/mv/get-new-mv")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}
export async function GetMVUpload() {
    try {
        const rs = await request.get("/mv/get-mv-upload")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

export async function SetStatusMV(id: any, status: any) {
    try {
        const rs = await request.post("/mv/changestatus", { id: id, status: status })
        if (rs.data) {
            rs.data['status'] = status
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function GetMVDetail(id: string | undefined) {
    try {
        const rs = await request.get("/mv/get-mv-detail/" + id)
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function EditMVDetail(data: any) {
    try {
        const rs = await request.post("/mv/edit-mv-detail", data)
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}