import type React from "react";
import { useEffect, useRef } from "react";

import "./download.comp.css"
import type { interface__Download_props } from "../../type/interface_Download";

const DownloadComponent: React.FC<interface__Download_props> = ({ closeDownload }) => {
    const downloadForm = useRef<HTMLDivElement>(null)
    // Effect
    useEffect(() => {
        const handleClickOutsideMenu = (event: MouseEvent | TouchEvent) => {
            if (downloadForm.current && !downloadForm.current.contains(event.target as Node)) {
                closeDownload()
            }
        };

        document.addEventListener('mousedown', handleClickOutsideMenu);
        document.addEventListener('touchstart', handleClickOutsideMenu);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideMenu);
            document.removeEventListener('touchstart', handleClickOutsideMenu);
        };
    }, [])

    const handleDownload = () => {
        window.open("https://drive.google.com/drive/folders/1giNUMOHDK95nTGNQZfvENDUIiNL43EdA?usp=drive_link")
    }

    return (
        <div className="downloadContainer">
            <div className="downloadForm" ref={downloadForm}>
                <h1>Download For Android</h1>
                <div className="downloadForm__versionContainer">
                    <div className="download__file">
                        <span className="download__file--name">
                            <i className="fas fa-file"></i>
                            Repora
                        </span>
                        <span className="download__file--type">apk file</span>
                        <span className="download__file--version">V 0.0.1</span>
                        <span className="download__file--downloadBtn">
                            <button onClick={handleDownload}>
                                <i className="fas fa-download"></i>
                                <p>Download</p>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DownloadComponent