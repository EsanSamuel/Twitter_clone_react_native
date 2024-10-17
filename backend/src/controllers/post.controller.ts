import express from "express";
import prisma from "../libs/prismadb";
import { createPostType, validatePost } from "../libs/validation";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dirm0bwdw",
  api_key: "244737511899697",
  api_secret: "LBf0Bay00WC4w1bonkdeapChUO4",
});

export const createPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const validate = validatePost.parse(req.body);
    const { user_id, content, image, tag }: createPostType = validate;
    console.log("RequestBody:", req.body);

    const user = await prisma.user.findUnique({
      where: {
        clerkId: user_id,
      },
    });

    const ImageUrl = await cloudinary.uploader.upload(image);
    const post = await prisma.post.create({
      data: {
        userId: user.id,
        content,
        image: ImageUrl.url,
        tag,
      },
    });
    console.log(post);
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating Posts!");
  }
};

export const getPosts = async (req: express.Request, res: express.Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching Posts");
  }
};

export const getPostById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });
    console.log(post)
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching Posts");
  }
};