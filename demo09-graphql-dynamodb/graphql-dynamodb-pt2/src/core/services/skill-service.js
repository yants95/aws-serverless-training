const BaseService = require('./base-service')

class SkillService extends BaseService {
    constructor({ repository }) {
        super({ repository })
    }
}

module.exports = SkillService