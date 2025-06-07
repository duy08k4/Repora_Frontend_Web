// Import libraries
import type React from "react"
import { useEffect, useRef, useState } from "react"

// Import interface
import type { interface__ReportForm__props } from "../../type/interface_ReportForm"

// Import css
import "./reportForm.css"

const ReportForm: React.FC<interface__ReportForm__props> = ({ closeReportForm, report }) => {
    // State
    const [isSendTaskForm, setIsSendTaskForm] = useState<boolean>(false)

    // Ref
    const reportForm = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutsideMenu = (event: MouseEvent | TouchEvent) => {
            if (reportForm.current && !reportForm.current.contains(event.target as Node)) {
                if (!isSendTaskForm) {
                    closeReportForm()
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutsideMenu);
        document.addEventListener('touchstart', handleClickOutsideMenu);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideMenu);
            document.removeEventListener('touchstart', handleClickOutsideMenu);
        };
    }, [isSendTaskForm, closeReportForm])

    return (
        <div className="reportContainer">
            <div className="reportForm" ref={reportForm}>
                <div className="reportForm__infoContainer reportForm__infoContainer--incidentLevel">
                    <div className={`reportForm__infoContainer__incidentTag ${report.level}`}>
                        {report.level == "normal" && <i className="fas fa-meh"></i>}
                        {report.level == "severe" && <i className="fas fa-frown"></i>}
                        {report.level == "critical" && <i className="fas fa-dizzy"></i>}
                        <p>{report.level}</p>
                    </div>
                </div>

                <div className="reportForm__infoContainer reportForm__infoContainer--baseInfo">
                    <div className="reportForm__infoContainer--baseInfo--avatarBox">
                        <img src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}/report/${report.imgCode}`} alt="" />
                    </div>

                    <h1 className="reportForm__infoContainer--baseInfo--name">{report.name}</h1>
                    <p className="reportForm__infoContainer--baseInfo--id">{report.reportID}</p>
                </div>

                <div className="reportForm__infoContainer">
                    <div className="reportForm__infoContainer__infoBox">
                        <p className="reportForm__infoContainer__infoBox--content">Incident Type</p>
                        <input type="text" disabled value={report.type} />
                    </div>
                </div>

                <div className="reportForm__infoContainer">
                    <div className="reportForm__infoContainer__infoBox">
                        <p className="reportForm__infoContainer__infoBox--content">Reporter Name</p>
                        <input type="text" disabled value={report.reporter.name} />
                    </div>
                </div>

                <div className="reportForm__infoContainer">
                    <div className="reportForm__infoContainer__infoBox">
                        <p className="reportForm__infoContainer__infoBox--content">Reporter Gmail</p>
                        <input type="text" disabled value={report.reporter.gmail} />
                    </div>
                </div>

                <div className="reportForm__infoContainer">
                    <div className="reportForm__infoContainer__infoBox">
                        <p className="reportForm__infoContainer__infoBox--content">Reporter Time</p>
                        <input type="text" disabled value={report.time} />
                    </div>
                </div>

                <div className="reportForm__currentStaffList">
                    <div className="reportForm__currentStaffList__titleBox">
                        <h3 className="reportForm__currentStaffList--title">In Action</h3>

                        <button className="reportForm__currentStaffList__taskAssignment--btn" onClick={() => { setIsSendTaskForm(!isSendTaskForm) }}>
                            <i className="fas fa-user-plus"></i>
                            Add staff
                        </button>
                    </div>

                    <div className="reportForm__currentStaffList--list">
                        <div className="reportForm__currentStaffList__staffTag">
                            <div className="reportForm__currentStaffList__staffTag--imgBox">
                                <img src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752rhD/anh-mo-ta.png" alt="" />
                            </div>

                            <p className="reportForm__currentStaffList__staffTag--staffName">pla pla</p>
                        </div>

                        <div className="reportForm__currentStaffList__staffTag">
                            <div className="reportForm__currentStaffList__staffTag--imgBox">
                                <img src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752rhD/anh-mo-ta.png" alt="" />
                            </div>

                            <p className="reportForm__currentStaffList__staffTag--staffName">pla pla</p>
                        </div>

                        <div className="reportForm__currentStaffList__staffTag">
                            <div className="reportForm__currentStaffList__staffTag--imgBox">
                                <img src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752rhD/anh-mo-ta.png" alt="" />
                            </div>

                            <p className="reportForm__currentStaffList__staffTag--staffName">pla pla</p>
                        </div>

                        <div className="reportForm__currentStaffList__staffTag">
                            <div className="reportForm__currentStaffList__staffTag--imgBox">
                                <img src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752rhD/anh-mo-ta.png" alt="" />
                            </div>

                            <p className="reportForm__currentStaffList__staffTag--staffName">pla pla</p>
                        </div>
                    </div>
                </div>
            </div>

            {!isSendTaskForm ? "" : (
                <div className="sendTaskForm">
                    <h2 className="sendTaskFormAssignment">Task assignment</h2>

                    <div className="sendTaskFormList">

                        <div className="manageStaffForm__staffTag">
                            {/* {!isRemoveStaff ? "" : ( */}
                            <div className="manageStaffForm__staffTag__checkBox">
                                <input type="checkbox" />
                            </div>
                            {/* )} */}

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--avartar">
                                <div className="manageStaffForm__avartarBox">
                                    <img src="https://segoo.vn/wp-content/uploads/2024/10/anh-boy-pho-0904i1P.jpg" alt="" />
                                </div>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--name">
                                <p>Nguyen Anh Tuan</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--status">
                                <p className="busy">Free</p>
                            </div>
                        </div>

                        <div className="manageStaffForm__staffTag">
                            {/* {!isRemoveStaff ? "" : ( */}
                            <div className="manageStaffForm__staffTag__checkBox">
                                <input type="checkbox" />
                            </div>
                            {/* )} */}

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--avartar">
                                <div className="manageStaffForm__avartarBox">
                                    <img src="https://segoo.vn/wp-content/uploads/2024/10/anh-boy-pho-0904i1P.jpg" alt="" />
                                </div>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--name">
                                <p>Nguyen Anh Tuan</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--status">
                                <p className="busy">Free</p>
                            </div>
                        </div>

                        <div className="manageStaffForm__staffTag">
                            {/* {!isRemoveStaff ? "" : ( */}
                            <div className="manageStaffForm__staffTag__checkBox">
                                <input type="checkbox" />
                            </div>
                            {/* )} */}

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--avartar">
                                <div className="manageStaffForm__avartarBox">
                                    <img src="https://segoo.vn/wp-content/uploads/2024/10/anh-boy-pho-0904i1P.jpg" alt="" />
                                </div>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--name">
                                <p>Nguyen Anh Tuan</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--status">
                                <p className="busy">Free</p>
                            </div>
                        </div>

                        <div className="manageStaffForm__staffTag">
                            {/* {!isRemoveStaff ? "" : ( */}
                            <div className="manageStaffForm__staffTag__checkBox">
                                <input type="checkbox" />
                            </div>
                            {/* )} */}

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--avartar">
                                <div className="manageStaffForm__avartarBox">
                                    <img src="https://segoo.vn/wp-content/uploads/2024/10/anh-boy-pho-0904i1P.jpg" alt="" />
                                </div>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--name">
                                <p>Nguyen Anh Tuan</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--status">
                                <p className="busy">Free</p>
                            </div>
                        </div>

                        <div className="manageStaffForm__staffTag">
                            {/* {!isRemoveStaff ? "" : ( */}
                            <div className="manageStaffForm__staffTag__checkBox">
                                <input type="checkbox" />
                            </div>
                            {/* )} */}

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--avartar">
                                <div className="manageStaffForm__avartarBox">
                                    <img src="https://segoo.vn/wp-content/uploads/2024/10/anh-boy-pho-0904i1P.jpg" alt="" />
                                </div>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--name">
                                <p>Nguyen Anh Tuan</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--status">
                                <p className="busy">Free</p>
                            </div>
                        </div>

                        <div className="manageStaffForm__staffTag">
                            {/* {!isRemoveStaff ? "" : ( */}
                            <div className="manageStaffForm__staffTag__checkBox">
                                <input type="checkbox" />
                            </div>
                            {/* )} */}

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--avartar">
                                <div className="manageStaffForm__avartarBox">
                                    <img src="https://segoo.vn/wp-content/uploads/2024/10/anh-boy-pho-0904i1P.jpg" alt="" />
                                </div>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--name">
                                <p>Nguyen Anh Tuan</p>
                            </div>

                            <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--status">
                                <p className="busy">Free</p>
                            </div>
                        </div>

                    </div>

                    <div className="sendTaskFormBtnContainer">
                        <button className="sendTaskFormBtnContainer--apply">Send task to staff selected</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReportForm