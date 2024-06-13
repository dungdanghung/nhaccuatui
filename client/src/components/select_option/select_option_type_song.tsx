import "./select_option_country.css"
import types from "../../helper/primary_genre_music.json"

export default function Select_option_type_song({ type }: any) {


    return (
        <div className="select_option-country">
            <div className="select-country">
                {
                    type == 'primary_genre' ?
                        <input list="genredata" id="country" name="primary_genre" ></input> :
                        <input list="genredata" id="country" name="secondary_genre" ></input>
                }
                <div className="icon-dow">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <datalist id="genredata">
                {
                    types.map((item, index) => {
                        return (
                            <option key={index} > {item}</option>
                        )
                    })
                }
            </datalist>
        </div >
    )
}
