import type {
  NextApiRequest,
  NextApiResponse,
  GetServerSidePropsContext,
} from "next";
import { getSession } from "next-auth/react";

export function getServerSession(
  req: NextApiRequest | GetServerSidePropsContext["req"],
  res: NextApiResponse | GetServerSidePropsContext["res"]
) {
  return getSession();
}