import express from "express";
import prisma from "../libs/prismadb";

export const createLike = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId, postId } = req.body;
    const likePost = await prisma.like.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
    console.log(likePost);
    res.status(201).json(likePost);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong with like functionality!");
  }
};

export const getLike = async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;
    const likes = await prisma.like.findMany({
      where: {
        postId: id,
      },
    });
    console.log(likes);
    res.status(201).json(likes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching likes!");
  }
};
