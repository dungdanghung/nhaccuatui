import "./layout_manager.css"
import { Outlet } from "react-router-dom"
import Header from "../../components/header"
import Sidebar from "../../components/sidebar"
import MusicController from "../../components/musicController"

export default function LayoutManager() {
    return (
        <>
            <div className='manager-layout'>
                <div className='wrap_layout'>
                    <Sidebar type_sidebar="manager" />
                    <div className='manager-content'>
                        <Header type_header="manager" />
                        <div className="wrap_content">
                            <div className="content_manager">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <MusicController />
                </div>
            </div>
        </>


    )
}
