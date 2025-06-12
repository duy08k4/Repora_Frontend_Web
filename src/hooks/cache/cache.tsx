// Import libraries
import React, { createContext, useContext, useRef } from "react"

// Import interface
import type {
    interface__authContext,
    interface__authProviderProps,
    interface__report__reducer,
    interface__staff__reducer,
} from "../../type/interface__Auth"

// Import Redux
import type { AppDispatch } from "../../redux/store"

// Import firebase
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../config/firebaseSDK"
import { useDispatch } from "react-redux"

// Import reducer
import { cacheAddListStaff } from "../../redux/reducers/staff.reducer"
import { cacheAddListReport } from "../../redux/reducers/report.reducer"
import { cacheSetStaffStatus } from "../../redux/reducers/staffLocation.reducer"

// Import services

const CacheContext = createContext<interface__authContext | undefined>(undefined)

export const useCache = (): interface__authContext => {
    const context = useContext(CacheContext)

    if (!context) {
        throw new Error("useToast must be used within a CacheProvider");
    }

    return context
}

export const CacheProvider: React.FC<interface__authProviderProps> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>()

    // State
    const subscribe_staffInformation = useRef<(() => void) | undefined>(undefined);
    const subscribe_reportInformation = useRef<(() => void) | undefined>(undefined);
    const subscribe_staffLocation_listStaffOnline = useRef<(() => void) | undefined>(undefined);


    // Redux


    // Custom hook

    // Function: Set data for Redux
    const cacheSetData = (param: any) => {
        dispatch(param)
    }

    // Handler

    // Listener
    const enableListener_userInformation_staff = () => { //Get staff Information

        if (subscribe_staffInformation.current) {
            return
        }

        subscribe_staffInformation.current = onSnapshot(
            collection(db, "staffInformation"),
            (snapshot) => {
                const staffList: interface__staff__reducer[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    staffList.push({ ...data as interface__staff__reducer });
                });

                cacheSetData(cacheAddListStaff(staffList))
            },
            (error) => {
                console.error("Error fetching staff Information:", error);
            }
        );

    }

    const enableListener_staffLocation_listStaffOnline = async () => { // Get staff status
        if (subscribe_staffLocation_listStaffOnline.current) {
            return;
        }

        const staffStatusCollection = collection(db, "staffStatus");

        subscribe_staffLocation_listStaffOnline.current = onSnapshot(staffStatusCollection, (snapshot) => {
            const staffStatusObj: { [key: string]: string } = {};

            snapshot.forEach((doc) => {
                const data = doc.data();
                staffStatusObj[doc.id] = data.status;
            });

            cacheSetData(cacheSetStaffStatus(staffStatusObj));
        });
    };

    const enableListener_reportInformation = () => { //Get report Information

        if (subscribe_reportInformation.current) {
            return
        }

        subscribe_reportInformation.current = onSnapshot(
            collection(db, "report"),
            (snapshot) => {
                const reportList: interface__report__reducer[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    reportList.push({ ...data as interface__report__reducer });
                });

                cacheSetData(cacheAddListReport(reportList))
            },
            (error) => {
                console.error("Error fetching report Information:", error);
            }
        );

    }


    // Off Listener
    const disableListener_userInformation_staff = () => {
        if (subscribe_staffInformation.current) {
            subscribe_staffInformation.current()
            subscribe_staffInformation.current = undefined
        }
    }

    const disableListener_staffStatus = () => {
        if (subscribe_staffLocation_listStaffOnline.current) {
            subscribe_staffLocation_listStaffOnline.current()
            subscribe_staffLocation_listStaffOnline.current = undefined
        }
    }

    const disableListener_reportInformation = () => {
        if (subscribe_reportInformation.current) {
            subscribe_reportInformation.current()
            subscribe_reportInformation.current = undefined
        }
    }

    return (
        <CacheContext.Provider value={{
            cacheSetData,

            enableListener_userInformation_staff,
            enableListener_reportInformation,
            enableListener_staffLocation_listStaffOnline,

            disableListener_userInformation_staff,
            disableListener_reportInformation,
            disableListener_staffStatus,
        }}>
            {children}
        </CacheContext.Provider>
    )
}