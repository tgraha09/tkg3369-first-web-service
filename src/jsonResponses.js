const randomNumberJSON = (m = 1) => {
  let max = m;
  max = Number(max);
  max = !max ? 1 : max;
  max = max < 1 ? 1 : max;
  const number = Math.random() * max;
  const responseObj = {
    timestamp: new Date(),
    number,
  };
  return JSON.stringify(responseObj);
};

const getRandomNumberResponse = (request, response, params) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(randomNumberJSON(params.max));
  response.end();
};

module.exports = {
  getRandomNumberResponse,
  randomNumberJSON,
};
