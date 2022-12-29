import { Api, Table } from "@serverless-stack/resources";


export function MyStack({ stack }) {

  const table = new Table(stack, "Notes", {
    fields: {
      id: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });
  const api = new Api(stack, "api", {
    cors: {
      allowMethods: ["POST", "OPTIONS"]
    },
    
    routes: {
      "GET /foo": "functions/lambda.handler",
      "GET /all-data": "functions/alldata.handler",
      "GET /n-data/{n}": "functions/ndata.handler",
      "POST /square/{n}": "functions/square.handler",
      "POST /notes/{id}": "functions/notes.handler"
    },
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
