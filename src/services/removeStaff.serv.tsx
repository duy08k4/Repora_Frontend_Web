import type {interface_MainPage_RemoveStaff_Serv } from "../type/interface_MainPage"

const removeStaff = async (data: interface_MainPage_RemoveStaff_Serv) => {
    const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_GATE}/admin-remove-staff`, {
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

export {
    removeStaff,
}