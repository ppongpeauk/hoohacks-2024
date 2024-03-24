import { NextApiRequest, NextApiResponse } from "next";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;
  res.status(200).json({ name: "Eve Holloway", username: "eve" });
}
