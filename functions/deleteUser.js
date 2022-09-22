"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.deleteUser = async (event) => {
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: event.pathParameters.id,
      },
    };
    await dynamoDb.delete(params).promise();
    return {
      status: 200,
      success: true,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
