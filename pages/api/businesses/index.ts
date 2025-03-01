import type { NextApiRequest, NextApiResponse } from "next"
import { getBusinessesContent, updateBusinessesContent } from "@/lib/content"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const businessesContent = await getBusinessesContent()
      res.status(200).json(businessesContent)
    } catch (error) {
      res.status(500).json({ message: "Error fetching businesses content" })
    }
  } else if (req.method === "PUT") {
    try {
      const updatedContent = await updateBusinessesContent(req.body)
      res.status(200).json(updatedContent)
    } catch (error) {
      res.status(500).json({ message: "Error updating businesses content" })
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

