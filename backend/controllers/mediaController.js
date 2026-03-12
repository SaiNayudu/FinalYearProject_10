const { generateHash } = require("../services/hashService");
const { detectAI } = require("../services/aiService");
const { registerOnChain, verifyFromChain } = require("../services/blockchainService");

exports.uploadMedia = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    // Generate SHA-256 hash
    const hash = generateHash(fileBuffer);

    // Detect AI
    const { isAI, confidence } = await detectAI();

    // Register on blockchain
    const txHash = await registerOnChain(hash, isAI, confidence);

    res.json({
      hash,
      result: isAI ? "AI-Generated" : "Real",
      confidence,
      transactionHash: txHash
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyHash = async (req, res) => {
  try {
    const { hash } = req.params;

    const data = await verifyFromChain(hash);

    res.json({
      result: data[0] ? "AI-Generated" : "Real",
      confidence: Number(data[1]),
      timestamp: Number(data[2]),
      uploader: data[3]
    });

  } catch (error) {
    res.status(404).json({ error: "Not Found" });
  }
};
