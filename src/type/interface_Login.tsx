interface interface_Login_Props {
    closeLogin: () => void
}

// Service
interface interface_Login_Serv_data {
    gmail: string,
    password: string
}

// Handler
interface interface_Login_LoginHandler {
    gmail: string,
    password: string
}

export type {
    interface_Login_Props,

    interface_Login_Serv_data,

    interface_Login_LoginHandler
}