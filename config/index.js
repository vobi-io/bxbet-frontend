const env = process.env.NODE_ENV || 'development'

const envConfig = process.env.CONFIG
    ? require(`./${process.env.CONFIG}`)
    : require(`./${env}`)

module.exports = envConfig
