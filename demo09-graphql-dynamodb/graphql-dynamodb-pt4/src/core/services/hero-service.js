const BaseService = require('./base-service')

class HeroService extends BaseService {
    constructor({ repository }) {
        super({ repository })
    }
}

module.exports = HeroService