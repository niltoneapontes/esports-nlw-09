import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { convertHourStringToMinutes } from "./utils/convertHourStringToMinutes";
import { convertMinutesToHourString } from "./utils/convertMinutesToHourString";

const app = express();
app.use(express.json());
app.use(cors())

const prismaClient = new PrismaClient({
  log: ['query']
})

app.get("/games", async (request, response) => {
  const games = await prismaClient.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })
  return response.status(200).send(games);
});

app.post("/games/:gameId/ads", async (request, response) => {
  const gameId = request.params.gameId;
  const {
    name,
    discord,
    yearsPlaying,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel
  } = request.body;

  const createdAd = await prismaClient.ad.create({
    data: {
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(','),
      hourStart: convertHourStringToMinutes(hourStart),
      hourEnd: convertHourStringToMinutes(hourEnd),
      useVoiceChannel,
      gameId
    }
  })

  return response.status(201).send(createdAd);
});

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;
  const ads = await prismaClient.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return response.status(200).send(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }
  }));
});

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;

  const ad = await prismaClient.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId,
    }
  });

  return response.status(200).send({
    discord: ad.discord
  })
});

app.listen(3333);
