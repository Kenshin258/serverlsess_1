"use strict";
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = async (event) => {
  const timestamp = new Date().getTime();
  console.log({ event });
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      Id: event.id,
    },
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":name": event.name,
      ":age": event.age,
      ":updatedAt": timestamp,
    },
    UpdateExpression: "SET #name = :name, age = :age, updatedAt = :updatedAt",
    ReturnValues: "ALL_NEW",
  };

  try {
    const data = await dynamoDb.update(params).promise();
    console.log({ data });
    return {
      status: 200,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
