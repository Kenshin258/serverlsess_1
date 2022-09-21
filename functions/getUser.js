"use strict";

const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = async (event) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      Id: event.pathParameters.id,
    },
  };

  try {
    const data = await dynamoDb.get(params).promise();
    return {
      status: 200,
      item: data,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
