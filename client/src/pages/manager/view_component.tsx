import "./manager.css"
import { baseIMG } from "../../config/api"

export default function View_component({ data }: any) {

    if (data) {

        return (
            <div className="wrap_view_component" style={{ display: "none" }}>
                <div className="form_view">
                    <div className="item_song">
                        <div className="wrap_song">
                            <img src={`${baseIMG}uploads/image/336x188/${data['image']}`}></img>
                        </div>
                        <div className="item_song_title">
                            {data['title']}
                        </div>
                        <div className="item_song_play">
                            <button>Play</button>
                        </div>
                    </div>
                    <div className="item_detail"></div>
                </div>
            </div>
        )
    }
}
