const SkillRepository = require('./../repositories/skill-repository')
const SkillService = require('./../services/skill-service')

async function createInstance() {
    const skillRepository = new SkillRepository()
    const skillService = new SkillService({
        repository: skillRepository
    })

    return skillService
}

module.exports = { createInstance }