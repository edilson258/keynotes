import { NextApiRequest, NextApiResponse } from "next";
import INote from "../../../interfaces/INote";
import { saveNewUserNote } from "../../../services/firebaseService";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { title, description, category } = JSON.parse(request.body);

  const note: INote = {
    title,
    description,
    category,
  };

  await saveNewUserNote(note);

  return response.status(201).json({ message: "Note created" });
};
