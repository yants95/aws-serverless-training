const resolvers = {
    // GET
    Query: {
        async getSkill(root, args, context, info) {
            return 'Hello world'
        }
    },
    // POST
    Mutation: {
        async createSkill(root, args, context, info) {
            return 'Hello world'
        }
    }
}

module.exports = resolvers