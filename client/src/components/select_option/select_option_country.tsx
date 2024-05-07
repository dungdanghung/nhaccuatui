import "./select_option_country.css"
import countrys from "../../helper/country_data.json"
import { useEffect, useRef, useState } from "react"


export default function Select_div_country({ fc_click, value = false }: any) {
    const myElementRef = useRef<HTMLDivElement>(null);
    const [select_text, setSelect_text] = useState<HTMLDivElement | undefined>()
    const myElementRef2 = useRef<HTMLDivElement>(null);
    const [value_defau, setvaluedefau] = useState("")
    useEffect(() => {
        countrys.forEach(($item) => {
            const a = document.createElement('div')
            a.setAttribute('value', $item.key)
            a.classList.add("country")
            a.addEventListener('click', fc_click)
            a.textContent = $item.value
            myElementRef.current?.appendChild(a)
        })
        const a = myElementRef2.current as HTMLDivElement
        setSelect_text(a)
    }, [])


    function hiddenPopupListCountry(e: any) {
        const element = myElementRef.current as HTMLDivElement
        if (element.style.display == 'none') {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    }

    function popupListCountry(e: any) {
        const element = myElementRef.current as HTMLDivElement
        if (e.target.className == "country") {
            const a = select_text as HTMLDivElement
            a.textContent = e.target.textContent
        }
        element.style.display = "none";
    }

    useEffect(() => {
        if (value) {
            countrys.forEach(element => {
                if (element.key == value) {
                    setvaluedefau(element.value)
                }
            });
        }
    }, [value])

    return (
        <div className="select_option-country">
            <div className="select-country" onClick={hiddenPopupListCountry}>
                <div ref={myElementRef2} className="country-text">
                    {
                        value_defau != "" ? value_defau : ''
                    }
                </div>
                <div className="icon-dow">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div ref={myElementRef} className="list-country" onClick={popupListCountry} style={{ display: "none" }} ></div >
        </div >
    )
}
