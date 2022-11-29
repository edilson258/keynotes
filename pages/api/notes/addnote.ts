import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import INote from "../../../interfaces/INote";
import { saveNewUserNote } from "../../../services/firebaseService";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
  });
  if (!token) return response.status(403).json({ error: "Need permission" });

  const { title, description, category } = JSON.parse(request.body);

  const note: INote = {
    title,
    description,
    category,
  };

  await saveNewUserNote(note);

  return response.status(201).json({ message: "Note created" });
};
