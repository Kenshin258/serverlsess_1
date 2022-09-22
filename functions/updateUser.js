"use strict";
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = async (event) => {
  try {
    if (event.body === null) {
      return {
        status: 400,
        message: "Bad request!",
      };
    }
    const timestamp = new Date().getTime();
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        Id: event.pathParameters.id,
      },
    };
    const data = JSON.parse(event?.body);

    params.ExpressionAttributeNames = {
      "#name": "name",
    };
    params.ExpressionAttributeValues = {
      ":name": data?.name,
      ":age": data?.age,
      ":updatedAt": timestamp,
    };
    params.UpdateExpression =
      "SET #name = :name, age = :age, updatedAt = :updatedAt";
    params.ReturnValues = "UPDATED_NEW";
    const response = await dynamoDb.update(params).promise();
    return {
      status: 200,
      item: response,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
