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

    const user = await dynamoDb.get(params).promise();
    if (!user.Item) {
      return {
        status: 400,
        message: "User not exist!",
      };
    }
    params.ExpressionAttributeNames = {
      "#name": "name",
    };
    params.ExpressionAttributeValues = {
      ":name": data?.name || user.Item.name,
      ":age": data?.age || user.Item.age,
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
