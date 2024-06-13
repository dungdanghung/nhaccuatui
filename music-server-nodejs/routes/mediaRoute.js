const express = require('express')
const router = express.Router()
const { index, create, add_view_in_time, update } = require('../controllers/mediaController')

router.post('/', index)
router.post('/create', create)
router.post('/addView', add_view_in_time)
router.post('/update', update)

module.exports = router