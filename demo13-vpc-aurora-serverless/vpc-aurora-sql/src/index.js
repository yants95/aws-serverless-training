const { HeroSchema, sequelize } = require('./database')

const handler = async event => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.log('Error...', error.stack)

        return {
            statusCode: 500,
            body: 'Err'
        }
    }
}

exports.handler = handler