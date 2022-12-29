import { DynamoDB } from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';
//take n from the request 
// compute square 
// store n and sqaure in dynamo table 
// return ok and return values 

const dynamo = new DynamoDB.DocumentClient();




export const handler = async (event) => {
    const n = event.pathParameters.n
    const answer =  squareN(n)
    const id = uuidv4();

    const getParams = {
        // Get the table name from the environment variable
        TableName: process.env.TABLE_NAME,

        Item:{
            n: n,
            square: answer,
            id: id
        }
      };

    const result = await dynamo.put(getParams).promise()

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: `The post was successful ${n} is ${answer} and ${result.$response.data}`,
    };
  };
  


  const squareN = (n) => {
    return n * n

  }