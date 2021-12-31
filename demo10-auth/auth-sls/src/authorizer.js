const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const { buildIAMPolicy } = require('./lib/util')

const myRoles = {
    'heroes:list': 'private'
}

const authorizeUser = (userScopes, methodArn) => {
    return userScopes.find(scope => ~methodArn.indexOf(myRoles[scope]))
}

exports.handler = async event => {
    const token = event.authorizationToken

    try {
        const decodedUser = jwt.verify(token, JWT_KEY)

        const user = decodedUser.user
        const userId = user.username
        const isAllowed = authorizeUser(
            user.scopes,
            event.methodArn
        )

        console.log({ decodedUser })

        const authorizerContext = {
            user: JSON.stringify(user)
        }

        const policyDocument = buildIAMPolicy(
            userId,
            isAllowed ? 'Allow' : 'Deny',
            event.methodArn.
            authorizerContext = { user: JSON.stringify(user) }
        )

        return policyDocument
    } catch (error) {
        console.log(error.stack)

        return {
            statusCode: 401,
            body: 'Unauthorized'
        }
    }
}