const generateContentWithOpenAI = require('../helpers/generateContent');
const generateVideo = require('../helpers/generateVideo');
const personalizeContent = require('../helpers/personalizeContent');
const optimizeForSEO = require('../helpers/optimizeSEO');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// start workflow and handle parallel execution
exports.startWorkflow = async (req, res) => {
  const { userInputId } = req.body;

  // retrieve user input
  const userInput = await prisma.userInput.findUnique({ where: { id: userInputId } });
  if (!userInput) {
    return res.status(404).json({ error: 'User input not found' });
  }

  try {
    const contentGeneration = generateContentWithOpenAI(`Write an article based on these keywords: ${userInput.keywords}`);
    const videoGeneration = generateVideo(`Create a video script based on these keywords: ${userInput.keywords}`);
    const [generatedContent, videoUrl] = await Promise.all([contentGeneration, videoGeneration]);

    const [personalizedTwitter, personalizedLinkedIn, seoContent] = await Promise.all([
      personalizeContent(generatedContent, 'Twitter'),
      personalizeContent(generatedContent, 'LinkedIn'),
      optimizeForSEO(generatedContent),
    ]);

    await prisma.workflowTask.createMany({
      data: [
        { taskName: 'Content Generation', status: 'completed', userInputId, result: generatedContent },
        { taskName: 'Video Generation', status: 'completed', userInputId, result: videoUrl },
        { taskName: 'Twitter Personalization', status: 'completed', userInputId, result: personalizedTwitter },
        { taskName: 'LinkedIn Personalization', status: 'completed', userInputId, result: personalizedLinkedIn },
        { taskName: 'SEO Optimization', status: 'completed', userInputId, result: seoContent },
      ],
    });

    res.status(200).json({
      message: 'Parallel workflow completed with personalization and optimization',
      results: { content: generatedContent, video: videoUrl, twitter: personalizedTwitter, linkedin: personalizedLinkedIn, seo: seoContent },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error executing workflow', details: error.message });
  }
};
