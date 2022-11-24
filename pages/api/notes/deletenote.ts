import { NextApiRequest, NextApiResponse } from "next";
import { deleteUserNote } from "../../../services/firebaseService";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "DELETE") return response.status(400).end();

  const noteID = request.query.noteid?.toString();
  if (!noteID) return response.status(400).end();

  await deleteUserNote(noteID);

  return response.status(204).end();
};
