const { medias } = require('../cache')
const Media = require('../models/media')



async function index(req, res) {
    console.log(medias.get(parseInt(req.body.id)))
    return res.json(medias.get(parseInt(req.body.id)))
}


async function create(req, res) {
    const data = {
        ID: req.body.song.id,
        title: req.body.song.title,
        artists: req.body.song.artists,
        language: req.body.song.language,
        primary_genre: req.body.song.primary_genre,
        secondary_genre: req.body.song.secondary_genre,
        composition_copyright: req.body.song.composition_copyright,
        record_laber_name: req.body.song.record_laber_name,
        originaly_released: req.body.song.originaly_released,
        audio: req.body.song.audio,
        image: req.body.song.image,
        thumbnail: req.body.song.thumbnail,
        lyric_file: req.body.song.lyric_file ? req.body.song.lyric_file : null,
        status: 'pending',
        user_id: req.body.song.user_id,
        heart: 0,
        discription: req.body.song.discription ? req.body.song.discription : '',
        created_at: req.body.song.created_at,
        updated_at: req.body.song.updated_at,
    }

    const media = new Media(data.ID, data.title, data.artists, data.language, data.primary_genre, data.secondary_genre, data.composition_copyright, data.record_laber_name,
        data.originaly_released, data.audio, data.image, data.thumbnail, data.lyric_file, data.type_id, data.status, data.user_id, data.heart, data.discription,
        data.created_at, data.updated_at, data.delete_ad)
    medias.set(media)

    res.status(200).json({ message: 'success' });
}

async function add_view_in_time(req, res) {
    const mediaID = req.body.songID
    if (!mediaID) res.status(400).json({ message: 'error' })
    const media = medias.get(mediaID)
    if (!media) res.status(500).json({ message: 'not found' })
    media.add_view_in_time()
    medias.set(mediaID, media)
    return res.status(200).json();
}

async function update(req, res) {
    const media_id = parseInt(req.body.song['id'])
    if (!media_id) return res.status(400).json({ 'message': 'error' })
    const media = medias.get(media_id)
    if (!media) return res.status(400).json({ 'message': 'error' })
    const data = {
        ID: req.body.song.id,
        title: req.body.song.title,
        artists: req.body.song.artists,
        language: req.body.song.language,
        primary_genre: req.body.song.primary_genre,
        secondary_genre: req.body.song.secondary_genre,
        composition_copyright: req.body.song.composition_copyright,
        record_laber_name: req.body.song.record_laber_name,
        originaly_released: req.body.song.originaly_released,
        audio: req.body.song.audio,
        image: req.body.song.image,
        thumbnail: req.body.song.thumbnail,
        lyric_file: req.body.song.lyric_file ? req.body.song.lyric_file : null,
        status: req.body.song.status,
        user_id: req.body.song.user_id,
        heart: 0,
        discription: req.body.song.discription ? req.body.song.discription : '',
        created_at: req.body.song.created_at,
        updated_at: req.body.song.updated_at,
    }

    const new_media = new Media(data.ID, data.title, data.artists, data.language, data.primary_genre, data.secondary_genre, data.composition_copyright, data.record_laber_name,
        data.originaly_released, data.audio, data.image, data.thumbnail, data.lyric_file, data.type_id, data.status, data.user_id, data.heart, data.discription,
        data.created_at, data.updated_at, data.delete_ad)

    medias.set(req.body.song.id, new_media)
    return res.status(200).json()
}


module.exports = {
    index,
    create,
    add_view_in_time,
    update
}