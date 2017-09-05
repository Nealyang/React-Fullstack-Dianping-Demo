module.exports = {
    host: process.env.HOST || 'localhost',
    port:process.env.PORT || (process.env.NODE_ENV === 'production'?8080:3000),
    apiHost:process.env.APIHOST || 'localhost',
    apiPort:process.env.APIPORT || '3030',
    hotReloadHost:'localhost',
    hotReloadPort:'8000'
};