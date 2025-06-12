import type { interface__ReportForm__taskAssignment__serv } from "../type/interface_ReportForm"

const taskAssignment = async (data: interface__ReportForm__taskAssignment__serv) => {
    const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_GATE}/admin-assign-task`, {
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
    taskAssignment,
}