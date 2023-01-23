import { DynamoDB } from 'aws-sdk'
const dynamo = new DynamoDB.DocumentClient();


export const handler = async (event) => {
    const id = event.pathParameters.id
    const getParams = {
        // Get the table name from the environment variable
        TableName: process.env.TABLE_NAME,
        Item:{
            id: id,
            "annotation_streak": 0,
            "success_streak": 0,
            "failure_streak": 0,
            "point_index": 0,
            "user_nfts": [], // initialise empty list
            // completed_tasks: [], // initialise empty list
            // point_history: [], // initialise empty list
            "active_multipliers": {}, // initialise empty map
            // point_transactions: {"":""} // initialise empty map
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