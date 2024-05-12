import "./create.css"
import { useAppContext } from "../../context"
import { useNavigate } from "react-router-dom"

export default function MV_detail() {
    const navigate = useNavigate()
    const { release_title, mv_create } = useAppContext()


    function save() {
        const listInput = document.querySelectorAll('input[name]')
        const formDate = new FormData
        for (const element of listInput) {
            const a = element as HTMLInputElement
            if (a.name != "vehicle") {
                if (a.className == "lyric_input") {
                    const files = a.files as FileList
                    formDate.append('lyric_file', files[0])
                } else {
                    formDate.append(a.name, a.value)
                }
            }
        }
        mv_create.setFormData(formDate);
        navigate('/create/mv')
    }

    return (
        <div className="wrap">
            <form action="#" className="form">
                <div className="header-form">
                    <h2>MV Details</h2>
                </div>

                <div className="form-item">
                    <div className="form-item-1">
                        <span className="text">
                            Title:
                        </span>
                    </div>
                    <div className="form-item-2">
                        <input className="title-input" name="title" type="text" value={release_title.get} onChange={() => { }} />
                    </div>
                </div>



                <div className="form-item">
                    <div className="form-item-1">
                        <span className="text">
                            Composition Copyright:
                        </span>
                    </div>
                    <div className="form-item-2">
                        <input className="composition_copyright" name="composition_copyright" type="text" />
                    </div>
                </div>

                <div className="form-item">
                    <div className="form-item-1">
                        <span className="text">
                            Originaly Released:
                        </span>
                    </div>
                    <div className="form-item-2">
                        <input className="rriginaly_released" name="originaly_released" type="date" />
                    </div>
                </div>

                <div className="form-item">
                    <div className="save" onClick={save}>
                        <div className="save-btn">Save</div>
                    </div>
                </div>
            </form>
        </div>
    )
}
