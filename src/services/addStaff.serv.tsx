import type { interface_MainPage_AddStaff_Serv } from "../type/interface_MainPage"

const addStaff = async (data: interface_MainPage_AddStaff_Serv) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('gmail', data.gmail);
    formData.append('image', data.file);

    const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_GATE}/admin-upload`, {
        method: "POST",
        credentials: "include",
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            return data
        })

    return serverResponse
}

export {
    addStaff,
}