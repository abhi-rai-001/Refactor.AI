import aiServices from "../services/gem.service.js"; 
export const getReview = async (req, res) => {
  const code = req.body.code;
  
  if (!code) {
    return res.status(400).send("Code is undefined");
  }

  const response = await aiServices(code);

  res.send(response);
};