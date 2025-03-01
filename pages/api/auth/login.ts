import type { NextApiRequest, NextApiResponse } from "next"
import { sign } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body

    // In a real application, you would validate the credentials against a database
    // For this example, we'll use a hardcoded user
    if (email === "admin@bayfancy.com" && password === "password123") {
      const token = sign({ email }, JWT_SECRET, { expiresIn: "1h" })
      res.status(200).json({ token })
    } else {
      res.status(401).json({ message: "Invalid credentials" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

