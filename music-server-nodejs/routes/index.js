const mediaRoute = require('./mediaRoute')
function routes(app) {
    app.use('/api/media', mediaRoute)
}

module.exports = routes