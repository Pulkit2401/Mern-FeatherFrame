// updateImageUrls.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from './mongodb/models/post.js';

dotenv.config();

const updateImageUrls = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const posts = await Post.find({});

    for (let post of posts) {
      if (post.photo.startsWith('http://')) {
        post.photo = post.photo.replace('http://', 'https://');
        await post.save();
      }
    }

    console.log('Image URLs updated successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error updating image URLs:', error);
    mongoose.connection.close();
  }
};

updateImageUrls();
