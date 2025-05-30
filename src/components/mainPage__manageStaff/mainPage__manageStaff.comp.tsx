// Import libraries
import type React from "react"
import { useEffect, useRef, useState } from "react"

// import component
import StaffRegisterForm from "../staffRegisterForm/staffRegisterForm.comp"

// Import interface
import type { interface_MainPage_Props } from "../../type/interface_MainPage"

// Import css
import "./mainPage__manageStaff.comp.css"

const ManageStaff: React.FC<interface_MainPage_Props> = ({ closeManageStaff }) => {
    // State
    const [isAddNewStaff, setIsAddNewStaff] = useState<boolean>(false)
    const [isRemoveStaff, setIsRemoveStaff] = useState<boolean>(false)
    const [isConfirmForm, setIsConfirmForm] = useState<boolean>(false)

    const manageStaffForm = useRef<HTMLDivElement>(null)
    const confirmForm = useRef<HTMLDivElement>(null)

    // Data
    const [listRemoveStaff, setListRemoveStaff] = useState<string[]>([])

    // Effect
    useEffect(() => {
        const handleClickOutsideMenu = (event: MouseEvent | TouchEvent) => {
            if (manageStaffForm.current && !manageStaffForm.current.contains(event.target as Node)) {
                if (!isConfirmForm) {
                    closeManageStaff()
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutsideMenu);
        document.addEventListener('touchstart', handleClickOutsideMenu);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideMenu);
            document.removeEventListener('touchstart', handleClickOutsideMenu);
        };
    }, [isConfirmForm, closeManageStaff])

    // Handler

    return (
        <div className="manageStaffContainer">
            <div className="manageStaffContainer--container" ref={manageStaffForm}>
                <div className="manageStaffForm">
                    <div className="manageStaffForm__header">
                        <h2 className="manageStaffForm__header--content">Manage staff</h2>

                        <div className="manageStaffForm__btnBox">
                            {isRemoveStaff && !isAddNewStaff ? "" : (
                                <button className={`manageStaffForm__btnBox--add ${isAddNewStaff ? "cancel" : ""}`} onClick={() => { setIsAddNewStaff(!isAddNewStaff) }}>
                                    {isAddNewStaff ? (
                                        <>
                                            Close
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-plus"></i>
                                            Add
                                        </>
                                    )}
                                </button>
                            )}

                            {isAddNewStaff && !isRemoveStaff ? "" : (
                                <button className={`manageStaffForm__btnBox--remove ${isRemoveStaff ? "cancel" : ""}`} onClick={() => { setIsRemoveStaff(!isRemoveStaff) }}>
                                    {isRemoveStaff ? (
                                        <>
                                            Close
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-minus"></i>
                                            Remove
                                        </>
                                    )}
                                </button>
                            )}

                            {!isRemoveStaff ? "" : (
                                <button className="manageStaffForm__btnBox--applyRemove" onClick={() => { setIsConfirmForm(!isConfirmForm) }}>Remove selected staff</button>
                            )}

                        </div>
                    </div>

                    <div className="manageStaffForm__staffList">

                        <div className="manageStaffForm__staffTag">
                            {!isRemoveStaff ? "" : (
                                <div className="manageStaffForm__staffTag__checkBox">
                                    <input type="checkbox"/>
                                </div>
                            )}

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--avartar">
                                <div className="manageStaffForm__avartarBox">
                                    <img src="https://segoo.vn/wp-content/uploads/2024/10/anh-boy-pho-0904i1P.jpg" alt="" />
                                </div>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--name">
                                <p>Nguyen Anh Tuan</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--jobDate">
                                <p>12:04 _ 12THG 06, 2025</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--status">
                                <p className="busy">Free</p>
                            </div>
                        </div>

                        <div className="manageStaffForm__staffTag">
                            {!isRemoveStaff ? "" : (
                                <div className="manageStaffForm__staffTag__checkBox">
                                    <input type="checkbox"/>
                                </div>
                            )}

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--avartar">
                                <div className="manageStaffForm__avartarBox">
                                    <img src="https://segoo.vn/wp-content/uploads/2024/10/anh-boy-pho-0904i1P.jpg" alt="" />
                                </div>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--name">
                                <p>Nguyen Anh Tuan</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--jobDate">
                                <p>12:04 _ 12THG 06, 2025</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--status">
                                <p className="busy">Free</p>
                            </div>
                        </div>

                        <div className="manageStaffForm__staffTag">
                            {!isRemoveStaff ? "" : (
                                <div className="manageStaffForm__staffTag__checkBox">
                                    <input type="checkbox"/>
                                </div>
                            )}

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--avartar">
                                <div className="manageStaffForm__avartarBox">
                                    <img src="https://segoo.vn/wp-content/uploads/2024/10/anh-boy-pho-0904i1P.jpg" alt="" />
                                </div>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--name">
                                <p>Nguyen Anh Tuan</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--jobDate">
                                <p>12:04 _ 12THG 06, 2025</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--status">
                                <p className="busy">Free</p>
                            </div>
                        </div>

                        <div className="manageStaffForm__staffTag">
                            {!isRemoveStaff ? "" : (
                                <div className="manageStaffForm__staffTag__checkBox">
                                    <input type="checkbox"/>
                                </div>
                            )}

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--avartar">
                                <div className="manageStaffForm__avartarBox">
                                    <img src="https://segoo.vn/wp-content/uploads/2024/10/anh-boy-pho-0904i1P.jpg" alt="" />
                                </div>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--name">
                                <p>Nguyen Anh Tuan</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--jobDate">
                                <p>12:04 _ 12THG 06, 2025</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--status">
                                <p className="busy">Free</p>
                            </div>
                        </div>

                        <div className="manageStaffForm__staffTag">
                            {!isRemoveStaff ? "" : (
                                <div className="manageStaffForm__staffTag__checkBox">
                                    <input type="checkbox"/>
                                </div>
                            )}

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--avartar">
                                <div className="manageStaffForm__avartarBox">
                                    <img src="https://segoo.vn/wp-content/uploads/2024/10/anh-boy-pho-0904i1P.jpg" alt="" />
                                </div>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--name">
                                <p>Nguyen Anh Tuan</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--jobDate">
                                <p>12:04 _ 12THG 06, 2025</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--status">
                                <p className="busy">Free</p>
                            </div>
                        </div>

                        <div className="manageStaffForm__staffTag">
                            {!isRemoveStaff ? "" : (
                                <div className="manageStaffForm__staffTag__checkBox">
                                    <input type="checkbox"/>
                                </div>
                            )}

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--avartar">
                                <div className="manageStaffForm__avartarBox">
                                    <img src="https://segoo.vn/wp-content/uploads/2024/10/anh-boy-pho-0904i1P.jpg" alt="" />
                                </div>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--name">
                                <p>Nguyen Anh Tuan</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--jobDate">
                                <p>12:04 _ 12THG 06, 2025</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--status">
                                <p className="busy">Free</p>
                            </div>
                        </div>

                    </div>

                    <div className="manageStaffForm__amountStaffContainer">
                        <p><b>Number of staff:</b> 10</p>
                    </div>
                </div>

                {!isAddNewStaff ? "" : (
                    <StaffRegisterForm />
                )}
            </div>

            {!isConfirmForm ? "" : (
                <div className="confirmContainer">
                    <div className="confirmForm">
                        <h2>Are you sure?</h2>
                        <input type="password" placeholder="Admin password" />

                        <div className="confirmForm__btnBox">
                            <button className="confirmForm__btnBox--close" onClick={() => { setIsConfirmForm(!isConfirmForm) }}>Cancel</button>
                            <button className="confirmForm__btnBox--confirm" onClick={() => {alert("Xóa các nhân viên đã chọn")}}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ManageStaff