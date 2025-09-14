const express = require('express');
const router = express.Router();
const axios = require('axios');

async function getCulturalContext(prompt) {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: `Extract cultural context for this story: ${prompt}` }]
    }, { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } });
    return response.data.choices[0].message.content;
}

async function generateStory(prompt, culturalContext) {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: `Using this cultural context: ${culturalContext}, write a short story based on: ${prompt}` }]
    }, { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } });
    return response.data.choices[0].message.content;
}

async function generateVisual(prompt) {
    const response = await axios.post(process.env.T2I_API_URL, {
        inputs: prompt
    }, {
        headers: { Authorization: `Bearer ${process.env.T2I_API_TOKEN}` }
    });
    return response.data[0].url || "https://via.placeholder.com/512";
}

router.post('/', async (req, res) => {
    const userPrompt = req.body.prompt;
    try {
        const culturalContext = await getCulturalContext(userPrompt);
        const story = await generateStory(userPrompt, culturalContext);
        const scenes = story.match(/(.|[\r\n]){1,500}/g).slice(0, 3);
        const visuals = await Promise.all(
            scenes.map(scene => generateVisual(`${scene} illustrated in cartoon style, Indian cultural setting`))
        );
        res.json({ story, culturalContext, scenes, visuals });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error generating story');
    }
});

module.exports = router;