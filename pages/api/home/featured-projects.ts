import type { NextApiRequest, NextApiResponse } from "next"
import { getFeaturedProjects } from "@/lib/content"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const featuredProjects = await getFeaturedProjects()
      res.status(200).json(featuredProjects)
    } catch (error) {
      res.status(500).json({ message: "Error fetching featured projects" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

