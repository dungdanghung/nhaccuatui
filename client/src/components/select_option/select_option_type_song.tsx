import "./select_option_country.css"
import types from "../../helper/primary_genre_music.json"

export default function Select_option_type_song({ type }: any) {


    return (
        <div className="select_option-country">
            <div className="select-country">
                {
                    type == 'primary_genre' ?
<<<<<<< HEAD
                        <input list="genredata" id="primary_genre" name="primary_genre" ></input> :
                        <input list="genredata" id="secondary_genre" name="secondary_genre" ></input>
=======
                        <input list="genredata" id="country" name="primary_genre" ></input> :
                        <input list="genredata" id="country" name="secondary_genre" ></input>
>>>>>>> a96d91a35bda4d9be7c428a31f30fbe985a5bd5c
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
