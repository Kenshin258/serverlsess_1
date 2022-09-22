"use strict";

const uuid = require("uuid");
const AWS = require("aws-sdk");
const { validateInputCreate } = require("./validateInputCreate");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = async (event) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event?.body);

  if (validateInputCreate(data).pass === false) {
    return {
      status: 400,
      message: validateInputCreate(data).message,
    };
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      Id: uuid.v1(),
      name: data.name,
      age: data.age,
      createdAt: timestamp,
    },
  };

  await dynamoDb.put(params).promise();
  return {
    status: 200,
    item: params.Item,
  };
};
