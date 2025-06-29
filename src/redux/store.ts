import { configureStore } from "@reduxjs/toolkit";

// Import Reducers
import { staffImformation } from "./reducers/staff.reducer";
import { reportImformation } from "./reducers/report.reducer";
import { adminInformation } from "./reducers/admin.reducer";
import { staffLocation } from "./reducers/staffLocation.reducer";


export const store = configureStore({
    reducer: {
        staffImformation: staffImformation.reducer,
        reportImformation: reportImformation.reducer,
        adminInformation: adminInformation.reducer,
        staffLocation: staffLocation.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
