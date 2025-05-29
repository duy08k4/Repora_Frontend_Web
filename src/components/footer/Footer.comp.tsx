import type React from "react"

import "./Footer.comp.css"

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <div className="footer__element baseInfo">
                <h2>Repora</h2>
                <ul>
                    <li><strong>SUBJECT: </strong>Open Source GIS Programming</li>
                    <li><strong>GROUP: </strong>3</li>
                </ul>
            </div>

            <div className="footer__element footerDetail">
                <h3>UI - UX</h3>
                <ul>
                    <li>Tran Ba Tuong Duy</li>
                    <li>Do Phu Trong</li>
                    <li>Nguyen Thi My Uyen</li>
                    <li>Nguyen Anh Tuan</li>
                </ul>
            </div>

            <div className="footer__element footerDetail">
                <h3>Developer</h3>
                <ul>
                    <li>Tran Ba Tuong Duy</li>
                    <li>Do Phu Trong</li>
                    <li>Nguyen Thi My Uyen</li>
                    <li>Nguyen Anh Tuan</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer