require('dotenv').config()
const { pool } = require('../config/database')
const {
    medias,
    initializeMedia,
    runTime
} = require('./media')
const view_in_time_start = new Date();

async function initializeData() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing data...')
    try {
        const results = await Promise.allSettled([
            initializeMedia(),
        ])
        results.forEach(promise => {
            if (promise.status === 'rejected') throw new Error('Fail to initialize data')
        })
        runTime(view_in_time_start)

        console.log('\x1b[32m%s\x1b[0m', 'Initialized data')
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(`Fail to initialize data: ${error.message}`)
    }
}

module.exports = {
    initializeData,
    medias,
    view_in_time_start
}