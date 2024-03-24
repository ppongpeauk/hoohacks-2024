import { NextApiRequest, NextApiResponse } from "next";
import logo from "@/assets/images/user-example.png";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    id: 1,
    name: "Pete Pongpeauk",
    username: "ppongpeauk",
    email: "",
    avatarUrl: logo.src,
  });
}
