import type { interface_Login_Serv_data } from "../type/interface_Login"

// Login
const loginAccount = async (data: interface_Login_Serv_data) => {
    const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_GATE}/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            data
        })
    })
        .then(res => res.json())
        .then(data => {
            return data
        })

    return serverResponse
}

// Auto login
const autoLogin = async () => {
    const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_GATE}/admin-login/auto`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    })
        .then(res => res.json())
        .then(data => {
            return data
        })

    return serverResponse
}

export { loginAccount, autoLogin }