import type { NextApiRequest, NextApiResponse } from "next"
import { getAboutContent, updateAboutContent } from "@/lib/content"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const aboutContent = await getAboutContent()
      res.status(200).json(aboutContent)
    } catch (error) {
      res.status(500).json({ message: "Error fetching about content" })
    }
  } else if (req.method === "PUT") {
    try {
      const updatedContent = await updateAboutContent(req.body)
      res.status(200).json(updatedContent)
    } catch (error) {
      res.status(500).json({ message: "Error updating about content" })
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

