const resolvers = {
    // GET
    Query: {
        async getHero(root, args, context, info) {
            return 'Hello world'
        }
    },
    // POST
    Mutation: {
        async createHero(root, args, context, info) {
            return 'Hello world'
        }
    }
}

module.exports = resolvers