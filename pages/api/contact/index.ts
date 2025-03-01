import type { NextApiRequest, NextApiResponse } from "next"
import { getContactContent, updateContactContent } from "@/lib/content"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const contactContent = await getContactContent()
      res.status(200).json(contactContent)
    } catch (error) {
      res.status(500).json({ message: "Error fetching contact content" })
    }
  } else if (req.method === "PUT") {
    try {
      const updatedContent = await updateContactContent(req.body)
      res.status(200).json(updatedContent)
    } catch (error) {
      res.status(500).json({ message: "Error updating contact content" })
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

