import { getCurrentUser } from "@/lib/getUser";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  interface User {
    userId: string;
    name?: string;
    email?: string;
  }
  const user : User | null = await getCurrentUser();

  return <NavbarClient user={user} />;
}
