import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DocumentData } from "firebase/firestore";
import type { adminInformationState  } from "../../type/interface__Auth";

// Import interface


// Define initial values
const initial_admin: adminInformationState = {
    gmail: ""
}

// Export reducer
export const adminInformation = createSlice({
    name: "adminInformation",
    initialState: initial_admin,
    reducers: {
        // Các action trong reducer sẽ được tự động tạo ra
        cacheSetGmail: (state, action: PayloadAction<{inputGmail: string}>) => {
            state.gmail = action.payload.inputGmail
        },
    },
})

export const {
    cacheSetGmail
} = adminInformation.actions;

export default adminInformation.reducer