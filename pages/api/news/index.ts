import type { NextApiRequest, NextApiResponse } from "next"
import { getNewsContent, updateNewsContent } from "@/lib/content"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const newsContent = await getNewsContent()
      res.status(200).json(newsContent)
    } catch (error) {
      res.status(500).json({ message: "Error fetching news content" })
    }
  } else if (req.method === "PUT") {
    try {
      const updatedContent = await updateNewsContent(req.body)
      res.status(200).json(updatedContent)
    } catch (error) {
      res.status(500).json({ message: "Error updating news content" })
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

