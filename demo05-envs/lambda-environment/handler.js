'use strict';
const settings = require('./config/settings')
const axios = require('axios')
const cheerio = require('cheerio')
const uuid = require('uuid')
const AWS = require('aws-sdk') 
const dynamoDB = new AWS.DynamoDB.DocumentClient()

class Handler {
  static async main(event) {
    try {
      console.log('at', new Date().toISOString(), JSON.stringify(event, null, 2))
      const { data } = await axios.get(settings.commitMessageUrl)
      const $ = cheerio.load(data)
      const [commitMessage] = await $("#content").text().trim().split('\n')
      console.log('message', commitMessage)

      const params = {
        TableName: settings.DbTableName,
        Item: {
          commitMessage,
          id: uuid.v1(),
          createdAt: new Date().toISOString()
        }
      }

      await dynamoDB.put(params).promise()

      return {
        statusCode: 200
      }
    } catch (error) {
      console.log('error message', error.message)
      return {
        statusCode: 500
      }
    }
  }
}

module.exports = {
  scheduler: Handler.main
}