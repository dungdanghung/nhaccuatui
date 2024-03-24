import request from "../config/api";


export async function Login(user_name: string, password: string) {
    try {
        const formdata = new FormData()
        formdata.append('username', user_name)
        formdata.append('password', password)
        const rs = await request.post("/auth/login", formdata)
        if (rs?.data.success && rs?.data.data.token) {
            window.localStorage.setItem('token', JSON.stringify(rs.data.data.token))
            return true
        } else {
            return false
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

export async function Register(data: any) {
    try {
        const formdate = new FormData()
        formdate.append('first_name', data.firstName)
        formdate.append('last_name', data.lastName)
        formdate.append('user_name', data.userName)
        formdate.append('emailorphone', data.emailorphone)
        formdate.append('gender', data.gender)
        formdate.append('birth_day', data.birth)
        formdate.append('password', data.password)
        const rs = await request.post("/auth/register", formdate)
        if (rs.data.success) {
            return true
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}