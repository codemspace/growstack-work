module.exports = async function personalizeContent(content, platform) {
    switch (platform) {
      case 'Twitter':
        return `${content.slice(0, 240)}... #AI #Automation`;
      case 'LinkedIn':
        return `${content} - Brought to you by GrowStack`;
      default:
        return content;
    }
  };
  