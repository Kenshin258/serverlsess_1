const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const get = async(id, table) => {
    const params = {
        TableName: table,
        Key: {
            id
        }
    };

    return await dynamoDb.get(params).promise();
};

const create = async(data, table) => {
    const params = {
        TableName: table,
        Item: {
            ...data
        }
    };

    await dynamoDb.put(params).promise();
    return data;

};

module.exports = {
    get,
    create
};
