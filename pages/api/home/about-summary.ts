import type { NextApiRequest, NextApiResponse } from "next"
import { getAboutSummary } from "@/lib/content"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const aboutSummary = await getAboutSummary()
      res.status(200).json(aboutSummary)
    } catch (error) {
      res.status(500).json({ message: "Error fetching about summary" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

