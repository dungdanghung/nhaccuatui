import "./select_option_country.css"
import types from "../../helper/primary_genre_music.json"
import { useEffect, useState, useRef } from "react"

export default function Select_option_type_song({ fc_click, value = false }: any) {
    const myElementRef = useRef<HTMLDivElement>(null);
    const myElementRef2 = useRef<HTMLDivElement>(null);
    const [default_value, set_default_value] = useState("");
    const [select_text, setSelect_text] = useState<HTMLDivElement | undefined>()
    useEffect(() => {
        types.forEach(($item) => {
            const a = document.createElement('div')
            a.classList.add("type")
            a.textContent = $item
            a.setAttribute('value', $item)
            a.addEventListener('click', fc_click)
            myElementRef.current?.appendChild(a)
        })
        const a = myElementRef2.current as HTMLDivElement
        setSelect_text(a)
    }, [])

    useEffect(() => {
        if (value) {
            types.forEach((item) => {
                if (item == value) {
                    set_default_value(item)
                }
            })
        }
    }, [value])

    function popupListType() {
        const element = myElementRef.current as HTMLDivElement
        if (element.style.display == 'none') {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    }
    function itemSelect(e: any) {
        const element = myElementRef.current as HTMLDivElement
        if (e.target.className == "type") {
            const a = select_text as HTMLDivElement
            a.textContent = e.target.textContent
        }
        element.style.display = "none";
    }


    return (
        <div className="select_option-type">
            <div className="select-type" onClick={popupListType}>
                <div ref={myElementRef2} className="type-text">
                    {
                        default_value != "" ? default_value : ''
                    }
                </div>
                <div className="icon-dow">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div ref={myElementRef} className="list-type" onClick={itemSelect} style={{ display: "none" }} >

            </div >
        </div >
    )
}
