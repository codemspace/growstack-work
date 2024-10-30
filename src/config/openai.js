const OpenAI = require('openai');
const { HttpsProxyAgent } = require('https-proxy-agent');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  httpAgent: new HttpsProxyAgent(process.env.PROXY_URL),
});

module.exports = client;
