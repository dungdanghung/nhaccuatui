const Media = require('../models/media')
const { pool } = require('../config/database')
const { Cache } = require('js-simple-cache')
const axios = require('axios');
const { request } = require('../config/api')
const SimpleCache = require('simple.cache')
const medias = SimpleCache(1000)
async function initializeMedia() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing media data...')
    try {
        const queryString = [
            'SELECT * from songs'
        ].join(' ')
        const [rows] = await pool.query(queryString)
        rows.forEach(row => {
            const ID = row['id']
            const title = row['title']
            const artists = row['artists']
            const language = row['language']
            const primary_genre = row['primary_genre']
            const secondary_genre = row['secondary_genre']
            const composition_copyright = row['composition_copyright']
            const record_laber_name = row['record_laber_name']
            const originaly_released = row['originaly_released']
            const audio = row['audio']
            const image = row['image']
            const thumbnail = row['thumbnail']
            const lyric_file = row['lyric_file']
            const type_id = row['type_id']
            const status = row['status']
            const user_id = row['user_id']
            const heart = row['heart']
            const discription = row['discription']
            const created_at = row['created_at']
            const updated_at = row['updated_at']
            const delete_ad = row['delete_ad']
            // push to cache array
            const media = new Media(ID, title, artists, language, primary_genre, secondary_genre, composition_copyright, record_laber_name,
                originaly_released, audio, image, thumbnail, lyric_file, type_id, status, user_id, heart, discription,
                created_at, updated_at, delete_ad)
            medias.set(ID, media)
        })
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize users data: ${error.message}`)
        throw new Error(`Fail to initialize users data: ${error.message}`)
    }
}



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function repeatedFunction(view_in_time_start) {
    while (true) {
        // const view_in_time_end = new Date()
        // var diffDays = parseInt((view_in_time_end - view_in_time_start) / (1000 * 60));
        // if (diffDays >= 10) {
        //     view_in_time_start = new Date()
        // }

        // const data = []
        // medias.toArray().every((item, index) => {
        //     data.push(
        //         {
        //             ID: item.ID,
        //             start_time: view_in_time_start,
        //             end_time: view_in_time_end,
        //             value: item.view_in_time,
        //         }
        //     )
        //     item.clear_view_in_time()
        //     return true
        // })

        // try {
        //     await request.post('music/update-song-interact', { data: data })
        // } catch (error) {
        //     console.error('Error: ' + error.message);
        // }
        await delay(10 * 60 * 1000);
    }

}
async function runTime(view_in_time_start) {
    repeatedFunction(view_in_time_start);
}

module.exports = {
    initializeMedia,
    medias,
    runTime
}