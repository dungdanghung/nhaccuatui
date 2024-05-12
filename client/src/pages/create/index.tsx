import { Link } from "react-router-dom"

export default function upload() {
    return (
        <div className="wrap_option_create">
            <div className="option_create">
                <Link to={'mv'} className="mv_option">
                    MV
                </Link>
                <Link to={'song'} className="song_option">
                    Song
                </Link>
            </div>
        </div>
    )
}
