module.exports = async function generateVideo(content) {
    try {
      // simulate video generation API
      return "https://example.com/generated_video_url";
    } catch (error) {
      console.error("Error with Video Generation API:", error);
      throw new Error("Video generation API request failed");
    }
  };
  