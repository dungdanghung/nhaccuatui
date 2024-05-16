import { useRef, useState } from "react"
import { SetAvatar } from "../../api/user";

export default function Change_avatar_modal() {
    const background_image = useRef<HTMLDivElement>(null)
    const select_image = useRef<HTMLImageElement>(null)
    const [value_hander_avatar_x, set_value_hander_avatar_x] = useState(0);
    const [value_hander_avatar_y, set_value_hander_avatar_y] = useState(0);


    function change_scale_image(e: React.ChangeEvent<HTMLInputElement>) {
        const element1 = background_image.current as HTMLDivElement
        const element2 = select_image.current as HTMLImageElement
        element1.style.transform = `scale(${1 + (parseInt(e.target.value) / 100)})`
        element2.style.transform = `scale(${1 + (parseInt(e.target.value) / 100)})`
    }

    function move_image_avatar(e: any) {

        console.log(e.clientY)
        console.log(e.clientX)

    }

    function mouse_up_avatar() {
        window.removeEventListener('mousemove', move_image_avatar)
        window.removeEventListener('mouseup', mouse_up_avatar)
    }

    function click_image_select(e: any) {
        const element = e.target as HTMLDivElement
        set_value_hander_avatar_x(e.clientX)
        set_value_hander_avatar_y(e.clientY)
        if (element.className == "wrap_image_select") {
            window.addEventListener('mousemove', move_image_avatar)
            window.addEventListener('mouseup', mouse_up_avatar)
        }
    }

    function save() {
        const input = document.querySelector('.avatar_file') as HTMLInputElement
        const files = input.files as FileList
        const data = new FormData
        data.append('avatar', files[0])
        SetAvatar(data)
            .then((rs) => {
                if (rs) {
                    window.location.reload()
                }
            })
    }

    return (
        <div className="change_avatar_form">
            <div className="change_avatar_header">
                <div className="change_avatar_header_title">Thay đổi ảnh đại diện</div>
                <div className="wrap_cancel_btn">
                    <i className="fas fa-times"></i>
                </div>
            </div>
            <div className="contail">
                <div className="wrap_contail">
                    <div className="image_background" ref={background_image}>
                        <img id="image_background_display" />
                    </div>
                    <div className="wrap_image_select" onMouseDown={click_image_select}>
                        <div className="image_select" >
                            <img id="image_select_display" ref={select_image} />
                        </div>
                    </div>
                </div>

            </div>
            <div className="scale_control">
                <input id="progress" className="music-control__progress-input" type="range" step="1" min="0" max="100" defaultValue={0} onChange={change_scale_image} />
            </div>
            <div className="action">
                <div className="save" onClick={save}>
                    SAVE
                </div>
            </div>
        </div>
    )
}
