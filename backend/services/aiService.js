exports.detectAI = async () => {
  // Dummy random AI detection
  const isAI = Math.random() > 0.5;
  const confidence = Math.floor(Math.random() * 40) + 60;

  return { isAI, confidence };
};
