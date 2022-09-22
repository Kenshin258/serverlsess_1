"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = async () => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };
  const data = await dynamoDb.scan(params).promise();
  return {
    status: 200,
    item: data,
  };
};
