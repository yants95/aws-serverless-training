const BaseRepository = require("./base-repository");
const schema = require('./schemas/skill-schema');

class SkillRepository extends BaseRepository {
    constructor() {
        super({ schema })
    }
}

module.exports = SkillRepository