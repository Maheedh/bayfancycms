import type { NextApiRequest, NextApiResponse } from "next"
import { getHomeContent, updateHomeContent } from "@/lib/content"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const homeContent = await getHomeContent()
      res.status(200).json(homeContent)
    } catch (error) {
      res.status(500).json({ message: "Error fetching home content" })
    }
  } else if (req.method === "PUT") {
    try {
      const updatedContent = await updateHomeContent(req.body)
      res.status(200).json(updatedContent)
    } catch (error) {
      res.status(500).json({ message: "Error updating home content" })
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

