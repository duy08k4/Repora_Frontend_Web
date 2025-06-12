import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Import interface

// Define initial values
const initial_staffLocation = {
    staffLocation: {} as Record<string, [number, number]>,
    staffStatus: {} as Record<string, string>
}

// Export reducer
export const staffLocation = createSlice({
    name: "staffLocation",
    initialState: initial_staffLocation,
    reducers: {
        // Các action trong reducer sẽ được tự động tạo ra
        cacheAddAnotherStaffLocation: (state, action: PayloadAction<{ targetStaffGmail: string, targetStaffLocation: [number, number] }>) => {
            const inputData = action.payload
            const targetStaffGmail = inputData.targetStaffGmail
            const targetStaffLocation = inputData.targetStaffLocation

            if (targetStaffGmail && targetStaffLocation[0] != 0 && targetStaffLocation[1] != 0) {
                state.staffLocation[targetStaffGmail] = targetStaffLocation
            }
        },

        cacheSetStaffStatus: (state, action: PayloadAction<Record<string, string>>) => {
            state.staffStatus = action.payload
        },
    },
})

export const {
    cacheAddAnotherStaffLocation,
    cacheSetStaffStatus
} = staffLocation.actions;

export default staffLocation.reducer