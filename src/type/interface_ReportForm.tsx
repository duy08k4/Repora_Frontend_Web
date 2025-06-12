import type { interface__report__reducer } from "./interface__Auth"

interface interface__ReportForm__props {
    closeReportForm: () => void,

    report: interface__report__reducer,
    reportID: string
}

// Service
interface interface__ReportForm__taskAssignment__serv {
    listStaff: string[],
    reportID: string
}

export type {
    interface__ReportForm__props,
    interface__ReportForm__taskAssignment__serv
}