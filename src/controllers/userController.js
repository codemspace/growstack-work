const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.collectUserInput = async (req, res) => {
  const { keywords, url } = req.body;
  if (!keywords || !url) {
    return res.status(400).json({ error: 'Keywords and URL are required' });
  }

  try {
    const userInput = await prisma.userInput.create({ data: { keywords, url } });
    res.status(201).json(userInput);
  } catch (error) {
    res.status(500).json({ error: 'Error saving user input' });
  }
};
