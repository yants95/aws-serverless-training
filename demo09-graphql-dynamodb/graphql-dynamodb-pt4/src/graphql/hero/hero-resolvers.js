const resolvers = {
    Hero: {
        async skills (root, args, context) {
            const skills = root.skills.map(skill => context.skill.findOne(skill))
            const results = await Promise.all(skills)
            const all = results.reduce((prev, next) => prev.concat(next), [])
            return all
        }
    },
    // GET
    Query: {
        async getHero(root, args, context, info) {
            return context.Hero.findAll(args)
        }
    },
    // POST
    Mutation: {
        async createHero(root, args, context, info) {
            const { id } = await context.Hero.findAll(args)
            return id
        }
    }
}

module.exports = resolvers