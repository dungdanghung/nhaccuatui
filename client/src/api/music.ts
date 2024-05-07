import request from "../config/api";
import { useAppContext } from "../context";

export async function CreateMusic(formData: any) {
    try {

        const rs = await request.post("/music/create", formData)
        if (rs?.data.success) {
            return true
        } else {
            return false
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}


export async function GetSongUpload() {
    try {
        const rs = await request.post("/music/getsongupload")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}


export async function GetSongDetail(id: string | undefined) {
    try {
        const rs = await request.post("/music/getsongdetail", { "id": id })
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function EditSongDetail(data: any) {
    try {
        const rs = await request.post("/music/editsongdetail", data)
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function SetStatusSong(id: any, status: any) {
    try {
        const rs = await request.post("/music/changestatus", { id: id, status: status })
        if (rs.data) {
            rs.data['status'] = status
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}
export async function GetHotSongs() {
    try {
        const rs = await request.get("/music/song-hot")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}