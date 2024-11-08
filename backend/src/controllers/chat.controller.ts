import express from "express";
import prisma from "../libs/prismadb";

export const createRoom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId, otherUserId } = req.body;
    console.log(req.body);

    const existingRoom = await prisma.room.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [userId, otherUserId],
            },
          },
          {
            userIds: {
              equals: [otherUserId, userId],
            },
          },
        ],
      },
    });

    const singleRoom = existingRoom[0];
    if (singleRoom) {
      res.json(singleRoom);
    }

    const room = await prisma.room.create({
      data: {
        users: {
          connect: [
            {
              id: userId,
            },
            {
              id: otherUserId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });
    console.log(room);
    res.status(201).json(room);
  } catch (error) {
    console.log(error);
  }
};

export const getRooms = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.params.id;
    const rooms = await prisma.room.findMany({
      where: {
        userIds: {
          has: userId,
        },
      },
    });
    res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
  }
};
