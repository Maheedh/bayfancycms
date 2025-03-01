import type { NextApiRequest, NextApiResponse } from "next"
import { getHeroSlider } from "@/lib/content"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const heroSlider = await getHeroSlider()
      res.status(200).json(heroSlider)
    } catch (error) {
      res.status(500).json({ message: "Error fetching hero slider" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

