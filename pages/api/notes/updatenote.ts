import { NextApiRequest, NextApiResponse } from "next";
import INote from "../../../interfaces/INote";
import { updateUserNote } from "../../../services/firebaseService";

export default async (request: NextApiRequest, response: NextApiResponse) => {
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
