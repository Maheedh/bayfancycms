import type { NextApiRequest, NextApiResponse } from "next"
import { getNewsUpdates } from "@/lib/content"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const newsUpdates = await getNewsUpdates()
      res.status(200).json(newsUpdates)
    } catch (error) {
      res.status(500).json({ message: "Error fetching news updates" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

