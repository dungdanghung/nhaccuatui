class Media {

    constructor(ID, title, artists, language, primary_genre, secondary_genre, composition_copyright, record_laber_name,
        originaly_released, audio, image, thumbnail, lyric_file, type_id, status, user_id, heart, discription,
        created_at, updated_at, delete_ad) {
        this.ID = ID
        this.title = title
        this.artists = artists
        this.view_in_time = 0
        this.language = language
        this.primary_genre = primary_genre
        this.secondary_genre = secondary_genre
        this.composition_copyright = composition_copyright
        this.record_laber_name = record_laber_name
        this.originaly_released = originaly_released
        this.audio = audio
        this.image = image
        this.thumbnail = thumbnail
        this.lyric_file = lyric_file
        this.type_id = type_id
        this.status = status
        this.user_id = user_id
        this.heart = heart
        this.discription = discription
        this.created_at = created_at
        this.updated_at = updated_at
        this.delete_ad = delete_ad
    }

    clear_view_in_time() {
        this.view_in_time = 0
    }
    add_view_in_time() {
        this.view_in_time = this.view_in_time + 1
    }
}

module.exports = Media