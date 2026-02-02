import { getCurrentUser } from "@/lib/getUser";
import ProfilePageClient from "@/components/ProfilePageClient";
import { redirect } from "next/navigation";

export interface User {
  userId: string;
  name?: string;
  email?: string;
  createdAt?: Date | string;
}

export default async function ProfilePage() {
  const user: User | null = await getCurrentUser();

  // Debug log (can remove in prod)
  console.log("User from getCurrentUser:", user);

  if (!user) {
    console.log("No user found, redirecting to login");
    redirect("/login");
  }

  return <ProfilePageClient user={user} />;
}