import type { NextApiRequest, NextApiResponse } from "next"
import { getPressReleases } from "@/lib/content"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const pressReleases = await getPressReleases()
      res.status(200).json(pressReleases)
    } catch (error) {
      res.status(500).json({ message: "Error fetching press releases" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

