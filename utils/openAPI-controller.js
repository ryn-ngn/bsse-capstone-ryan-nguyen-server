require('dotenv').config();
const { OpenAI } = require('openai');

// reference documents: https://platform.openai.com/docs/api-reference/chat/create

// Initialize OpenAI instance with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getAdditionalCarInfo = async (req, res) => {
  const { make, model, year } = req.params;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant designed to output JSON.',
        },
        {
          role: 'user',
          content: `For ${year} ${make} ${model}, recommend value for each key: wheel-size, bolt-pattern, center-bore, tire-size, left-wipe-blade, right-wiper-blade, oil-type. Return result in JSON format, don't alter the key strings`,
        },
      ],
      model: 'gpt-3.5-turbo-0125',
      response_format: { type: 'json_object' },
    });

    // Check if completion object and choices array exist
    if (completion && completion.choices && completion.choices.length > 0) {
      const response = completion.choices[0].message.content;
      const responseJSON = JSON.parse(response);
      return res.status(200).json(responseJSON);
    } else {
      res.status(400).send('Invalid completion response format');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

module.exports = { getAdditionalCarInfo };
