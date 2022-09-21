"use strict";

const uuid = require("uuid");
const AWS = require("aws-sdk");
const { validateInputCreate } = require("./validateInputCreate");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = async (event) => {
  const timestamp = new Date().getTime();
  const validate = validateInputCreate(event);
  if (validate.pass === false) {
    return {
      status: 500,
      message: validate.message,
    };
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      Id: uuid.v1(),
      name: event.name,
      age: event.age,
      createdAt: timestamp,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      status: 200,
      item: params.Item,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
