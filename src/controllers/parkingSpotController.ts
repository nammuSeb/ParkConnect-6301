import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { SearchParamsDTO } from '../types';

const prisma = new PrismaClient();

export const searchParkingSpots = async (req: Request, res: Response) => {
  try {
    const searchParams: SearchParamsDTO = req.query;
    
    const spots = await prisma.parkingSpot.findMany({
      where: {
        AND: [
          {
            latitude: {
              gte: searchParams.latitude! - searchParams.radius!,
              lte: searchParams.latitude! + searchParams.radius!
            },
            longitude: {
              gte: searchParams.longitude! - searchParams.radius!,
              lte: searchParams.longitude! + searchParams.radius!
            }
          },
          searchParams.type ? { type: searchParams.type } : {},
          searchParams.isPriority ? { isPriority: true } : {},
          searchParams.isAccessible ? { isAccessible: true } : {}
        ]
      },
      include: {
        availability: {
          where: {
            startTime: { gte: searchParams.startTime },
            endTime: { lte: searchParams.endTime },
            isBooked: false
          }
        }
      }
    });

    res.json(spots);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la recherche" });
  }
};

export const getParkingSpotDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const spot = await prisma.parkingSpot.findUnique({
      where: { id },
      include: {
        availability: {
          where: {
            startTime: { gte: new Date() },
            isBooked: false
          }
        }
      }
    });

    if (!spot) {
      return res.status(404).json({ error: "Place de parking non trouvée" });
    }

    res.json(spot);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des détails" });
  }
};