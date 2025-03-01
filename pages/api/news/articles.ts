import type { NextApiRequest, NextApiResponse } from "next"
import { getNewsArticles } from "@/lib/content"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const articles = await getNewsArticles()
      res.status(200).json(articles)
    } catch (error) {
      res.status(500).json({ message: "Error fetching news articles" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

