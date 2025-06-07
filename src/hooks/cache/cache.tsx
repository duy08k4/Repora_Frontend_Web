// Import libraries
import React, { createContext, useContext, useEffect, useRef, useState } from "react"

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
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore"
import { db } from "../../config/firebaseSDK"
import { useDispatch } from "react-redux"

// Import reducer
import { cacheAddListStaff } from "../../redux/reducers/staff.reducer"
import { cacheAddListReport } from "../../redux/reducers/report.reducer"

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

            disableListener_userInformation_staff,
            disableListener_reportInformation,
        }}>
            {children}
        </CacheContext.Provider>
    )
}