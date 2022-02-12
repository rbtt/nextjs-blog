const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants')

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                mongodb_username: 'rbt',
                mongodb_password: 'damiqdeshpishkata',
                mongodb_database: 'Blog-dev'
            }
        }
    }

    return {
        env: { // some other credentials
            mongodb_username: 'rbt',
            mongodb_password: 'damiqdeshpishkata',
            mongodb_database: 'Blog-production'
        }
    }

} 