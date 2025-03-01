import type { NextApiRequest, NextApiResponse } from "next"
import { getContactInformation } from "@/lib/content"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const contactInfo = await getContactInformation()
      res.status(200).json(contactInfo)
    } catch (error) {
      res.status(500).json({ message: "Error fetching contact information" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

