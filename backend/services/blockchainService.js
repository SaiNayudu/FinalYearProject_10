const contract = require("../config/blockchain");

exports.registerOnChain = async (hash, isAI, confidence) => {
  const tx = await contract.registerMedia(hash, isAI, confidence);
  await tx.wait();
  return tx.hash;
};

exports.verifyFromChain = async (hash) => {
  return await contract.verifyMedia(hash);
};
