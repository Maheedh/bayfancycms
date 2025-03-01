import type { NextApiRequest, NextApiResponse } from "next"
import { getMissionVision } from "@/lib/content"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const missionVision = await getMissionVision()
      res.status(200).json(missionVision)
    } catch (error) {
      res.status(500).json({ message: "Error fetching mission and vision" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

