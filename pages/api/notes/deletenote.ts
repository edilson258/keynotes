import { NextApiRequest, NextApiResponse } from "next";
import { deleteUserNote } from "../../../services/firebaseService";
import { getToken } from "next-auth/jwt";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
  });
  if (!token) return response.status(403).json({ error: "Need permission" });

  if (request.method !== "DELETE") return response.status(400).end();

  const noteID = request.query.noteid?.toString();
  if (!noteID) return response.status(400).end();

  await deleteUserNote(noteID);

  return response.status(204).end();
};
