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

  // Redirect to login if not authenticated
  if (!user) {
    redirect("/login");
  }

  return <ProfilePageClient user={user} />;
}