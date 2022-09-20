"use strict";

const uuid = require("uuid");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = async (event) => {
  const create = new Date().getTime();
  console.log("create", create);
  //const data = JSON.parse(event.body);

  console.log("Event is: ", JSON.stringify(event.body));
  // if (typeof data.name !== "string") {
  //   console.error("Validation Failed");
  //   return {
  //     status: 500,
  //   };
  // }

  // const params = {
  //   TableName: process.env.DYNAMODB_TABLE,
  //   Item: {
  //     id: uuid.v1(),
  //     name: data.name,
  //     createdAt: timestamp,
  //     updatedAt: timestamp,
  //   },
  // };

  // try {
  //   await dynamoDb.put(params).promise();
  //   return {
  //     status: 200,
  //     item: params.Item,
  //   };
  // } catch (error) {
  //   return {
  //     status: 500,
  //     message: error.message,
  //   };
  // }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
