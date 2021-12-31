'use strict';

const { ApolloServer, gql } = require('apollo-server-lambda');
const setupDynamoDBClient = require('./src/core/util/setup-dynamodb')
setupDynamoDBClient()

const HeroFactory = require('./src/core/factories/hero-factory')
const SkillFactory = require('./src/core/factories/skill-factory')

const isLocal = process.env.IS_LOCAL

const schema = require('./src/graphql')

const server = new ApolloServer({
  schema,
  context: async() => ({
    Hero: await HeroFactory.createInstance(),
    Skill: await SkillFactory.createInstance()
  }),
  introspection: isLocal,
  playground: isLocal,
  formatError(error) {
    return error
  },
  formatResponse(response) {
    return response
  }
});

exports.handler = server.createHandler({
  cors: {
    origin: '*'
  }
});

// async function main() {
//   console.log('creating factories...')
//   const skillFactory = await SkillFactory.createInstance()
//   const heroFactory = await HeroFactory.createInstance()

//   console.log('inserting skill item')
//   const skillId = `${new Date().getTime()}`
//   const createdSkill = await skillFactory.create({
//     id: skillId,
//     name: 'mage',
//     value: 50
//   })

//   console.log('createdSkill', createdSkill)

//   console.log('getting skill item')
//   const skillItem = await skillFactory.findOne(skillId)

//   if (skillItem) {
//     console.log('skillItem', skillItem)
//   return JSON.stringify({ skillItem })

//   }

//   if (skillItem) {
//     console.log('skillItem', skillItem)
//   } else {
//     console.log('deu ruim')
//   }

//   const allSkills = await skillFactory.findAll()
//   console.log('allSkills', allSkills)

//   console.log('\n--------\n')

//   console.log('inserting hero item')
//   const heroId = `${new Date().getTime()}`
//   await heroFactory.create({
//     id: heroId,
//     name: 'Batman',
//     skills: [skillId]
//   })

//   const hero = await heroFactory.findOne(heroId)
//   console.log('hero', hero)

//   const allHeroes = await heroFactory.findAll()
//   console.log('allHeroes', allHeroes)

//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       hero: {
//         hero,
//         allHeroes
//       },
//       skill: {
//         skillItem,
//         allSkills
//       }
//     })
//   }
// }

// module.exports.test = main