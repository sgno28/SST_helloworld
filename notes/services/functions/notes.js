import { DynamoDB } from 'aws-sdk'
const dynamo = new DynamoDB.DocumentClient();




export const handler = async (event) => {
    const id = event.pathParameters.id
    console.log(event)
    const data = JSON.parse(event.body)


    const getParams = {
        // Get the table name from the environment variable
        TableName: process.env.TABLE_NAME,

        Item:{
            title: data.title,
            date: data.date,
            id: id,
            amount: data.amount
        }
      };

    const result = await dynamo.put(getParams).promise()

    return {
      statusCode: 200,
      body: `The post was successful ${result.$response.data}`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  };
  


