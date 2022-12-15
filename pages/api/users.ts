import type { NextApiRequest, NextApiResponse } from "next"
import { p } from '../../src/prismaClient'

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  const users = await p.user.findMany();
  res.status(200).json(users);
}