import type { ReactNode } from "react";

interface interface__authContext {
    cacheSetData: (param: any) => void,

    // Listener

    enableListener_userInformation_staff: () => void,
    enableListener_reportInformation: () => void,

    // Off listener
    disableListener_userInformation_staff: () => void,
    disableListener_reportInformation: () => void
}

interface interface__authProviderProps {
    children: ReactNode,
}

interface staffInformationState {
    listStaff: interface__staff__reducer[];
}

interface reportInformationState {
    listReport: interface__report__reducer[];
}

interface adminInformationState {
    gmail: string
}

interface interface__staff__reducer {
    gmail: string,
    username: string,
    uuid: string,
    avatarCode: string,
    role: "staff",
    taskList: string[],
    taskDone: string[],
    createdTime: string
}

interface interface__report__reducer {
    name: string,
    reportID: string,
    type: string,
    level: string,
    reporter: {
        name: string,
        gmail: string
    },
    time: string,
    position: [number, number],
    imgCode: string,
    staff: [],
    state: string
}

export type {
    interface__authContext,
    interface__authProviderProps,
    staffInformationState,
    reportInformationState,
    adminInformationState,
    interface__staff__reducer,
    interface__report__reducer
}