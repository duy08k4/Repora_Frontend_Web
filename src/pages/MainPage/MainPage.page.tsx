// Import libraries
import type React from "react"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import leaflet
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';

// Import component
import ManageStaff from "../../components/mainPage__manageStaff/mainPage__manageStaff.comp";
import ReportForm from "../../components/reportForm/reportForm";

// Custom hooks
import { useToast } from "../../hooks/toastMessage/toast";
import { useSpinner } from "../../hooks/spinner/spinner";
import { useCache } from "../../hooks/cache/cache";

// Import css
import "./MainPage.page.css"

// Import img
import logoApp from "../../assets/reporaLogo.png"

// Import redux
import type { RootState } from "../../redux/store";

// Import interface
import type { interface__report__reducer } from "../../type/interface__Auth";

// Import redux
import { useSelector } from "react-redux";
import { cacheSetGmail } from "../../redux/reducers/admin.reducer";

// Import service
import { autoLoginHandler } from "../../handlers/loginAccount.handler";

const MainPage: React.FC = () => {
    // State
    const [isManageStaff, setIsManageStaff] = useState<boolean>(false)
    const [isReportForm, setIsReportForm] = useState<boolean>(false)
    const [filter, setFilter] = useState<string | null>(null)

    const [reportForShowcase, setReportForShowcase] = useState<interface__report__reducer | null>(null)

    const navigate = useNavigate()

    // Report Data
    const [filterReport, setFilterReport] = useState<Record<string, interface__report__reducer[]>>({}) // Danh sách tất cả các report
    const [reportPosition, setReportPosition] = useState<Record<string, [number, number] | {}>>({}) // Danh sách vị trí của các report

    // Hook
    const { addToast } = useToast()
    const { openSpinner } = useSpinner()
    const { cacheSetData, enableListener_userInformation_staff, enableListener_reportInformation } = useCache()

    // State map
    const mapRef = useRef<any>(null);
    const [position, setPosition] = useState<[number, number]>([10.8231, 106.6297]);

    // Redux
    const listReport = useSelector((state: RootState) => state.reportImformation.listReport)
    const gmail = useSelector((state: RootState) => state.adminInformation.gmail)

    // Effect
    useEffect(() => {
        enableListener_userInformation_staff()
        enableListener_reportInformation()
    }, [])

    useEffect(() => { // Auto login
        (async () => {
            const res_autoLoginHandler = await autoLoginHandler()

            if (res_autoLoginHandler.status == 200) {
                cacheSetData(cacheSetGmail({ inputGmail: res_autoLoginHandler.data.data.gmail }))
            } else navigate("/")
        })()
    }, [])

    // Phân loại report
    useEffect(() => {
        const createFilterReport: Record<string, interface__report__reducer[]> = {}
        const createReportPosition: Record<string, [number, number]> = {}

        listReport.forEach(report => {
            (createFilterReport[report.level] ||= []).push(report)
            createReportPosition[report.reportID] = [report.position[0], report.position[1]]
        })

        setFilterReport(createFilterReport)
        setReportPosition(createReportPosition)
    }, [listReport.length])

    // Handler
    const openManageStaff = () => {
        setIsManageStaff(true)
    }

    const closeManageStaff = () => {
        setIsManageStaff(false)
    }

    const handleShowReport = (report: interface__report__reducer) => {
        setReportForShowcase(report)
        setIsReportForm(true)
    }

    const handleCloseReportForm = () => {
        setIsReportForm(false)
    }

    const testToast = () => {
        addToast({
            content: "pla pla",
            typeToast: "s",
            duration: 5
        })

        console.log(filterReport)
        console.log(reportPosition)

        // openSpinner()
    }

    return (
        <div className="mainPage">
            <div className="mainPageTop">
                <div className="mainPageTop--left mainPage__staffContainer">
                    <div className="mainPage__staffContainer__header">
                        <h2>Active Staff (6)</h2>
                    </div>

                    <div className="mainPage__staffContainer__listStaff">

                        <div className="staffTag">
                            <div className="staffTag__avartarBox">
                                <img src="data:image/png;base64,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" alt="" />
                            </div>

                            <div className="staffTag__nameBox">
                                <p>Nhan vien 1</p>
                            </div>

                            <div className="staffTag__makerBox">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                        </div>

                        <div className="staffTag">
                            <div className="staffTag__avartarBox">
                                <img src="data:image/png;base64,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" alt="" />
                            </div>

                            <div className="staffTag__nameBox">
                                <p>Nhan vien 1</p>
                            </div>

                            <div className="staffTag__makerBox">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                        </div>

                        <div className="staffTag">
                            <div className="staffTag__avartarBox">
                                <img src="data:image/png;base64,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" alt="" />
                            </div>

                            <div className="staffTag__nameBox">
                                <p>Nhan vien 1</p>
                            </div>

                            <div className="staffTag__makerBox">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                        </div>

                        <div className="staffTag">
                            <div className="staffTag__avartarBox">
                                <img src="data:image/png;base64,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" alt="" />
                            </div>

                            <div className="staffTag__nameBox">
                                <p>Nhan vien 1</p>
                            </div>

                            <div className="staffTag__makerBox">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mainPageTop--right mainPage__mapContainer">
                    <div className="adminTag">
                        <span className="adminGmail">
                            <i className="fas fa-user-shield"></i>
                            {gmail}
                        </span>
                        <button className="manageStaff" onClick={openManageStaff}><i className="fas fa-user-cog"></i></button>
                        <button className="adminLogout" onClick={testToast}><i className="fas fa-sign-out-alt"></i></button>
                    </div>

                    <MapContainer
                        center={[10.762622, 106.660172]}
                        zoom={16}
                        style={{ height: "100%", width: "100%" }}
                        ref={mapRef}
                        zoomControl={false}
                        whenReady={() => {
                            setTimeout(() => {
                                if (mapRef.current) {
                                    mapRef.current.invalidateSize();
                                }
                            }, 100);
                        }}
                    >
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {/* <Marker position={position} icon={customIcon} ref={markerRef}></Marker> */}

                    </MapContainer>
                </div>
            </div>

            <div className="mainPageBottom mainPage__reportList">
                <div className="mainPageBottom--left optionBox">
                    <span className={`filterIcon ${filter}`} onClick={() => { setFilter(null) }} >
                        <i className="fas fa-filter"></i>
                    </span>

                    <div className="filterChoice">
                        <span className={`filter--normal ${filter}`} onClick={() => { setFilter("normal") }} ><i className="fas fa-meh"></i></span>
                        <span className={`filter--severe ${filter}`} onClick={() => { setFilter("severe") }} ><i className="fas fa-frown"></i></span>
                        <span className={`filter--critical ${filter}`} onClick={() => { setFilter("critical") }} ><i className="fas fa-dizzy"></i></span>
                        <span className="logoApp">
                            <img src={logoApp} alt="" />
                        </span>
                    </div>
                </div>

                <div className="mainPageBottom--right reportList">
                    <div className="reportCount">
                        <p><b>Refresh time:</b> 12:04 _ 12 THG 06 , 2025</p>
                        <p><b>Number of reports:</b> 6</p>
                    </div>

                    <div className="reportList__title">
                        <span><p>Index</p></span>
                        <span><p>Report Name</p></span>
                        <span><p>Type</p></span>
                        <span><p>Level</p></span>
                        <span><p>Reporter</p></span>
                        <span><p>Time</p></span>
                        <span><p>Position</p></span>
                        <span><p>Img</p></span>
                        <span><p>State</p></span>
                    </div>

                    <div className="reportList__report">
                        {filter ? "" : listReport.map((report, index) => {
                            return (
                                <div key={index} className="reportRow" onClick={() => { handleShowReport(report) }} >
                                    <span><p>{index + 1}</p></span>
                                    <span><p>{report.name}</p></span>
                                    <span><p>{report.type}</p></span>
                                    <span><p>{report.level}</p></span>
                                    <span><p>{report.reporter.name}</p></span>
                                    <span><p>{report.time}</p></span>
                                    <span><p><i className="fas fa-thumbtack"></i></p></span>
                                    <span><p><i className="fas fa-image"></i></p></span>
                                    <span><p><i className="fas fa-check"></i></p></span>
                                </div>
                            )
                        })}

                        {filter && filterReport[filter] ? filterReport[filter].map((report: interface__report__reducer, index: number) => {
                            return (
                                <div key={index} className="reportRow" onClick={() => { handleShowReport(report) }} >
                                    <span><p>{index + 1}</p></span>
                                    <span><p>{report.name}</p></span>
                                    <span><p>{report.type}</p></span>
                                    <span><p>{report.level}</p></span>
                                    <span><p>{report.reporter.name}</p></span>
                                    <span><p>{report.time}</p></span>
                                    <span><p><i className="fas fa-thumbtack"></i></p></span>
                                    <span><p><i className="fas fa-image"></i></p></span>
                                    <span><p><i className="fas fa-check"></i></p></span>
                                </div>
                            )
                        })
                            : ""}
                    </div>
                </div>
            </div>

            {!isManageStaff ? "" : (
                <ManageStaff closeManageStaff={closeManageStaff} />
            )}

            {!isReportForm ? "" : (
                <ReportForm closeReportForm={handleCloseReportForm} report={reportForShowcase!} />
            )}

        </div>
    )
}

export default MainPage