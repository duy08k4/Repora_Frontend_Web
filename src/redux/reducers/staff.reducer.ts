import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DocumentData } from "firebase/firestore";
import type { interface__staff__reducer, staffInformationState } from "../../type/interface__Auth";

// Import interface


// Define initial values
const initial_staffInformation: staffInformationState = {
    listStaff: []
}

// Export reducer
export const staffImformation = createSlice({
    name: "staffImformation",
    initialState: initial_staffInformation,
    reducers: {
        // Các action trong reducer sẽ được tự động tạo ra
        cacheAddListStaff: (state, action: PayloadAction<interface__staff__reducer[]>) => {
            const inputListStaff = action.payload
            state.listStaff = [...inputListStaff]
        },
    },
})

export const {
    cacheAddListStaff
} = staffImformation.actions;

export default staffImformation.reducer