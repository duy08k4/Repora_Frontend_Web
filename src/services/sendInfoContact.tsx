import type { interface__Contact_serv } from "../type/interface_Contact"

const sendContact = async (data: interface__Contact_serv) => {
    const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_GATE}/admin-contact`, {
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
    sendContact,
}