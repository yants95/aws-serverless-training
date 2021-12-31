const BaseRepository = require("./base-repository");
const schema = require('./schemas/hero-schema');

class HeroRepository extends BaseRepository {
    constructor() {
        super({ schema })
    }
}

module.exports = HeroRepository