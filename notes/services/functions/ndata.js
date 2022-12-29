export const handler = async (event) => {
    const n = event.pathParameters.n
    const answer =  squareN(n)

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: `The square of ${n} is ${answer}`,
    };
  };
  


  const squareN = (n) => {
    return n * n

  }