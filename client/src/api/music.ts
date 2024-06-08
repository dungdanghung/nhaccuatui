import request from "../config/api";

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
export async function GetNewSongs() {
    try {
        const rs = await request.get("/music/new-song")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}
export async function upLoad() {
    try {
        const rs = await request.get("/music/new-song")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function GetZingchart() {
    try {
        const rs = await request.get("/music/zingchart")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}


export async function AddHeart(id: number) {
    try {
        await request.post("/music/add-heart", { 'song_id': id })
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

export async function GetMySongUpload() {
    try {
        const rs = await request.get("/music/my-song-upload")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function Search(value = '') {
    try {
        const rs = await request.get("/music/search/" + value)
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}


export async function SearchSong(value: any) {
    try {
        const rs = await request.get("/music/search-song/" + value)
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}
export async function GetLyric(value: any) {
    try {
        const rs = await request.get("/music/get-lyric/" + value)
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function addView(id: number | undefined) {
    if (id) {
        try {
            await request.post("/music/add_view/", { 'id': id })
        } catch (error: any) {
            console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
            throw new Error(error.message);
        }
    }
}

export async function getListHistory(limit: number | undefined) {
    try {
        const rs = await request.get(`/music/song_history${limit ? '?start_from=' + limit : ''}`)
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}