'use strict';

module.exports.public = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      [
          {
              id: 1,
              name: "Flash",
              power: "speed"
          }
      ],
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.private = async (event) => {
    console.log(
        { 'User': JSON.parse(event.requestContext.authorizer.user) }
    )

    return {
      statusCode: 200,
      body: JSON.stringify(
        [
            {
                id: 100,
                name: "Batman",
                power: "rich"
            }
        ],
        null,
        2
      ),
    };
  
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
  };
