interface interface_MainPage_Props {
    closeManageStaff: () => void
}

// Service
interface interface_MainPage_AddStaff_Serv {
    name: string,
    gmail: string,
    file: File,
}

interface interface_MainPage_RemoveStaff_Serv {
    listGmail: string[],
    listAvatarCode: string[],
    password: string,
    gmail: string
}

export type {
    interface_MainPage_Props,
    interface_MainPage_AddStaff_Serv,
    interface_MainPage_RemoveStaff_Serv
}