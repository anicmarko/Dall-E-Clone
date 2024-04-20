import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

router.get('/', async (req,res) => {
    try {
        //const posts = await Post.find({});
        const posts = [{name: 'ime', prompt: 'prompt bato', photo : 'https://cdn.openai.com/labs/images/A%20cartoon%20of%20a%20monkey%20in%20space.webp?v=1'}];
        res.status(200).json({success: true, data: posts});

    } catch (error) {
        res.status(500).json({success: false, message: error});
        
    }
})

router.post('/', async (req, res) => {
    try {
        const {name, prompt, photo} = req.body;
        const photoURL = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoURL.url
        });

        res.status(201).json({success:true, data: newPost});
    } catch (error) {
        res.status(500).json({success: false, message: error});
    }
})


export default router;