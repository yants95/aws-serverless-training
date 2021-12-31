const HeroRepository = require('./../repositories/hero-repository')
const HeroService = require('./../services/hero-service')

async function createInstance() {
    const heroRepository = new HeroRepository()
    const heroService = new HeroService({
        repository: heroRepository
    })

    return heroService
}

module.exports = { createInstance }