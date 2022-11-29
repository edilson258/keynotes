import { NextApiRequest, NextApiResponse } from "next";
import INote from "../../../interfaces/INote";
import { updateUserNote } from "../../../services/firebaseService";
import { getToken } from "next-auth/jwt";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
  });
  if (!token) return response.status(403).json({ error: "Need permission" });

  if (request.method !== "PATCH") return response.status(400).end();

  const { id, title, description, category } = JSON.parse(request.body);

  if (!id || !title || !description || !category) {
    return response.status(400).end();
  }

  const note: INote = {
    id,
    title,
    description,
    category,
  };

  await updateUserNote(note);
  return response.status(200).end();
};
