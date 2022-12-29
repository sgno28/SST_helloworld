export const handler = async (event) => {
    const body = event.requestContext.http

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: `All Data blah blah ${JSON.stringify}`,
    };
  };
  