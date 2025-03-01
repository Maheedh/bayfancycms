import type { NextApiRequest, NextApiResponse } from "next"
import { getProjects } from "@/lib/content"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const projects = await getProjects()
      res.status(200).json(projects)
    } catch (error) {
      res.status(500).json({ message: "Error fetching projects" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

