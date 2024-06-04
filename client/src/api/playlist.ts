import request from "../config/api";


export async function Create(id: number) {
    try {
        const rs = await request.post("/playlist/create", { 'song_id': id })
        if (rs?.data.success) {
            return true
        } else {
            return false
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

export async function GetPlaylist() {
    try {
        const rs = await request.get("/playlist/get-playlist")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

export async function Remove(id: number) {
    try {
        const rs = await request.post("/playlist/remove", { 'playlist_id': id })
        if (rs?.data.success) {
            return true
        } else {
            return false
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}
