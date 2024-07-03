import request from "../config/api";


export async function GetChartUser() {
    try {
        const rs = await request.get("/manager/getChartUser/")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function GetChartSong() {
    try {
        const rs = await request.get("/manager/getChartSong/")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function GetChartMV() {
    try {
        const rs = await request.get("/manager/getChartMV/")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function GetChartSongAccept() {
    try {
        const rs = await request.get("/manager/getChartSongAccept/")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function GetChartMVAccept() {
    try {
        const rs = await request.get("/manager/getChartMVAccept/")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}


export async function GetChartUserOnline() {
    try {
        const rs = await request.get("/manager/getChartUserOnline/")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function GetRatioUser() {
    try {
        const rs = await request.get("/manager/getRatioUser/")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function GetRatioSong() {
    try {
        const rs = await request.get("/manager/getRatioSong/")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}
export async function GetRatioMV() {
    try {
        const rs = await request.get("/manager/getRatioMV/")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function GetNewUser() {
    try {
        const rs = await request.get("/manager/getNewUser/")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function GetNewSong() {
    try {
        const rs = await request.get("/manager/getNewSong/")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function GetNewMV() {
    try {
        const rs = await request.get("/manager/getNewMV/")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function GetFeaturedUser() {
    try {
        const rs = await request.get("/manager/getFeaturedUser/")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function GetFeaturedSong() {
    try {
        const rs = await request.get("/manager/getFeaturedSong/")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function GetFeaturedMV() {
    try {
        const rs = await request.get("/manager/getFeaturedMV/")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}

export async function GetCountDetail() {
    try {
        const rs = await request.get("/manager/getCountDetail/")
        if (rs.data) {
            return rs.data
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
        throw new Error(error.message);
    }
}
