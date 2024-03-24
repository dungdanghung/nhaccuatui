import "./playlist.css"

export default function PlayList() {
    return (
        <div className="main-nextsong mobile-tablet-hiden">
            <div className="nextsong__option">
                <div className="nextsong__option-wrapper">

                    <div className="nextsong__option-wrapper-listplay nextsong__option-wrapper--active js__toast js__main-color">Danh sách phát</div>
                    <div className="nextsong__option-wrapper-history js__sub-color js__toast">Nghe gần đây</div>
                </div>
                <div className="nextsong__option-alarm laptop-hiden js__toast">
                    <i className="fas fa-stopwatch js__main-color"></i>
                </div>
                <div className="nextsong__option-more laptop-hiden js__toast">
                    <i className="fas fa-ellipsis-h js__main-color"></i>
                </div>
            </div>
            <div className="nextsong__box">
                <div className="nextsong__fist">

                </div>
                <div className="nextsong__last">
                    <h3 className="nextsong__last-heading js__main-color">Tiếp theo</h3>
                    <ul className="nextsong__last-list">

                    </ul>
                </div>
            </div>
        </div>
    )
}
