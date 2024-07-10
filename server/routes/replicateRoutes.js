import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Hello from Image Generator');
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Start the prediction
    const response = await axios.post('https://api.replicate.com/v1/predictions', {
      version: "db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf", // Stable Diffusion v1.5
      input: { prompt: prompt }
    }, {
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    // Get the prediction ID
    const predictionId = response.data.id;

    // Poll for the result
    let prediction;
    while (!prediction || prediction.status !== "succeeded") {
      const pollResponse = await axios.get(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        }
      });
      prediction = pollResponse.data;
      
      if (prediction.status === "failed") {
        throw new Error("Image generation failed");
      }

      // Wait for a short time before polling again
      if (prediction.status !== "succeeded") {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const imageUrl = prediction.output[0];

    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response?.data?.detail || error.message || 'Something went wrong');
  }
});

export default router;