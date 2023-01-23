import { Api, Table } from "@serverless-stack/resources";


export function MyStack({ stack }) {
  // dynamo table
  const table = new Table(stack, "Notes", {
    fields: {
      id: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });
  // API gateway
  const api = new Api(stack, "api", {
    cors: {
      allowMethods: ["POST", "OPTIONS"]
    },
    
    routes: {
      "GET /foo": "functions/lambda.handler",
      "GET /all-data": "functions/alldata.handler",
      "GET /n-data/{n}": "functions/ndata.handler",
      "POST /square/{n}": "functions/square.handler",
      "POST /postData/{id}": "functions/postData.handler",
      "POST /initial/{id}": "functions/initial.handler"
    },
    // passing the dynamo table as a environment variable to the lambda functions
    defaults: {
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
