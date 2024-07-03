import request from "../config/api";

export async function create(formData: FormData) {
    try {
        const rs = await request.post("/post/create", formData)
        if (rs?.data.success) {
            return true
        } else {
            return false
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

export async function GetPosts(id: any) {
    try {
        const rs = await request.get("/post/get-posts/" + id)
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

export async function GetPost() {
    try {
        const rs = await request.get("/post/get-post")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

export async function AddHeart(id: number, type: string) {
    try {
        await request.post("/post/add-heart", { 'post_id': id, 'type': type })
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}


export async function AddComment(formData: FormData) {
    try {
        const rs = await request.post("/post/add-comment", formData)
        if (rs?.data.success) {
            return true
        } else {
            return false
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

export async function GetComments(id: number, type: string) {
    try {
        const rs = await request.get("/post/get-comment/" + id + '/' + type)
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

export async function DeleteComment(id: number) {
    try {
        const rs = await request.post("/post/delete-comment", { 'comment_id': id })
        if (rs?.data.success) {
            return true
        } else {
            return false
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}