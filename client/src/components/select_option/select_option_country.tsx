import "./select_option_country.css"
import countrys from "../../helper/country_data.json"


export default function Select_div_country() {


    return (
        <div className="select_option-country">
            <div className="select-country">
                <input list="countrydata" id="country" name="language" ></input>
                <div className="icon-dow">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <datalist id="countrydata">
                {
                    countrys.map((item) => {
                        return (
                            <option key={item.key} > {item.value}</option>
                        )
                    })
                }
            </datalist>
        </div >
    )
}
