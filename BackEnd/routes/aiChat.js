const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "Llama-3.3-70B-Versatile",
        messages: [
          {
            role: "system",
            content: `
You are a medical assistant chatbot.
Rules:
- Do NOT diagnose diseases.
- Do NOT prescribe medicines.
- You may suggest common OTC medicines only.
- Always recommend consulting a doctor.
- Add emergency warning if symptoms are severe.
`
          },
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "AI service error" });
  }
});

module.exports = router;