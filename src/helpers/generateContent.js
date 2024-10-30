const client = require('../config/openai');

module.exports = async function generateContentWithOpenAI(prompt) {
  try {
    const response = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    throw new Error("OpenAI API request failed");
  }
};
