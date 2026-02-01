import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

type AuthPayload = {
  userId: string;
  name?: string;
};

export const getCurrentUser = async (): Promise<AuthPayload | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    return verifyToken(token) as AuthPayload;
  } catch {
    return null;
  }
};
