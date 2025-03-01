import type { NextApiRequest, NextApiResponse } from "next"
import { createContent, updateContent, deleteContent } from "@/lib/content"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { contentType, id } = req.query
  const method = req.method

  if (method === "POST") {
    try {
      const newContent = await createContent(contentType as string, req.body)
      res.status(201).json(newContent)
    } catch (error) {
      res.status(500).json({ message: "Error creating content" })
    }
  } else if (method === "PUT") {
    try {
      const updatedContent = await updateContent(contentType as string, id as string, req.body)
      res.status(200).json(updatedContent)
    } catch (error) {
      res.status(500).json({ message: "Error updating content" })
    }
  } else if (method === "DELETE") {
    try {
      await deleteContent(contentType as string, id as string)
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ message: "Error deleting content" })
    }
  } else {
    res.setHeader("Allow", ["POST", "PUT", "DELETE"])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}

