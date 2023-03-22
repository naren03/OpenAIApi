const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
	apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Generate Response
const generateResponse = async (req, res) => {
	try {
		const { prompt } = req.body;

		const completion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: prompt }],
		});

		console.log(completion.data.choices[0].message);
		res
			.status(200)
			.json({ success: true, data: completion.data.choices[0].message });
	} catch (error) {
		if (error.response) {
			console.log(error.response.status);
			console.log(error.response.data);
		} else {
			console.log(error.message);
		}

		res.status(400).json({ success: false });
	}
};

// Generate Image

const generateImage = async (req, res) => {
	try {
		const { prompt, size } = req.body;

		const imageSize =
			size === "small"
				? "256x256"
				: size === "medium"
				? "512x512"
				: "1024x1024";
		const response = await openai.createImage({
			prompt,
			n: 1,
			size: imageSize,
		});
		image_url = response.data.data[0].url;
		console.log(response.data);
		res.status(200).json({ success: true, data: image_url });
	} catch (error) {
		if (error.response) {
			console.log(error.response.status);
			console.log(error.response.data);
		} else {
			console.log(error.message);
		}

		res.status(400).json({ success: false });
	}
};
module.exports = { generateResponse, generateImage };
