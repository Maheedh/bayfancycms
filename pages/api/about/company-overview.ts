import type { NextApiRequest, NextApiResponse } from "next"
import { getCompanyOverview } from "@/lib/content"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const companyOverview = await getCompanyOverview()
      res.status(200).json(companyOverview)
    } catch (error) {
      res.status(500).json({ message: "Error fetching company overview" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

