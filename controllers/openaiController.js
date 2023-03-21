const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
	apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

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

module.exports = { generateImage };
